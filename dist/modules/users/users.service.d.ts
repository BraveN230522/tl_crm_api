import { User } from '../../entities/users.entity';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getUser(id: any): Promise<User>;
    getUserByUsername({ username }: {
        username: any;
    }): Promise<User>;
    createUser(createUserDto: any): Promise<any>;
    updateUser(id: any, updateUserDto: any): Promise<string>;
}
