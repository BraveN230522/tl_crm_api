import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, RolesGuard, UserDecorator } from '../../common';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
// import { AdminGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AdminCredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private adminService: AuthService) {}

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  loginUser(
    @Body(new ValidationPipe({ transform: true })) adminCredentialsDto: AdminCredentialsDto,
  ): Promise<User> {
    return this.adminService.loginUser(adminCredentialsDto);
  }

  @Delete('/logout')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  logout(@UserDecorator() currentUser): Promise<string> {
    return this.adminService.logout(currentUser);
  }
}
