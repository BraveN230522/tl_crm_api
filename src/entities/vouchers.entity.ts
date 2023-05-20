import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { CampaignStatus, Role } from '../enums';
import { VoucherStatus, VoucherType } from '../enums/vouchers';
import { Branch } from './branches.entity';
import { Campaign } from './campaigns.entity';
import { Chance } from './chances.entity';
import { Order } from './orders.entity';
import { Store } from './stores.entity';
import { User } from './users.entity';

@Entity()
export class Voucher extends BaseTable {
  constructor(partial: Partial<Voucher>) {
    super();
    Object.assign(this, partial);
  }
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    name: 'start_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  startDate: number;

  @Column({
    name: 'end_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
    nullable: true,
  })
  endDate: number;

  @Column({
    name: 'discount_percent',
  })
  discountPercent: string;

  @Column({
    name: 'discount_amount',
  })
  discountAmount: string;

  @Column({
    name: 'max_num_of_use',
    nullable: true,
    default: 0,
  })
  maxNumOfUse: string;

  @Column({
    name: 'numOfUsed',
    nullable: true,
    default: 0,
  })
  numOfUsed: string;

  @Column({
    name: 'min_cost_to_apply',
    nullable: true,
    default: 0,
  })
  minCostToApply: string;

  @Column({
    type: 'enum',
    enum: VoucherStatus,
    default: VoucherStatus.ACTIVE,
  })
  status: VoucherStatus;

  @Column({
    type: 'enum',
    enum: VoucherType,
    default: VoucherType.VOUCHER,
  })
  type: VoucherType;

  // relate

  @ManyToOne(() => Campaign, (campaign) => campaign.vouchers, { onDelete: 'CASCADE' })
  campaign: Campaign;

  @ManyToOne(() => Store, (store) => store.vouchers, { onDelete: 'CASCADE' })
  store: Store;

  // is relate

  @OneToMany(() => Order, (order) => order.voucher)
  orders: Order[];
}
