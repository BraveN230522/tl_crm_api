import { BaseTable } from '../base';
import { Branch } from './branches.entity';
import { Member } from './members.entity';
import { Rule } from './rules.entity';
import { Tier } from './tiers.entity';
export declare class Store extends BaseTable {
    constructor(partial: Partial<Store>);
    email: string;
    phone: string;
    businessType: string;
    storeImage: string;
    privacyPolicy: string;
    branch: Branch;
    rules: Rule[];
    tiers: Tier[];
    members: Member[];
}
