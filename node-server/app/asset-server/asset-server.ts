import * as express from 'express';

const UPLOAD_PATH = 'public/images';

const app: express.Application = express();
const port = 3334;

app.use(express.static(UPLOAD_PATH));
app.listen(port, () => console.log(`Asset server listening on port ${port}!`));
