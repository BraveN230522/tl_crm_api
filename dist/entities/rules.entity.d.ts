import { BaseTable } from '../base';
import { Store } from './stores.entity';
export declare class Rule extends BaseTable {
    constructor(partial: Partial<Rule>);
    title: string;
    startTime: string;
    endTime: string;
    storeImage: string;
    privacyPolicy: string;
    ruleRate: number;
    dobRuleRate: number;
    store: Store;
}
