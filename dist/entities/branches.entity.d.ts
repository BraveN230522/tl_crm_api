import { BaseTable } from '../base';
import { Store } from './stores.entity';
import { User } from './users.entity';
export declare class Branch extends BaseTable {
    constructor(partial: Partial<Branch>);
    name: string;
    announcements: string;
    memberUrl: string;
    isActiveTiers?: boolean;
    user: User;
    stores: Store[];
}
