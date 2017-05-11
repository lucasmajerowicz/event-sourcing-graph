const Controller = require('./js/server/Controller');

var express = require('express')
    , bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/events', function(request, response){
    Controller.insertEvent(request.body).then((catalog) => {
        response.send(catalog);    // echo the result back
    })
});

app.listen(3000);
