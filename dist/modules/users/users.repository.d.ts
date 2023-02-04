import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { User } from '../../entities/users.entity';
export declare class UsersRepository extends BaseRepository<User> {
    constructor(repository: Repository<User>);
}
