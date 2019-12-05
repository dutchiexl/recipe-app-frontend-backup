"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const fs_1 = tslib_1.__importDefault(require("fs"));
const multer_1 = tslib_1.__importDefault(require("multer"));
let ApiController = class ApiController {
    constructor() {
        this.UPLOAD_PATH = 'public/images';
        this.upload = multer_1.default({ dest: `${this.UPLOAD_PATH}/` });
        this.type = this.upload.single('image');
    }
    getMessage(req, res) {
        logger_1.Logger.Info(req.params.msg);
        res.status(200).json({
            message: req.params.msg,
        });
    }
    postMessage(req, res) {
        let tmp_path = req.file.path;
        let target_path = this.UPLOAD_PATH + '/' + req.file.originalname;
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
    }
};
tslib_1.__decorate([
    core_1.Get(':msg'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiController.prototype, "getMessage", null);
tslib_1.__decorate([
    core_1.Post(':msg'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiController.prototype, "postMessage", null);
ApiController = tslib_1.__decorate([
    core_1.Controller('api')
], ApiController);
exports.ApiController = ApiController;
