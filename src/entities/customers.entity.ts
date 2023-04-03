import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Gender } from '../enums';
import { Chance } from './chances.entity';
import { Classification } from './classifications.entity';
import { Order } from './orders.entity';
import { Store } from './stores.entity';
import { Tier } from './tiers.entity';

@Entity()
export class Customer extends BaseTable {
  constructor(partial: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  phone: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({ type: 'bigint' })
  dob: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender;

  @Column()
  address: string;

  @Column()
  point: number;

  @Column()
  cashback: number;

  @Column()
  rate: number;

  @Column({
    nullable: true,
    default: null,
    name: 'tax_code',
  })
  taxCode: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(() => Tier, (tier) => tier.customers, { onDelete: 'CASCADE' })
  tier: Tier;

  @OneToMany(() => Chance, (chance) => chance.customer)
  chances: Chance[];

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];

  @ManyToMany(() => Store, (store) => store.id, { cascade: true })
  @JoinTable({
    name: 'customer_store',
    joinColumn: { name: 'customerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' },
  })
  stores: Store[];

  @ManyToMany(() => Classification, (classification) => classification.id, { cascade: true })
  @JoinTable({
    name: 'customer_classification',
    joinColumn: { name: 'customerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'classificationId', referencedColumnName: 'id' },
  })
  classifications: Classification[];
}
