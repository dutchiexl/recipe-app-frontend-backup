import { Request, Response } from 'express';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import fs from 'fs';
import multer from 'multer';

@Controller('api')
export class ApiController {

  UPLOAD_PATH = 'public/images';
  upload = multer({dest: `${this.UPLOAD_PATH}/`});
  type = this.upload.single('image');

  @Get(':msg')
  private getMessage(req: Request, res: Response) {
    Logger.Info(req.params.msg);
    res.status(200).json({
      message: req.params.msg,
    });
  }

  @Post(':msg')
  private postMessage(req: Request, res: Response) {
    let tmp_path = req.file.path;
    let target_path = this.UPLOAD_PATH + '/' + req.file.originalname;

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
  }
}
