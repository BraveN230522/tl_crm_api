import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from '../../entities/rules.entity';

@Injectable()
export class RulesRepository extends Repository<Rule> {
  constructor(
    @InjectRepository(Rule)
    repository: Repository<Rule>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
