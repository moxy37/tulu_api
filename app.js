global.__base = __dirname + '/';
global.__listeningPort = 3001;

var fs = require('fs');
var https = require('https');
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

global.__ccc = require(__base + "dbConnection");
global.__con = require(__base + "dbGateway");
global.__currentTokens = new Object();
global.__userToTokens = new Object();
global.__defaultSessionTime = 900000;

app.listen(__listeningPort, function () {
    console.log('Spartacus Node listening on port ' + __listeningPort);

});

// https.createServer({
//     key: fs.readFileSync(__base + 'key.pem'),
//     cert: fs.readFileSync(__base + 'cert.pem')
// }, app).listen(3001, function () {
//     console.log('Example app listening on port 3000! Go to https://localhost:3001/')
// });
process.on('uncaughtException', function (err) { console.log(err); });

app.use('/', require('./controllers/client/test/testcontroller'));
app.use('/', require('./controllers/client/vehicle/vehiclecontroller'));
app.use('/', require('./controllers/client/users/userscontroller'));
app.use('/', require('./controllers/client/dealer/dealercontroller'));
app.use('/', require('./controllers/core/helpercontroller'));
app.use('/', require('./controllers/core/routingcontroller'));


module.exports = app;