import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
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

  @ManyToMany(() => Customer, (customer) => customer.id, { cascade: true })
  @JoinTable({
    name: 'customer_classification',
    joinColumn: { name: 'classificationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customerId', referencedColumnName: 'id' },
  })
  customers: Customer[];
}
