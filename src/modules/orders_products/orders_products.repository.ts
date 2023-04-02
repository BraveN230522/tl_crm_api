import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Order_Product } from '../../entities/orders_products.entity';

@Injectable()
export class OrdersProductsRepository extends BaseRepository<Order_Product> {
  constructor(
    @InjectRepository(Order_Product)
    repository: Repository<Order_Product>,
  ) {
    super(repository);
  }
}
