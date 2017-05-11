const url = 'http://localhost:3000';
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

    static appendEvents(events, parentId) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        return new Promise((resolve, reject) => {
            const payload = {
                method: 'post',
                headers: myHeaders,
                body: JSON.stringify({events: events, parentId})
            };
            console.log(payload);
            fetch(url + '/events/', payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(CatalogAPI.deserializeCatalog(object));
            });
        });
    }

    static deserializeCatalog(object) {
        return new Catalog(object.id,
            object.name,
            object.categories.map((o) => new Category(o.id, o.name)),
            object.products.map((o) => new Product(o.id, o.name, o.price, o.visible, o.color, o.category)))

    }
}

module.exports = CatalogAPI;
