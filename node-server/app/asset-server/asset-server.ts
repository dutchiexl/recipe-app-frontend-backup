import express from 'express';

const UPLOAD_PATH = 'public';

const app: express.Application = express();
const port = 3334;
app.use(express.static(UPLOAD_PATH));

export class AssetServer {
  public static run() {
    app.listen(port, () => console.log(`Asset server listening on port ${port}!`));
  }
}
