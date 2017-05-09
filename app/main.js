const UiUpdater = require('./js/client/UiUpdater');

const Catalog = require('./js/models/Catalog');
const Product = require('./js/models/Product');
const Category = require('./js/models/Category');

const catalog = new Catalog("1234", "My Catalog");
const category = new Category("1", "Cat 1");
const product = new Product("2", "prod", "1", "yes", "red", category);

catalog.addProduct(product);
catalog.addCategory(category);


UiUpdater.update(catalog);


