import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesRepository } from './branches.repository';

@Injectable()
export class BranchesService {
  constructor(@InjectRepository(BranchesRepository) private usersRepository: BranchesRepository) {}
}
