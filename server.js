var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var server = app.listen(7300, function () {
    console.log('This is the group chat web app listening on port 7300');
});

var route = require('./routes/routes.js')(app, server);






