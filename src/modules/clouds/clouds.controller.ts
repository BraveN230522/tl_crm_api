import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { multerImageOptions } from '../../common/multers';
import { Role } from '../../enums';
import { ILinkResponse } from '../../interfaces';
import { CloudsService } from './clouds.service';

@Controller('clouds')
export class CloudsController {
  constructor(private cloudsService: CloudsService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @UseInterceptors(FileInterceptor('image', multerImageOptions))
  @Post()
  uploadImage(@UploadedFile() image: Express.Multer.File): Promise<ILinkResponse> {
    return this.cloudsService.uploadImage(image);
  }
}
