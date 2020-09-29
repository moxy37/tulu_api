global.__base = __dirname + '/';
global.__listeningPort = 3001;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var app = express();

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(__listeningPort, function () {
    console.log('Spartacus Node listening on port ' + __listeningPort);
    var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
    var ddCon = new DocumentDefinitionDAO();
    ddCon.getAll('', function (err, list) {
        console.log("Document definitions and cached documents loaded");
    });
});


process.on('uncaughtException', function (err) { console.log(err); });

app.use('/', require('./controllers/core/documentcontroller'));
app.use('/', require('./controllers/core/definitioncontroller'));
app.use('/', require('./controllers/core/reportcontroller'));
app.use('/', require('./controllers/client/test/testcontroller'));
app.use('/', require('./controllers/client/vehicle/vehiclecontroller'));
// app.get('/', function (request, response) {
//     response.render('client/index');
// });


module.exports = app;