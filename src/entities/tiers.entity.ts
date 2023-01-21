import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Gender } from '../enums';
import { TierStatus } from '../enums/tiers';
import { Store } from './stores.entity';

@Entity()
export class Tier extends BaseTable {
  constructor(partial: Partial<Tier>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  status: TierStatus;

  @Column()
  level: number;

  @Column()
  gap: Gender;

  @Column({
    name: 'tier_rate',
  })
  tierRate: string;

  @Column({
    name: 'dob_tier_rate',
  })
  dobTierRate: number;

  @ManyToOne(() => Store, (store) => store.tiers, { onDelete: 'CASCADE' })
  store: Store;
}
