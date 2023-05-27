import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Order } from './orders.entity';
import { Product } from './products.entity';
import { Chance } from './chances.entity';

@Entity()
export class Chance_Product extends BaseTable {
  constructor(partial: Partial<Chance_Product>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    nullable: true,
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.chanceProducts, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Chance, (chance) => chance.chanceProducts, { onDelete: 'CASCADE' })
  chance: Chance;
}
