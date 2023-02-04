import { Strategy } from 'passport-jwt';
import { AppConfigService } from '../../configuration';
import { Member } from '../../entities/members.entity';
import { User } from '../../entities/users.entity';
import { JwtPayload } from '../../interfaces';
import { AuthService } from '../../modules/auth/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private appConfigService;
    constructor(authService: AuthService, appConfigService: AppConfigService);
    validate(payload: JwtPayload): Promise<User | Member>;
}
export {};
