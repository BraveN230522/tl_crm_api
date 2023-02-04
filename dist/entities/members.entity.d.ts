import { BaseTable } from '../base';
import { Gender } from '../enums';
import { Store } from './stores.entity';
export declare class Member extends BaseTable {
    constructor(partial: Partial<Member>);
    phone: string;
    firstName: string;
    lastName: string;
    dob: number;
    gender: Gender;
    address: string;
    point: number;
    cashback: number;
    rate: number;
    stores: Store[];
}
