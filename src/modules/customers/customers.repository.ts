import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Customer } from '../../entities/customers.entity';

@Injectable()
export class CustomersRepository extends BaseRepository<Customer> {
  constructor(
    @InjectRepository(Customer)
    repository: Repository<Customer>,
  ) {
    super(repository);
  }
}
