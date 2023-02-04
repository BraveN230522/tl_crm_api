import { User } from '../../entities/users.entity';
import { AuthService } from './auth.service';
import { AdminCredentialsDto } from './dto/auth.dto';
export declare class AuthController {
    private adminService;
    constructor(adminService: AuthService);
    loginUser(adminCredentialsDto: AdminCredentialsDto): Promise<User>;
}
