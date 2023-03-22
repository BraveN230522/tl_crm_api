import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Product } from '../../entities/products.entity';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository);
  }
}
