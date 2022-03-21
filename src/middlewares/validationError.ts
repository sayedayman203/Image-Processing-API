import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { createResponse } from '../helpers/responseFactory';

const validationResultAfterFormation = validationResult.withDefaults({
  formatter: (
    error: ValidationError
  ): { value: string; msg: string; param: string } => {
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
): void => {
  const result = validationResultAfterFormation(req);
  if (!result.isEmpty()) {
    res.status(400).json(createResponse('fail', result.array()));
  } else {
    next();
  }
};
