"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var app = express();
var port = 3333;
var assetDir = path.join(__dirname, 'public');
var assetServer = express();
var assetServerPort = 3334;
var bodyParser = require("body-parser");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({
    uploadDir: '../public/images'
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api/upload', multipartMiddleware, function (req, res) {
    console.log(req);
    var file = req.files.image;
    res.json({
        'fileName': file.path
    });
});
app.listen(port, function () { return console.log("API listening on port " + port + "!"); });
assetServer.use(express.static(assetDir));
assetServer.listen(assetServerPort, function () { return console.log("Asset server listening on port " + assetServerPort + "!"); });
