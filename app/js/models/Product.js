class Product {
    constructor(id, name, attributes = {}, categories = []) {
        this.id = id;
        this.name = name;
        this.attributes = attributes;
        this.categories = categories;
    }

    addCategory(category) {
        this.categories.push(category);
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
    }
}

module.exports = Product;
