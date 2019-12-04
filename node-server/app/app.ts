import * as express from 'express';
import * as multer from 'multer';

const UPLOAD_PATH = 'public/images';
const upload = multer({dest: `${UPLOAD_PATH}/`});

const app: express.Application = express();
const port = 3333;

app.post('/profile', upload.single('avatar'), async (req, res) => {
  try {
    let file = req.files.image;
    res.json({
      'fileName': file.path
    })
  } catch (err) {
    res.sendStatus(400);
  }
})

// const assetDir = path.join(__dirname, 'public');
// const assetServer = express();
// const assetServerPort = 3334;
//
// const multipartMiddleware = multipart({
//   uploadDir: '../public/images'
// });
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
app.post('/api/upload', upload.single('avatar'), (req, res) => {
  let file = req.files.image;
  res.json({
    'fileName': file.path
  })
});

app.listen(port, () => console.log(`API listening on port ${port}!`));

assetServer.use(express.static(assetDir));
assetServer.listen(assetServerPort, () => console.log(`Asset server listening on port ${assetServerPort}!`));
