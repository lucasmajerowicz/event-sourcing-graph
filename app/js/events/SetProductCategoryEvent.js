class SetProductCategoryEvent {
    constructor(catalog, productId, categoryId) {
        this.catalog = catalog;
        this.productId = productId;
        this.categoryId = categoryId;
        this.name = 'SetProductCategoryEvent';
    }

    process() {
        const product = this.catalog.getProduct(this.productId);
        const category = this.catalog.getCategory(this.categoryId);

        product.addCategory(category);
    }
}

module.exports = SetProductCategoryEvent;
