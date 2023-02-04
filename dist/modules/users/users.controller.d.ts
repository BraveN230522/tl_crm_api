import { User } from '../../entities/users.entity';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUser(): any;
}
