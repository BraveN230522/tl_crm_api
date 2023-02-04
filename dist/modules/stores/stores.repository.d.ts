import { Repository } from 'typeorm';
import { Store } from '../../entities/stores.entity';
export declare class StoresRepository extends Repository<Store> {
    constructor(repository: Repository<Store>);
}
