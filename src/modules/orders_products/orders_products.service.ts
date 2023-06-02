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

  async readOne(productId, orderId): Promise<Order_Product> {
    const found = await this.ordersProductsRepository
      .createQueryBuilder('op')
      .where('op.productId = :productId', { productId })
      .andWhere('op.orderId = :orderId', { orderId })
      .getOne();

    if (!found) return null;

    return found;
  }

  async create({ order, product, quantity }: IOrderProduct): Promise<void> {
    const orderProduct = this.ordersProductsRepository.create({
      order,
      product,
      quantity,
    });

    this.ordersProductsRepository.save([orderProduct]);
  }

  async update({ order, product, quantity }: IOrderProduct): Promise<void> {
    const orderProduct = await this.readOne(product.id, order.id);
    await this.ordersProductsRepository.update(orderProduct.id, {
      order,
      product,
      quantity,
    });
  }

  async delete({order, product}): Promise<void> {
    const orderProduct = await this.readOne(product?.id, order?.id);
    if(!orderProduct?.id) return;
    await this.ordersProductsRepository.delete(orderProduct?.id);
  }

  async clearByOrder(order: any): Promise<void> {
    await this.ordersProductsRepository
      .createQueryBuilder('orderProducts')
      .delete()
      .from(Order_Product)
      .where('orderId = :id', { id: order?.id })
      .execute();
  }
}
