import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Gender } from '../enums';
import { Chance } from './chances.entity';
import { Classification } from './classifications.entity';
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

  @ManyToOne(() => Tier, (tier) => tier.customers, { onDelete: 'CASCADE' })
  tier: Tier;

  @ManyToOne(() => Classification, (classification) => classification.customers, {
    onDelete: 'CASCADE',
  })
  classification: Classification;

  @OneToMany(() => Chance, (chance) => chance.customer)
  chances: Chance[];

  @ManyToMany(() => Store, (store) => store.id, { cascade: true })
  @JoinTable({
    name: 'customer_store',
    joinColumn: { name: 'customerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' },
  })
  stores: Store[];
}
