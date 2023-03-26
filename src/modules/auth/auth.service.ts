import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { EncryptHelper, ErrorHelper } from '../../helpers';
import { APP_MESSAGE } from '../../messages';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async loginUser({ username, password }): Promise<User> {
    const found = await this.userService.getUserByUsername({ username });

    const isMatchPassword = await EncryptHelper.compare(password || '', found?.password || '');
    const isMatchUsername = username === found?.username;

    const match = isMatchPassword && isMatchUsername;

    if (!match) ErrorHelper.UnauthorizedException(`Username or password is incorrect`);

    const payload = { username, role: found.role };
    const accessToken = await this.jwtService.sign(payload);

    const mappingResponse = _.omit(found, ['password']) as User;

    const isLogin = true;

    await this.userService.updateUser(found.id, { token: accessToken }, null, isLogin);

    return {
      ...mappingResponse,
      token: 'Bearer ' + accessToken,
    };
  }

  async logout(currentUser: User): Promise<string> {
    await this.userService.updateUser(currentUser.id, { token: null });

    return APP_MESSAGE.LOGOUT_SUCCESSFULLY;
  }

  // async validate({ username, role }): Promise<User | Customer> {
  async validate({ username, role }): Promise<User> {
    switch (role) {
      case Role.ADMIN:
      case Role.B_MANAGER:
      case Role.S_MANAGER:
      case Role.STAFF:
        return await this.userService.getUserByUsername({ username });

      default:
        break;
    }
  }
}
