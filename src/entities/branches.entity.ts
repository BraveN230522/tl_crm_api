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
    name: 'customer_url',
  })
  customerUrl: string;

  @Column({
    name: 'is_active_tiers',
    type: 'boolean',
  })
  isActiveTiers?: boolean;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];

  @OneToMany(() => Store, (store) => store.branch)
  stores: Store[];
}
