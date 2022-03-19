import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// helpers
import { saveResizeImg } from '../helpers/imgs';

export const resizeImgMWF = (type: 'uploaded' | 'resize') => {
  // default format is jpeg cross app
  return async (req: Request, res: Response, next: NextFunction) => {
    const newFilename = `${uuidv4()}.jpeg`;
    try {
      if (type === 'uploaded' && req.file) {
        const { buffer } = req.file;
        saveResizeImg(buffer, {
          filename: newFilename,
          type: 'full',
        });
        const { filename, fullPath } = await saveResizeImg(buffer, {
          filename: newFilename,
          type: 'thumbnail',
        });
        res.locals = {
          ...res.locals,
          filename,
          fullPath,
        };
      } else {
        const { filename } = req.params;
        const { width, height } = req.query;
        const { filename: imageFileName, fullPath } = await saveResizeImg(
          filename,
          {
            filename,
            type: 'custom',
            width: width as unknown as number,
            height: height as unknown as number,
          }
        );
        res.locals = {
          ...res.locals,
          filename: imageFileName,
          fullPath,
        };
      }
      next();
    } catch (e) {
      next(e);
    }
  };
};
