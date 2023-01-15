import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../interfaces';
import { Role } from '../../enums';
import { Admin } from '../../modules/admin/admin.entity';
import { AdminRepository } from '../../modules/admin/admin.repository';
import { UsersRepository } from '../../modules/users/users.repository';
import { AuthService } from '../../modules/auth/auth.service';
import { User } from '../../modules/users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'top',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User | Admin> {
    const auth = this.authService.validate(payload);
    if (!auth) throw new UnauthorizedException();

    return auth;
  }
}
