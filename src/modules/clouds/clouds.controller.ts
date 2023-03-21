import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { multerImageOptions } from '../../common/multers';
import { Store } from '../../entities/stores.entity';
import { Role } from '../../enums';
import { CloudsService } from './clouds.service';

@Controller('clouds')
// @UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class CloudsController {
  constructor(private cloudsService: CloudsService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @UseInterceptors(FileInterceptor('image', multerImageOptions))
  @Post()
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @UserDecorator() currentUser,
  ): Promise<Store> {
    return this.cloudsService.uploadImage(image, currentUser);
  }
}
