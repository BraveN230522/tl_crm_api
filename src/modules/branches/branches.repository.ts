import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branches.entity';

@Injectable()
export class BranchesRepository extends Repository<Branch> {
  constructor(
    @InjectRepository(Branch)
    repository: Repository<Branch>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
