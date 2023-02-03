import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  // @RoleDecorator(Role.USER)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
