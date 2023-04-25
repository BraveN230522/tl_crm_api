import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { User } from '../../entities/users.entity';
import { Role, UserStatus } from '../../enums';
import { IPaginationResponse } from '../../interfaces';
import {
  ChangePasswordDto,
  ConfirmForgotPasswordDto,
  CreateUserAdminDto,
  CreateUserDto,
  ForgotPasswordDto,
  GetUserDto,
  ResetPasswordDto,
  UpdateUserAdminDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AuthGuard(), RolesGuard)
  // @RoleDecorator(Role.SUPER_ADMIN)
  @Post('/admin')
  createUserAdmin(@Body() createUserAdminDto: CreateUserAdminDto): Promise<User> {
    return this.usersService.createUserAdmin(createUserAdminDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN)
  @Patch('/admin')
  updateUserAdmin(
    @Body() updateUserAdminDto: UpdateUserAdminDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.usersService.updateUserAdmin(updateUserAdminDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @UserDecorator() currentUser): Promise<User> {
    return this.usersService.createUser(createUserDto, currentUser.role);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Patch('/:id')
  updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.usersService.updateUser(id, updateUserDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Delete('/:id')
  deleteUser(@Param('id') id, @UserDecorator() currentUser): Promise<string> {
    return this.usersService.deleteUser(id, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  readUser(@Query() getUserDto: GetUserDto): Promise<IPaginationResponse<User>> {
    return this.usersService.readUser(getUserDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  getUser(@Param('id') id): Promise<User> {
    return this.usersService.getUser(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('/active/:id')
  activateUser(@Param('id') id, @UserDecorator() currentUser): Promise<string> {
    return this.usersService.toggleActivateUser(id, currentUser, UserStatus.Active);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('/inactive/:id')
  inactivateUser(@Param('id') id, @UserDecorator() currentUser): Promise<string> {
    return this.usersService.toggleActivateUser(id, currentUser, UserStatus.Inactive);
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
}
