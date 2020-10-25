global.__base = __dirname + "/";
global.__listeningPort = 3001;

var fs = require("fs");
var formidable = require("formidable");
var readChunk = require("read-chunk");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cons = require("consolidate");
var app = express();
var detect = require("detect-file-type");
const { on } = require("process");

app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);
app.use(express.static(path.join(__dirname, "public")));

global.__ccc = require(__base + "dbConnection");
global.__con = require(__base + "dbGateway");
global.__currentTokens = new Object();
global.__userToTokens = new Object();
global.__defaultSessionTime = 900000;

app.listen(__listeningPort, function () {
    console.log("Spartacus Node listening on port " + __listeningPort);
});

// https.createServer({
//     key: fs.readFileSync(__base + 'key.pem'),
//     cert: fs.readFileSync(__base + 'cert.pem')
// }, app).listen(3001, function () {
//     console.log('Example app listening on port 3000! Go to https://localhost:3001/')
// });
process.on("uncaughtException", function (err) {
    console.log(err);
});

app.use("/", require("./controllers/test/testcontroller"));
app.use("/", require("./controllers/vehicle/vehiclecontroller"));
app.use("/", require("./controllers/users/userscontroller"));
app.use("/", require("./controllers/dealer/dealercontroller"));
app.use("/", require("./controllers/core/helpercontroller"));
app.use("/", require("./controllers/core/routingcontroller"));

app.post("/api/file/upload", function (req, res) {
    // const { v4: uuidv4 } = require('uuid');
    // uuidv4()
    var photos = [];
    var headers = req.headers;
    var dealerId = headers.dealerid;
    var tokenId = headers.tokenid;
    var vin = headers.vin;
    var uid = headers.uuid;
    var myExt = headers.myext;
    var old_name = '';
    var s = 0;
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, "tmp_uploads");
    form.on("file", function (name, file) {
        var buffer = null;
        var type = null;
        var filename = "";

        (async () => {
            buffer = readChunk.sync(file.path, 0, 262);
            type = await detect.fromBuffer(buffer, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })();

        if (type !== null) {
            old_name = file.name;
            filename = uid + "." + myExt;
            fs.rename(
                file.path,
                path.join(__dirname, "public/uploads/" + filename)
            );
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: "public/uploads/" + filename,
            });
        } else {
            // photos.push({ status: false, filename: file.name, message: 'Invalid file type' });
            // fs.unlink(file.path);
            old_name = file.name;
            console.log("Sone Error");
            filename = uid + "." + myExt;
            fs.rename(
                file.path,
                path.join(__dirname, "public/uploads/" + filename),
                function (err) {
                    if (err) throw err;
                }
            );
            photos.push({
                status: true,
                filename: filename,
                type: "." + myExt,
                publicPath: "public/uploads/" + filename,
            });
        }
    });
    form.on("error", function (err) {
        console.log("Error occurred during processing - " + err);
    });
    form.on("end", function () {
        console.log("All the request fields have been processed.");
    });
    form.parse(req, function (err, fields, files) {
        var o = new Object();
        o.url = '/uploads/' + uid + "." + myExt;
        o.vin = vin;
        o.dealerId = dealerId;
        o.name = old_name;
        o.type = 'image';
        o.sequence = 0;
        return res.send(o);
    });
});

module.exports = app;
