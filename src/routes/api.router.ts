import express from 'express';

import { apiController } from '../controllers';
import { cacheMW } from '../middlewares/cache';

import { apiValidations } from '../validations';
import { catchValidationError } from '../middlewares/validationError';
import { uploadImgMW } from '../middlewares/upload';
import { resizeImgMWF } from '../middlewares/imgs';

const router = express.Router();

router
  .route('/')
  .post(
    uploadImgMW.single('img'),
    apiValidations.uploadPhoto,
    catchValidationError,
    resizeImgMWF('uploaded'),
    apiController.uploadPhoto
  )
  .get(apiController.getRandom);

router.get(
  '/:filename',
  apiValidations.resizeImg,
  catchValidationError,
  cacheMW,
  resizeImgMWF('resize'),
  apiController.getPhoto
);
export default router;
