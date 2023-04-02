import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersProductsRepository } from './orders_products.repository';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(OrdersProductsRepository)
    private ordersRepository: OrdersProductsRepository,
  ) {}
}
