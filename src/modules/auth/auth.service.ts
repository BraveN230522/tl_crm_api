import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { Member } from '../../entities/members.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { EncryptHelper, ErrorHelper } from '../../helpers';
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

    await this.userService.updateUser(found.id, { token: accessToken });

    return {
      ...mappingResponse,
      token: 'Bearer ' + accessToken,
    };
  }

  // async validate({ username, role }): Promise<User | Member> {
  async validate({ username, role }): Promise<any> {
    switch (role) {
      case Role.USER:
        return await this.userService.getUserByUsername({ username });
      case Role.MEMBER:
        return await this.userService.getUserByUsername({ username });

      default:
        break;
    }
  }
}
