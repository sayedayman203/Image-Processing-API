import { NextFunction, Request, Response } from 'express';
import { createResponse } from '../helpers/responseFactory';
import { randomN } from '../helpers/imgs';

export const uploadPhoto = (req: Request, res: Response): void => {
  res
    .status(201)
    .json(createResponse('success', { filename: res.locals.filename }));
};

export const getRandom = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { n } = req.query;
    const imgs = await randomN(n as unknown as number);
    res.status(200).json(createResponse('success', imgs));
  } catch (e) {
    next(e);
  }
};

export const getPhoto = (req: Request, res: Response): void => {
  const { filename } = req.params;
  const { fullPath } = res.locals;
  res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
  return res.sendFile(fullPath);
};
