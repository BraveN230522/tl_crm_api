import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import {
  ChangePasswordDto,
  ConfirmForgotPasswordDto,
  CreateUserAdminDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AuthGuard(), RolesGuard)
  // @RoleDecorator(Role.SUPER_ADMIN)
  @Post('/admin')
  createUser(@Body() createUserAdminDto: CreateUserAdminDto): Promise<User> {
    return this.usersService.createUserAdmin(createUserAdminDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  // @RoleDecorator(Role.USER)
  @Post('/change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.usersService.changePassword(changePasswordDto, currentUser);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    return this.usersService.forgotPassword(forgotPasswordDto);
  }

  @Post('/confirm-forgot-password')
  confirmForgotPassword(
    @Body() confirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ): Promise<string> {
    return this.usersService.confirmForgotPasswordOtp(confirmForgotPasswordDto);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<string> {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @Get()
  getUser(): any {
    return 'hello Long Béo';
  }
}
