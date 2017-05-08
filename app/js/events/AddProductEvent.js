const Product = require('../models/Product');

class AddProductEvent {
    constructor(catalog, productId, name) {
        this.catalog = catalog;
        this.productId = productId;
        this.name = name;
        this.name = 'AddProductEvent';
    }

    process() {
        this.catalog.addProduct(new Product(this.productId, this.name));
    }
}

module.exports = AddProductEvent;
