import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/users.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UsersService);
    loginUser({ username, password }: {
        username: any;
        password: any;
    }): Promise<User>;
    validate({ username, role }: {
        username: any;
        role: any;
    }): Promise<any>;
}
