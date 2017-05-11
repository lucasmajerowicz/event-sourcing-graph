const Controller = require('./js/server/Controller');

var express = require('express')
    , bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/events', function(request, response){
    console.log(request.body);
    Controller.insertEvents(request.body.events, request.body.parentId).then((catalog) => {
        response.send(catalog);    // echo the result back
    })
});

app.get('/catalog/:id', function(request, response){
    Controller.getCatalog(request.params.id).then((catalog) => {
        response.send(catalog);    // echo the result back
    })
});

app.listen(3000);
