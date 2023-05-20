import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { CampaignStatus, Role } from '../enums';
import { VoucherStatus, VoucherType } from '../enums/vouchers';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { Order } from './orders.entity';
import { Store } from './stores.entity';
import { User } from './users.entity';
import { Campaign } from './campaigns.entity';

@Entity()
export class Banner extends BaseTable {
  constructor(partial: Partial<Banner>) {
    super();
    Object.assign(this, partial);
  }
  @Column()
  name: number;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  redirectLink: string;

  // relate

  @ManyToOne(() => Campaign, (campaign) => campaign.banners, { onDelete: 'CASCADE' })
  campaign: Campaign;
}
