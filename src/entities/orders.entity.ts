import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseTable } from '../base';
import { OrderStatus } from '../enums';
import { Branch } from './branches.entity';
import { Customer } from './customers.entity';
import { Order_Product } from './orders_products.entity';
import { Product } from './products.entity';
import { Rule } from './rules.entity';
import { Store } from './stores.entity';
import { Tier } from './tiers.entity';
import { User } from './users.entity';

@Entity()
export class Order extends BaseTable {
  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.IS_NOT_ACCEPTED,
  })
  status: OrderStatus;

  @Column({
    nullable: false,
    default: 0,
  })
  total: number;

  @Column({
    nullable: true,
    default: '',
  })
  note: string;

  @Column({
    name: 'shipping_address',
    nullable: true,
    default: '',
  })
  shippingAddress: string;

  @Column({
    name: 'billing_address',
    nullable: true,
    default: '',
  })
  billingAddress: string;

  @Column({
    name: 'payment_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  paymentDate: number;

  @Column({
    name: 'delivery_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  deliveryDate: number;

  @OneToMany(() => Order_Product, (order_product) => order_product.order)
  orderProducts: Order_Product[];

  @ManyToOne(() => Customer, (customer) => customer.order, { onDelete: 'CASCADE' })
  customer: Customer;

  @ManyToOne(() => User, (user) => user.importerOrders, { onDelete: 'CASCADE' })
  importer: User;

  @ManyToOne(() => User, (user) => user.exporterOrders, { onDelete: 'CASCADE' })
  exporter: User;

  @ManyToOne(() => Store, (store) => store.orders, { onDelete: 'CASCADE' })
  store: Store;
}
