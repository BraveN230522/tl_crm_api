import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Customer } from './customers.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class Classification extends BaseTable {
  constructor(partial: Partial<Classification>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column()
  desc: string;

  @OneToMany(() => Customer, (customer) => customer.classification)
  customers: Customer[];
}
