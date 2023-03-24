import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { Store } from './stores.entity';
import { User } from './users.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class Campaign extends BaseTable {
  constructor(partial: Partial<Campaign>) {
    super();
    Object.assign(this, partial);
  }
  @Column()
  name: number;

  @Column()
  desc: string;

  @ManyToOne(() => Store, (store) => store.campaigns, { onDelete: 'CASCADE' })
  store: Store;
}
