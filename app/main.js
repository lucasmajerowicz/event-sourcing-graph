const generateUUID = require('./js/util');
const UiUpdater = require('./js/client/UiUpdater');
const CatalogAPI = require('./js/client/CatalogAPI');
const AddCatalogEvent = require('./js/events/AddCatalogEvent');
const AddCategoryEvent = require('./js/events/AddCategoryEvent');
const AddProductEvent = require('./js/events/AddProductEvent');
const SetProductAttributeEvent = require('./js/events/SetProductAttributeEvent');

$(function() {
    const eventId = localStorage.getItem("eventId");

    console.log('ee', eventId);
    if (eventId) {
        UiUpdater.setCatalog(eventId);
    } else {
        UiUpdater.setDefaultCatalog();
    }
});





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

    if (name != (product.name || '') )
        events.push(new SetProductAttributeEvent(catalog, id, 'name', name));
    if (price != (product.price || ''))
        events.push(new SetProductAttributeEvent(catalog, id, 'price', price));
    if (visible != (product.visible || null))
        events.push(new SetProductAttributeEvent(catalog, id, 'visible', visible));
    if (color != (product.color || ''))
        events.push(new SetProductAttributeEvent(catalog, id, 'color', color));
    if ((categoryId && !product.category) || (product.category && product.category.id != categoryId))
        events.push(new SetProductAttributeEvent(catalog, id, 'category', categoryId));

    console.log(events);
    UiUpdater.processEvents(events);
}


$('#btnSubmitProduct').click(() => {
    const id = $('#productId').val();
    const name = $('#productName').val();
    const price = $('#productPrice').val();
    const visible = $('#productVisible').val();
    const color = $('#productColor').val();
    const categoryId = $('#productCategory').val();
    let category = null;

    if (id) {
        updateProduct(id, name, price, visible, color, categoryId);
    } else {
        addProduct(name, price, visible, color, categoryId || '');
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

