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

  @Column()
  total: string;

  @ManyToMany(() => Product, (product) => product.id, { cascade: true })
  @JoinTable({
    name: 'product_order',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];

  @OneToOne(() => User)
  @JoinColumn()
  importer: User;

  @OneToOne(() => User)
  @JoinColumn()
  exporter: User;
}
