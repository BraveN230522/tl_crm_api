import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RulesRepository } from './rules.repository';

@Injectable()
export class RulesService {
  constructor(@InjectRepository(RulesRepository) private usersRepository: RulesRepository) {}
}
