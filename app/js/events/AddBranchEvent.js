const Category = require('../models/Category');

class AddBranchEvent {
    constructor(catalog, branchName) {
        this.catalog = catalog;
        this.branchName = branchName;
        this.name = 'AddBranchEvent';
        this.parent = null;
    }

    process() {

    }
}

module.exports = AddBranchEvent;
