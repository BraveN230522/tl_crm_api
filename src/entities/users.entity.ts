import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from '../base';
import { Role, UserStatus } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { Order } from './orders.entity';
import { Store } from './stores.entity';
import { Department } from './departments.entity';
import { Campaign } from './campaigns.entity';

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
    nullable: true,
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
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.STAFF,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
    default: null,
  })
  token?: string;

  @ManyToOne(() => Department, (department) => department.users, { onDelete: 'CASCADE' })
  department: Department;

  @ManyToOne(() => Branch, (branch) => branch.users, { onDelete: 'CASCADE' })
  branch: Branch;

  
  // is relate

  @ManyToOne(() => Store, (store) => store.users, { onDelete: 'CASCADE' })
  store: Store;

  @OneToMany(() => Chance, (chance) => chance.user)
  chances: Chance[];

  @OneToMany(() => Order, (order) => order.importer)
  importerOrders: Order[];

  @OneToMany(() => Order, (order) => order.exporter)
  exporterOrders: Order[];

  @OneToMany(() => Campaign, (campaign) => campaign.importer)
  importerCampaigns: Campaign[];

  @OneToMany(() => Campaign, (campaign) => campaign.exporter)
  exporterCampaigns: Campaign[];
  
}
