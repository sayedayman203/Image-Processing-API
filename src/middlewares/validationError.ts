import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResponse } from '../helpers/responseFactory';

const validationResultAfterFormation = validationResult.withDefaults({
  formatter: (error) => {
    return {
      value: error.value,
      msg: error.msg,
      param: error.param,
    };
  },
});

export const catchValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResultAfterFormation(req);
  if (!result.isEmpty()) {
    return res.status(400).json(createResponse('fail', result.array()));
  }
  next();
};
