import createHttpError from 'http-errors';
import multer from 'multer';

export const uploadImgMW = multer({
  limits: {
    fileSize: 10_000_000,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      return cb(createHttpError(400, 'Please upload an image'));
    }

    cb(null, true);
  },
});
