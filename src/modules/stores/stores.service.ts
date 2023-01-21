import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(StoresRepository) private usersRepository: StoresRepository) {}
}
