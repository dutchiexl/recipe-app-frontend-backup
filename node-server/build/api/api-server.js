"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const UPLOAD_PATH = 'public/images';
const upload = multer_1.default({ dest: `${UPLOAD_PATH}/` });
const type = upload.single('image');
const app = express_1.default();
const port = 3333;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.post('/api/upload', type, (req, res) => {
    let tmp_path = req.file.path;
    let target_path = UPLOAD_PATH + '/' + req.file.originalname;
    /** A better way to copy the uploaded file. **/
    let src = fs_1.default.createReadStream(tmp_path);
    let dest = fs_1.default.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () {
        fs_1.default.unlink(tmp_path, function (err) {
            if (err)
                throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
        res.json({
            'fileName': req.file.originalname
        });
    });
    src.on('error', function (err) { res.json({ 'error': err }); });
});
class ApiServer {
    static run() {
        app.listen(port, () => console.log(`API listening on port ${port}!`));
    }
}
exports.ApiServer = ApiServer;
