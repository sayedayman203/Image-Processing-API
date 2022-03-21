import { Request } from 'express';
import createHttpError from 'http-errors';
import multer, { FileFilterCallback } from 'multer';

export const uploadImgMW = multer({
  limits: {
    fileSize: 10_000_000,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void {
    if (!file.mimetype.startsWith('image')) {
      return cb(createHttpError(400, 'Please upload an image'));
    }

    cb(null, true);
  },
});
