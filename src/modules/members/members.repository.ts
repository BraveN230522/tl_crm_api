import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/members.entity';

@Injectable()
export class MembersRepository extends Repository<Member> {
  constructor(
    @InjectRepository(Member)
    repository: Repository<Member>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
