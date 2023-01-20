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
import _ from 'lodash';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { CreateUserDto, FilterUserDto } from './dto/users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
// @UseGuards(AuthGuard())
@UseGuards(AuthGuard(), RolesGuard)
@RoleDecorator(Role.SUPER_ADMIN)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @RoleDecorator(Role.USER, Role.ADMIN)
  getUsers(@Query() filterUserDto: FilterUserDto) {
    return this.usersService.getUsers(filterUserDto);
  }

  @Get('/:id')
  @RoleDecorator(Role.USER, Role.SUPER_ADMIN)
  getUser(@Param('id') id): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
