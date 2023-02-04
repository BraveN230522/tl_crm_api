import { Repository } from 'typeorm';
import { Branch } from '../../entities/branches.entity';
export declare class BranchesRepository extends Repository<Branch> {
    constructor(repository: Repository<Branch>);
}
