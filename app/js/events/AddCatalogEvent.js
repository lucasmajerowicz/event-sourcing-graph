const Catalog = require('../models/Catalog');

class AddCatalogEvent {
    constructor(id, catalogName) {
        this.catalogId = id;
        this.catalogName = catalogName;
        this.name = 'AddCatalogEvent';
        this.catalog =  new Catalog(this.catalogId, this.catalogName);
        this.parent = null;
    }

    process() {
        return this.catalog;
    }
}

module.exports = AddCatalogEvent;
