import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { Product } from './products.entity';
import { User } from './users.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class Category extends BaseTable {
  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column()
  desc: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
