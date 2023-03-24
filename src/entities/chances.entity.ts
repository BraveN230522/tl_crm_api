import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
import { ChanceProcess } from './chanceProcesses.entity';
import { Customer } from './customers.entity';
import { Product } from './products.entity';
import { User } from './users.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class Chance extends BaseTable {
  constructor(partial: Partial<Chance>) {
    super();
    Object.assign(this, partial);
  }
  @Column()
  name?: string;

  @Column({
    nullable: true,
    name: 'current_process',
  })
  currentProcess?: number;

  @ManyToOne(() => User, (user) => user.chances, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Customer, (custom) => custom.chances, { onDelete: 'CASCADE' })
  customer: Customer;

  @OneToMany(() => ChanceProcess, (chanceProcesses) => chanceProcesses.chance)
  chanceProcesses: ChanceProcess[];

  @ManyToMany(() => Product, (product) => product.id, { cascade: true })
  @JoinTable({
    name: 'product_chance',
    joinColumn: { name: 'chanceId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];
}
