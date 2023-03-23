import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Product } from './products.entity';

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
