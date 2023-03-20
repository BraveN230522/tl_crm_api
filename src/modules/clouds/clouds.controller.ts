import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Store } from '../../entities/stores.entity';
import { Role } from '../../enums';
import { CloudsService } from './clouds.service';

@Controller('clouds')
// @UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class CloudsController {
  constructor(private cloudsService: CloudsService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  // @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     // limits: {
  //     //   fileSize: 10 * 1024 * 1024,
  //     // },
  //     fileFilter(req, image, callback) {
  //       console.log({ image });
  //       if (image.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
  //         callback(null, true);
  //       } else {
  //         callback(
  //           new HttpException(
  //             `Unsupported image type ${extname(image.originalname)}`,
  //             HttpStatus.BAD_REQUEST,
  //           ),
  //           false,
  //         );
  //       }
  //     },
  //   }),
  // )
  @Post()
  uploadImage(
    // @UploadedFile() image: Express.Multer.File,
    @UserDecorator() currentUser,
  ): Promise<Store> {
    // console.log({ image });
    return this.cloudsService.uploadImage(currentUser);
  }
}
