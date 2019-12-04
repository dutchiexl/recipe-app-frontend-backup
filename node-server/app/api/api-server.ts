import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';

const UPLOAD_PATH = 'public/images';
const upload = multer({dest: `${UPLOAD_PATH}/`});
const type = upload.single('image');

const app: express.Application = express();
const port = 3333;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/upload', type, (req, res) => {
  let tmp_path = req.file.path;
  let target_path = UPLOAD_PATH + '/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  let src = fs.createReadStream(tmp_path);
  let dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function () {
    fs.unlink(tmp_path, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    res.json({
      'fileName': req.file.originalname
    });
  });
  src.on('error', function (err) { res.json({'error': err}); });
});

export class ApiServer {
  public static run() {
    app.listen(port, () => console.log(`API listening on port ${port}!`));
  }
}
