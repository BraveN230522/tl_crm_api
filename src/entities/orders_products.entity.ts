import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity()
export class Order_Product extends BaseTable {
  constructor(partial: Partial<Order_Product>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    nullable: true,
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderProducts, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  order: Order;
}
