import {generateUUID} from './js/util';
const UiUpdater = require('./js/client/UiUpdater');
const AddCategoryEvent = require('./js/events/AddCategoryEvent');
const AddProductEvent = require('./js/events/AddProductEvent');
const SetProductCategoryEvent = require('./js/events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('./js/events/SetProductAttributeEvent');

const Catalog = require('./js/models/Catalog');

let catalog = new Catalog("1234", "My Catalog");
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


var i,
    s,
    N = 100,
    E = 500,
    g = {
        nodes: [],
        edges: []
    };
// Generate a random graph:
for (i = 0; i < N; i++)
    g.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666'
    });
for (i = 0; i < E; i++)
    g.edges.push({
        id: 'e' + i,
        source: 'n' + (Math.random() * N | 0),
        target: 'n' + (Math.random() * N | 0),
        size: Math.random(),
        color: '#ccc'
    });
// Instantiate sigma:
s = new sigma({
    graph: g,
    container: 'graph'
});