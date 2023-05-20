import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Product } from './products.entity';
import { User } from './users.entity';

@Entity()
export class Department extends BaseTable {
  constructor(partial: Partial<Department>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
