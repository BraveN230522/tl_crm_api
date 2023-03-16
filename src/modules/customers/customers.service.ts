import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customersRepository } from './customers.repository';

@Injectable()
export class customersService {
  constructor(
    @InjectRepository(customersRepository) private customersRepository: customersRepository,
  ) {}
}
