import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Role } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';

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

  @Column({
    nullable: true,
  })
  email?: string;

  @Column({
    nullable: true,
    name: 'forgot_password_otp',
  })
  forgotPasswordOtp?: string;

  @Column({
    nullable: true,
    type: 'bool',
    name: 'is_forgot_password',
    default: false,
  })
  isForgotPassword: boolean;

  @Column({
    nullable: false,
  })
  role: Role;

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
    default: null,
  })
  token?: string;

  @ManyToOne(() => Branch, (branch) => branch.users, { onDelete: 'CASCADE' })
  branch: Branch;

  @OneToMany(() => Chance, (chance) => chance.user)
  chances: Chance[];
}
