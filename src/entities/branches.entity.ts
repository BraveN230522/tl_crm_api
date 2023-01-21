import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Store } from './stores.entity';
import { User } from './users.entity';

@Entity()
export class Branch extends BaseTable {
  constructor(partial: Partial<Branch>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column()
  announcements: string;

  @Column({
    name: 'member_url',
  })
  memberUrl: string;

  @Column({
    name: 'is_active_tiers',
    type: 'boolean',
  })
  isActiveTiers?: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Store, (store) => store.branch)
  stores: Store[];
}
