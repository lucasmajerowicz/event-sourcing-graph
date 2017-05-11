const AddCatalogEvent = require('../events/AddCatalogEvent');
const AddCategoryEvent = require('../events/AddCategoryEvent');
const AddProductEvent = require('../events/AddProductEvent');
const SetProductCategoryEvent = require('../events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('../events/SetProductAttributeEvent');

const neo4j = require('neo4j-driver').v1;

const uri = 'bolt://localhost';

const driver = neo4j.driver(uri, neo4j.auth.basic('neo4j', '1234'));
const session = driver.session();


class EventRepository {
    static serializeEvent(event) {
        const cloneEvent = JSON.parse(JSON.stringify(event));
        delete cloneEvent.catalog;

        return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
    }

    static addEvent(event, parentId) {
        let promise;
        if (parentId) {
            promise = EventRepository.appendEvent(event, parentId);
        } else {
            promise = EventRepository.createAddCatalogEvent(event);
        }

        return new Promise((resolve, reject) => {
            promise.then(result => {
                const eventId = result.records[0].get(0).identity.low;

                resolve(eventId);
            });
        });
    }

    static appendEvent(event, parentId) {
        const serializedEvent = EventRepository.serializeEvent(event);
        const command = `MATCH (parent:Event) where ID(parent) = ${parentId}
CREATE (parent)-[r:APPEND]->(e:Event ${serializedEvent}) RETURN e`;

        return session.run(command);
    }

    static createAddCatalogEvent(event) {
        const serializedEvent = EventRepository.serializeEvent(event);
        const command = `CREATE (e:Event ${serializedEvent}) RETURN e`;

        return session.run(command);
    }

    static getCatalog(eventId) {
        return new Promise((resolve, reject) => {
            EventRepository.getChainOfEvents(eventId).then((events) => {
                events.forEach((event) => event.process());
                resolve(events[0].catalog);
            });
        });
    }

    static getChainOfEvents(eventId) {
        const command = `MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = ${eventId}
RETURN x`;
        return new Promise((resolve, reject) => {
            session.run(command).then(result => {
                let catalog = null;
                const events = result.records.reverse().map((record) => {
                    const event = EventRepository.deserializeEvent(record.get(0).properties, catalog);
                    catalog = event.catalog;

                    return event;
                });

                resolve(events);
            });
        });
    }

    static getEventsForCatalog(catalogId) {
        const command = `MATCH (root:Event { catalogId: "${catalogId}" })-[:APPEND*0..]->(x:Event)
RETURN x`;
        return new Promise((resolve, reject) => {
            session.run(command).then(result => {
                let catalog = null;
                const events = result.records.map((record) => {
                    const event = EventRepository.deserializeEvent(record.get(0).properties, catalog);
                    catalog = event.catalog;

                    return event;
                });

                resolve(events);
            });
        });
    }

    static deserializeEvent(object, catalog) {
        switch (object.name) {
            case 'AddCatalogEvent':
                return new AddCatalogEvent(object.catalogId, object.catalogName);
            case 'AddCategoryEvent':
                return new AddCategoryEvent(catalog, object.categoryId, object.categoryName);
            case 'AddProductEvent':
                return new AddProductEvent(catalog, object.productId, object.productName);
            case 'SetProductCategoryEvent':
                return new SetProductCategoryEvent(catalog, object.productId, object.categoryId);
            case 'SetProductAttributeEvent':
                return new SetProductAttributeEvent(catalog, object.productId, object.key, object.value);

        }
    }
}

module.exports = EventRepository;
