import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Rule } from '../../entities/rules.entity';

@Injectable()
export class RulesRepository extends BaseRepository<Rule> {
  constructor(
    @InjectRepository(Rule)
    repository: Repository<Rule>,
  ) {
    super(repository);
  }
}
