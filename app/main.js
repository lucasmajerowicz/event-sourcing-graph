import {generateUUID} from './js/util';
const UiUpdater = require('./js/client/UiUpdater');
const AddCatalogEvent = require('./js/events/AddCatalogEvent');
const AddCategoryEvent = require('./js/events/AddCategoryEvent');
const AddProductEvent = require('./js/events/AddProductEvent');
const SetProductCategoryEvent = require('./js/events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('./js/events/SetProductAttributeEvent');

window.catalog = null;

const catalogEvent = new AddCatalogEvent("1234", "My Catalog");

UiUpdater.processEvent(catalogEvent);

const categoryEvent = new AddCategoryEvent(catalog, "1", "Cat 1");
const productEvent = new AddProductEvent(catalog, "2", "prod", "1", "yes", "red");

UiUpdater.processEvent(categoryEvent);
UiUpdater.processEvent(productEvent);

function addProduct(name, price, visible, color, category) {
    const event = new AddProductEvent(catalog,
        generateUUID(),
        name, price, visible, color, category
    );
    UiUpdater.processEvent(event);
}

function updateProduct(id, name, price, visible, color, categoryId) {
    const product = catalog.getProduct(id);
    const events = [];

    if (name != product.name)
        events.push(new SetProductAttributeEvent(catalog, id, 'name', name));
    if (price != product.price)
        events.push(new SetProductAttributeEvent(catalog, id, 'price', price));
    if (visible != product.visible)
        events.push(new SetProductAttributeEvent(catalog, id, 'visible', visible));
    if (color != product.color)
        events.push(new SetProductAttributeEvent(catalog, id, 'color', color));
    if (category != product.category)
        events.push(new SetProductCategoryEvent(catalog, id, categoryId));

    events.forEach((event) => UiUpdater.processEvent(event));
}


$('#btnSubmitProduct').click(() => {
    const id = $('#productId').val();
    const name = $('#productName').val();
    const price = $('#productPrice').val();
    const visible = $('#productVisible').val();
    const color = $('#productColor').val();
    const categoryId = $('#productCategory').val();
    let category = null;

    if (categoryId) {
        category = catalog.getCategory(categoryId);
    }

    if (id) {
        updateProduct(id, name, price, visible, color, categoryId);
    } else {
        addProduct(name, price, visible, color, category);
    }

    $('#productFormModal').modal('hide');
    UiUpdater.resetUpdateForms();
});

$('#btnAddCategory').click(() => {
    const name = $('#categoryName').val();

    const event = new AddCategoryEvent(catalog, generateUUID(), name);
    UiUpdater.processEvent(event);

    $('#categoryFormModal').modal('hide');
    UiUpdater.resetUpdateForms();
});

