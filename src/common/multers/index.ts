import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';
import { IMAGE_MAX_SIZE } from '../../constants';
import { mbToByte } from '../../utilities';

export const multerImageOptions: MulterOptions = {
  limits: {
    fileSize: mbToByte(IMAGE_MAX_SIZE),
  },
  fileFilter(req, image, callback) {
    if (image.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported image type ${extname(image.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};
