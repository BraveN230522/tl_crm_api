import { Repository } from 'typeorm';
import { Member } from '../../entities/members.entity';
export declare class MembersRepository extends Repository<Member> {
    constructor(repository: Repository<Member>);
}
