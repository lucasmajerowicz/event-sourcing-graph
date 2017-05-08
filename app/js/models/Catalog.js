class Catalog {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.categories = [];
        this.products = [];
    }

    addCategory(category) {
        this.categories.push(category);
    }

    addProduct(product) {
        this.products.push(product);
    }

    getCategory(categoryId) {
        return this.categories.find((category) => category.id == categoryId);
    }

    getProduct(productId) {
        return this.products.find((product) => product.id == productId);
    }
}

module.exports = Catalog;
