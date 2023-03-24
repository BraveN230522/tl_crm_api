import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChanceProcessesRepository } from './chanceProcesses.repository';

@Injectable()
export class ChanceProcessesService {
  constructor(
    @InjectRepository(ChanceProcessesRepository) private usersRepository: ChanceProcessesRepository,
  ) {}
}
