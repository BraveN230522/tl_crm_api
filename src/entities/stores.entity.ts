import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Branch } from './branches.entity';
import { Campaign } from './campaigns.entity';
import { Customer } from './customers.entity';
import { Product } from './products.entity';
import { Rule } from './rules.entity';
import { Tier } from './tiers.entity';
import { User } from './users.entity';

@Entity()
export class Store extends BaseTable {
  constructor(partial: Partial<Store>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    nullable: false,
    default: 'None',
  })
  name: string;

  @Column({
    nullable: false,
    default: 'None',
  })
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    name: 'business_type',
  })
  businessType: string;

  @Column({
    name: 'store_image',
  })
  storeImage: string;

  @Column({
    name: 'privacy_policy',
  })
  privacyPolicy: string;

  @ManyToOne(() => Branch, (branch) => branch.stores, { onDelete: 'CASCADE' })
  branch: Branch;

  @OneToMany(() => Campaign, (campaign) => campaign.store)
  campaigns: Campaign[];

  @OneToMany(() => Rule, (rule) => rule.store)
  rules: Rule[];

  @OneToMany(() => Tier, (tier) => tier.store)
  tiers: Tier[];

  @OneToMany(() => User, (user) => user.store)
  users: User[];

  @ManyToMany(() => Customer, (customer) => customer.id, { cascade: true })
  @JoinTable({
    name: 'customer_store',
    joinColumn: { name: 'storeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customerId', referencedColumnName: 'id' },
  })
  customers: Customer[];

  @ManyToMany(() => Product, (product) => product.id, { cascade: true })
  @JoinTable({
    name: 'product_store',
    joinColumn: { name: 'storeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];
}
