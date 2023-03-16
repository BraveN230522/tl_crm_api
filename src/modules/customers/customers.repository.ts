import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../entities/customers.entity';

@Injectable()
export class customersRepository extends Repository<Customer> {
  constructor(
    @InjectRepository(Customer)
    repository: Repository<Customer>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
