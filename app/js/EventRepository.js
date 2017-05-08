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

    static addEvent(event) {
        if (event.catalog) {
            return EventRepository.appendEvent(event);
        } else {
            return EventRepository.createAddCatalogEvent(event);
        }
    }

    static appendEvent(event) {
        const serializedEvent = EventRepository.serializeEvent(event);
        const command = `MATCH (root:Event { catalogId: ${event.catalog.id} })-[:APPEND*0..]->(x:Event)
WITH COLLECT(x) AS path
MATCH (last:Event) where ID(last) = ID(LAST(path))
CREATE (last)-[r:APPEND]->(e:Event ${serializedEvent})`;

        return session.run(command);
    }

    static createAddCatalogEvent(event) {
        const serializedEvent = EventRepository.serializeEvent(event);
        const command = `CREATE (e:Event ${serializedEvent}) RETURN e`;

        return session.run(command);
    }

    static getEventsForCatalog(catalogId) {
        const command = `MATCH (root:Event { catalogId: ${catalogId} })-[:APPEND*0..]->(x:Event)
RETURN x`;

        return session.run(command);
    }
}

module.exports = EventRepository;
