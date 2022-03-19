import { check } from 'express-validator';

export const uploadPhoto = [
  check('img')
    .custom((value, { req }) => {
      if (req.file?.mimetype.startsWith('image')) {
        return true;
      }
      return false;
    })
    .withMessage('REQUIRED'),
];

export const resizeImg = [
  check('width').optional().isInt({ min: 1 }).withMessage('NUMBER_MIN_0'),
  check('height').optional().isInt({ min: 1 }).withMessage('NUMBER_MIN_0'),
];
