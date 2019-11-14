const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: '../src/assets/images'
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
