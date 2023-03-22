import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Branch } from '../../entities/branches.entity';

@Injectable()
export class BranchesRepository extends BaseRepository<Branch> {
  constructor(
    @InjectRepository(Branch)
    repository: Repository<Branch>,
  ) {
    super(repository);
  }
}
