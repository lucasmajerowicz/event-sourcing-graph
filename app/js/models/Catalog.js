class Catalog {
    constructor(id, name, categories = [], products = []) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.products = products;
    }

    addCategory(category) {
        this.categories.push(category);
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        const index = this.products.findIndex((product) => product.id == productId);

        if (index >= 0) {
            this.products.splice(index, 1);
        }
    }

    removeCategory(categoryId) {
        const index = this.categories.findIndex((category) => category.id == categoryId);

        if (index >= 0) {
            this.categories.splice(index, 1);
        }
    }

    getCategory(categoryId) {
        return this.categories.find((category) => category.id == categoryId);
    }

    getProduct(productId) {
        return this.products.find((product) => product.id == productId);
    }
}

module.exports = Catalog;
