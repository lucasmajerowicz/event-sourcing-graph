const Catalog = require('../models/Catalog');

class AddCatalogEvent {
    constructor(id, catalogName) {
        this.catalogId = id;
        this.catalogName = catalogName;
        this.name = 'AddCatalogEvent';
    }

    process() {
        return new Catalog(this.catalogId, this.catalogName);
    }
}

module.exports = AddCatalogEvent;
