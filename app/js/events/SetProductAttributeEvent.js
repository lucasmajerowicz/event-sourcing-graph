class SetProductAttributeEvent {
    constructor(catalog, productId, key, value) {
        this.catalog = catalog;
        this.productId = productId;
        this.key = key;
        this.value = value;
        this.name = 'SetProductAttributeEvent';
        this.parent = null;
    }

    process() {
        const product = this.catalog.getProduct(this.productId);

        product[this.key] = this.value;
    }
}

module.exports = SetProductAttributeEvent;
