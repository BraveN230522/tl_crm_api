import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../../configuration';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { JwtPayload } from '../../interfaces';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private appConfigService: AppConfigService) {
    super({
      secretOrKey: appConfigService.accessTokenSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User | Customer> {
    const auth = await this.authService.validate(payload);
    if (!auth) ErrorHelper.UnauthorizedException();

    return auth;
  }
}
