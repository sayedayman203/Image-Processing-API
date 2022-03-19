import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getImg } from '../helpers/imgs';

export const cacheMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename } = req.params;
  const { width, height } = req.query;
  try {
    const path = await getImg(filename, {
      width: width as unknown as number,
      height: height as unknown as number,
    });
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    return res.sendFile(path);
  } catch (e) {
    switch (e) {
      case 'FULL': {
        return next(createHttpError(404));
      }
      case 'CUSTOM': {
        return next();
      }
      default: {
        return next(e);
      }
    }
  }
};
