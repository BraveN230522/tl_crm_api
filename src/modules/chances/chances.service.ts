import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChancesRepository } from './chances.repository';

@Injectable()
export class ChancesService {
  constructor(@InjectRepository(ChancesRepository) private usersRepository: ChancesRepository) {}
}
