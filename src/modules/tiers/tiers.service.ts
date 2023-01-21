import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiersRepository } from './tiers.repository';

@Injectable()
export class TiersService {
  constructor(@InjectRepository(TiersRepository) private usersRepository: TiersRepository) {}
}
