class SetProductAttributeEvent {
    constructor(catalog, productId, key, value) {
        this.catalog = catalog;
        this.productId = productId;
        this.key = key;
        this.value = value;
        this.name = 'SetProductAttributeEvent';
    }

    process() {
        const product = this.catalog.getProduct(this.productId);

        product.setAttribute(this.key, this.value);
    }
}

module.exports = SetProductAttributeEvent;
