import { BaseTable } from '../base';
import { Gender } from '../enums';
import { TierStatus } from '../enums/tiers';
import { Store } from './stores.entity';
export declare class Tier extends BaseTable {
    constructor(partial: Partial<Tier>);
    name: string;
    desc: string;
    status: TierStatus;
    level: number;
    gap: Gender;
    tierRate: string;
    dobTierRate: number;
    store: Store;
}
