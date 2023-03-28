import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Branch } from './branches.entity';
import { Category } from './categories.entity';
import { Chance } from './chances.entity';
import { Customer } from './customers.entity';
import { Rule } from './rules.entity';
import { Store } from './stores.entity';
import { Tier } from './tiers.entity';

@Entity()
export class Product extends BaseTable {
  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column()
  cost: number;

  @Column()
  quantity: number;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(() => Category, (categories) => categories.products, { onDelete: 'CASCADE' })
  category: Category;

  @ManyToMany(() => Store, (store) => store.id, { cascade: true })
  @JoinTable({
    name: 'product_store',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' },
  })
  stores: Store[];

  @ManyToMany(() => Chance, (chance) => chance.id, { cascade: true })
  @JoinTable({
    name: 'product_chance',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'chanceId', referencedColumnName: 'id' },
  })
  chances: Chance[];
}
