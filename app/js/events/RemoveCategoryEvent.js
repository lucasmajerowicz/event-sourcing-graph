class RemoveCategoryEvent {
    constructor(catalog, categoryId) {
        this.catalog = catalog;
        this.categoryId = categoryId;
        this.name = 'RemoveCategoryEvent';
    }

    process() {
        this.catalog.removeCategory(this.categoryId);
    }
}

module.exports = RemoveCategoryEvent;
