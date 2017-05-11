class SetProductCategoryEvent {
    constructor(catalog, productId, categoryId) {
        this.catalog = catalog;
        this.productId = productId;
        this.categoryId = categoryId;
        this.name = 'SetProductCategoryEvent';
        this.parent = null;
    }

    process() {
        const product = this.catalog.getProduct(this.productId);
        const category = this.catalog.getCategory(this.categoryId);

        product.category = category;
    }
}

module.exports = SetProductCategoryEvent;
