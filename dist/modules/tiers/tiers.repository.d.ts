import { Repository } from 'typeorm';
import { Tier } from '../../entities/tiers.entity';
export declare class TiersRepository extends Repository<Tier> {
    constructor(repository: Repository<Tier>);
}
