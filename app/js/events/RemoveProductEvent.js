class RemoveProductEvent {
    constructor(catalog, productId) {
        this.catalog = catalog;
        this.productId = productId;
        this.name = 'RemoveProductEvent';
    }

    process() {
        this.catalog.removeProduct(this.productId);
    }
}

module.exports = RemoveProductEvent;
