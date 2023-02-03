import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

@Entity()
export class User extends BaseTable {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    nullable: false,
    unique: true,
  })
  username?: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password?: string;

  @Column({
    name: 'first_name',
  })
  firstName?: string;

  @Column({
    name: 'last_name',
  })
  lastName?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  phone?: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: false,
    default: Role.USER,
  })
  role: Role;

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
    default: null,
  })
  token?: string;

  @OneToOne(() => Branch)
  @JoinColumn()
  branch?: Branch;
}
