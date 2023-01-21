import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Gender } from '../enums';
import { Branch } from './branches.entity';
import { Rule } from './rules.entity';
import { Store } from './stores.entity';

@Entity()
export class Member extends BaseTable {
  constructor(partial: Partial<Member>) {
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

  @Column()
  dob: number;

  @Column()
  gender: Gender;

  @Column()
  address: string;

  @Column()
  point: number;

  @Column()
  cashback: number;

  @Column()
  rate: number;

  @ManyToMany(() => Store, (store) => store.id, { cascade: true })
  @JoinTable({
    name: 'member_store',
    joinColumn: { name: 'memberId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' },
  })
  stores: Store[];
}
