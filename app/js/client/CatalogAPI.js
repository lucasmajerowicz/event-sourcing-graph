const Catalog = require('../models/Catalog');
const Product = require('../models/Product');
const Category = require('../models/Category');

class CatalogAPI {
    static getCatalog(eventId) {
        return new Promise((resolve, reject) => {
            fetch(url + '/catalog/' + eventId).then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(CatalogAPI.deserializeCatalog(object));
            });
        });
    }

    static getDefaultCatalog() {
        return new Promise((resolve, reject) => {
            fetch(url + '/default').then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(CatalogAPI.deserializeCatalog(object));
            });
        });
    }

    static getAllCatalogEvents(catalogId) {
        return new Promise((resolve, reject) => {
            fetch(url + '/events/' + catalogId).then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(object.events);
            });
        });
    }

    static appendEvents(events, parentId) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        events.forEach((event) => event.catalog = null);

        return new Promise((resolve, reject) => {
            const payload = {
                method: 'post',
                headers: myHeaders,
                body: JSON.stringify({events: events, parentId})
            };

            fetch(url + '/events/', payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                const catalog = CatalogAPI.deserializeCatalog(object);

                resolve(catalog);
            });
        });
    }

    static deserializeCatalog(object) {
        const catalog = new Catalog(object.id,
            object.name,
            object.categories.map((o) => new Category(o.id, o.name)),
            object.products.map((o) => new Product(o.id, o.name, o.price, o.visible, o.color, o.category)));

        catalog.eventId = object.eventId;
        return catalog

    }

    static deleteEvent(eventId) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        return new Promise((resolve, reject) => {
            const payload = {
                method: 'delete',
                headers: myHeaders
            };

            fetch(url + '/events/' + eventId, payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                const catalog = CatalogAPI.deserializeCatalog(object);

                resolve(catalog);
            });
        });
    }

    static mergeEvents(eventId, secondEventId) {
        return new Promise((resolve, reject) => {
            const payload = {
                method: 'post'
            };

            fetch(url + '/events/' + eventId + '/merge/' + secondEventId, payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                const catalog = CatalogAPI.deserializeCatalog(object);

                resolve(catalog);
            });
        });
    }
}

module.exports = CatalogAPI;
