import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ChangePasswordDto, CreateUserDto, ForgotPasswordDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  // @RoleDecorator(Role.USER)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Post('/change-password')
  // @RoleDecorator(Role.USER)
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

  @Get()
  // @RoleDecorator(Role.USER)
  getUser(): any {
    return 'hello Long Béo';
  }
}
