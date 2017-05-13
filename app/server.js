const generateUUID = require('./js/util');
const Controller = require('./js/server/Controller');
const AddCatalogEvent = require('./js/events/AddCatalogEvent');
const AddCategoryEvent = require('./js/events/AddCategoryEvent');
const AddProductEvent = require('./js/events/AddProductEvent');

var express = require('express')
    , bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/events', function(request, response){
    Controller.insertEvents(request.body.events, request.body.parentId, (catalog) => {
        response.send(catalog);    // echo the result back
    })
});

app.get('/catalog/:id', function(request, response){
    Controller.getCatalog(request.params.id).then((catalog) => {
        response.send(catalog);    // echo the result back
    }).catch((e) => {
        response.send(e);    // echo the result back
    })

});

app.get('/events/:id', function(request, response){
    Controller.getEvents(request.params.id).then((events) => {
        response.send({ events });    // echo the result back
    }).catch((e) => {
        response.send(e);    // echo the result back
    })
});

app.get('/default', function(request, response){
    const phoneCategory = generateUUID();
    const tabletCategory = generateUUID();
    const events = [
        new AddCatalogEvent(generateUUID(), 'My Catalog'),
        new AddCategoryEvent(null, phoneCategory, 'Phones'),
        new AddCategoryEvent(null, tabletCategory, 'Tablets'),
        new AddProductEvent(null, generateUUID(), 'iPhone', '1000', 'yes', 'black', phoneCategory),
        new AddProductEvent(null, generateUUID(), 'iPad', '2000', 'yes', 'white', tabletCategory),
        new AddProductEvent(null, generateUUID(), 'Nexus 5', '600', 'no', 'red', phoneCategory)
    ];

    Controller.insertEvents(events, null, (catalog) => {
        response.send(catalog);    // echo the result back
    })
});

app.delete('/events/:id', function(request, response){
    Controller.deleteEvent(request.params.id).then((catalog) => {
        response.send(catalog);    // echo the result back
    }).catch((e) => {
        response.send(e);    // echo the result back
    })

});

app.post('/events/:id/merge/:from', function(request, response){
    Controller.mergeEvents(request.params.id, request.params.from).then((catalog) => {
        response.send(catalog);    // echo the result back
    }).catch((e) => {
        response.send(e);    // echo the result back
    })

});

app.listen(80);
