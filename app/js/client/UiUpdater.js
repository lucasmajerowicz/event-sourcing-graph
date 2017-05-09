const AddCatalogEvent = require('../events/AddCatalogEvent');
const AddCategoryEvent = require('../events/AddCategoryEvent');
const AddProductEvent = require('../events/AddProductEvent');
const RemoveProductEvent = require('../events/RemoveProductEvent');
const SetProductCategoryEvent = require('../events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('../events/SetProductAttributeEvent');

class UiUpdater {
    static  updateCategoryTable(catalog) {
        const tbody = $("#tbody-categories");

        tbody.empty();
        catalog.categories.forEach((category) => {
            tbody
                .append($('<tr>')
                    .append($('<td>')
                        .append(category.id)
                    )
                    .append($('<td>')
                        .append(category.name)
                    )
                )
        });
    }

    static updateProductTable(catalog) {
        const tbody = $("#tbody-products");

        tbody.empty();
        catalog.products.forEach((product) => {
            let categoryName = '';
            if (product.category) {
                categoryName = product.category.name;
            }

            tbody
                .append($('<tr>')
                    .append($('<td>')
                        .append(product.id)
                    )
                    .append($('<td>')
                        .append(product.name)
                    )
                    .append($('<td>')
                        .append(categoryName)
                    )
                    .append($('<td>')
                        .append(product.price)
                    )
                    .append($('<td>')
                        .append(product.visible)
                    )
                    .append($('<td>')
                        .append(product.color)
                    )
                    .append($('<td>')
                        .append($('<button/>', {
                            text: 'remove',
                            click: () => {
                                UiUpdater.processEvent(new RemoveProductEvent(catalog, product.id));
                            }
                        }))
                    )
                )
        });
    }

    static processEvent(event) {
        event.process();
        UiUpdater.update(event.catalog);
    }

    static update(catalog) {
        UiUpdater.updateCategoryTable(catalog);
        UiUpdater.updateProductTable(catalog);
    }
}

module.exports = UiUpdater;
