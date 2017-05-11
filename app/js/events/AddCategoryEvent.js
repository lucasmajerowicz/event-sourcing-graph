const Category = require('../models/Category');

class AddCategoryEvent {
    constructor(catalog, categoryId, categoryName) {
        this.catalog = catalog;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.name = 'AddCategoryEvent';
        this.parent = null;
    }

    process() {
        this.catalog.addCategory(new Category(this.categoryId, this.categoryName));
    }
}

module.exports = AddCategoryEvent;
