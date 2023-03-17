import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/products.entity';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
