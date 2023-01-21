import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { Member } from '../../entities/members.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  // async loginAdmin({ username, password }): Promise<Admin> {
  //   // bcrypt.genSalt(1, function (err, salt) {
  //   //   bcrypt.hash('123', salt, function (err, hash) {
  //   //     console.log({ hash });
  //   //     // Store hash in your password DB.
  //   //   });
  //   // });
  //   // return;
  //   const found = await this.adminService.getAdminByUsername({ username });

  //   const match =
  //     (await bcrypt.compare(password || '', found?.password || '')) && username === found?.username;

  //   if (!match) ErrorHelper.UnauthorizedException(`Username or password is incorrect`);

  //   const payload = { username, role: found.role };
  //   const accessToken = await this.jwtService.sign(payload);

  //   const mappingResponse = _.omit(found, ['password', 'role']) as Admin;

  //   await this.adminService.updateAdmin(found.id, { token: accessToken });

  //   return {
  //     ...mappingResponse,
  //     token: 'Bearer ' + accessToken,
  //   };

  //   // return found;
  // }

  // async validate({ username, role }): Promise<User | Member> {
  async validate({ username, role }): Promise<any> {
    switch (role) {
      case Role.USER:
      // return await this.userService.getUserByUsername({ username });
      case Role.MEMBER:
      // return await this.userService.getUserByUsername({ username });

      default:
        break;
    }
  }
}
