import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
export declare class User extends BaseTable {
    constructor(partial: Partial<User>);
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role: Role;
    token?: string;
    branch?: Branch;
}
