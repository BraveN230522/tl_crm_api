import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order_Product } from '../../entities/orders_products.entity';
import { IOrderProduct } from '../../interfaces';
import { OrdersProductsRepository } from './orders_products.repository';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(OrdersProductsRepository)
    private ordersProductsRepository: OrdersProductsRepository,
  ) {}

  async create({ order, product, quantity }: IOrderProduct): Promise<void> {
    const orderProduct = this.ordersProductsRepository.create({
      order,
      product,
      quantity,
    });

    this.ordersProductsRepository.save([orderProduct]);
  }

  async clearByOrder({ order }: IOrderProduct): Promise<void> {
    await this.ordersProductsRepository
      .createQueryBuilder('orderProducts')
      .delete()
      .from(Order_Product)
      .where('orderId = :id', { id: order?.id })
      .execute();
  }
}
