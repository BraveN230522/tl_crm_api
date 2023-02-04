import { Repository } from 'typeorm';
import { Rule } from '../../entities/rules.entity';
export declare class RulesRepository extends Repository<Rule> {
    constructor(repository: Repository<Rule>);
}
