import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { User } from './users.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class ChanceProcess extends BaseTable {
  constructor(partial: Partial<ChanceProcess>) {
    super();
    Object.assign(this, partial);
  }
  @Column()
  step: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Chance, (chance) => chance.chanceProcesses, { onDelete: 'CASCADE' })
  chance: Chance;
}
