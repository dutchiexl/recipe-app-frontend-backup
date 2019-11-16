const path = require('path');
const express = require('express');
const app = express();
const port = 3333;

const assetDir = path.join(__dirname, 'public');
console.log(assetDir);
const assetServer = express();
const assetServerPort = 3334;

const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './public/images'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/upload', multipartMiddleware, (req, res) => {
  console.log(req);
  let file = req.files.image;
  res.json({
    'fileName': file.path
  })
});

app.listen(port, () => console.log(`API listening on port ${port}!`));

assetServer.use(express.static(assetDir));
assetServer.listen(assetServerPort, () => console.log(`Asset server listening on port ${assetServerPort}!`));
