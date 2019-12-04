import * as express from 'express';
import * as multer from 'multer';

const UPLOAD_PATH = 'public/images';
const upload = multer({dest: `${UPLOAD_PATH}/`});

const app: express.Application = express();
const port = 3333;

app.post('/api/upload', upload.single('avatar'), (req, res) => {
  let file = req.files.image;
  res.json({
    'fileName': file.path
  })
});

app.listen(port, () => console.log(`API listening on port ${port}!`));
