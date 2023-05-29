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
import { ChanceStatus, Role } from '../enums';
import { Branch } from './branches.entity';
import { ChanceProcess } from './chanceProcesses.entity';
import { Customer } from './customers.entity';
import { Product } from './products.entity';
import { User } from './users.entity';
import { Campaign } from './campaigns.entity';
import { Chance_Product } from './chances_products.entity';

// import { Admin } from '../admin/admin.entity';
// import { Project } from '../projects/projects.entity';
// import { Task } from '../tasks/tasks.entity';

const enumsVersion = 'v' + 1

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
  })
  desc: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column({
    nullable: false,
    default: 0,
  })
  total: number;

  @Column({
    nullable: true,
  })
  failedNote: string;

  @Column({
    nullable: true,
  })
  successNote: string;

  @Column({
    name: 'success_rate',
    nullable: true,
  })
  successRate: string;

  @Column({
    nullable: true,
    name: 'current_process',
  })
  currentProcess?: number;

  @Column({
    type: 'enum',
    enumName: `chance_status_enum_${enumsVersion}`,
    enum: ChanceStatus,
    default: ChanceStatus.IN_PROCESS,
  })
  status: ChanceStatus;

  @Column({
    name: 'expect_end_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  expectEndDate: number;

  @ManyToOne(() => User, (user) => user.chances, { onDelete: 'CASCADE' })
  user?: User;

  @ManyToOne(() => Customer, (custom) => custom.chances, { onDelete: 'CASCADE' })
  customer: Customer;

  @ManyToOne(() => Campaign, (campaign) => campaign.chances, { onDelete: 'CASCADE' })
  campaign: Campaign;

  @OneToMany(() => ChanceProcess, (chanceProcesses) => chanceProcesses.chance)
  chanceProcesses?: ChanceProcess[];

  // @ManyToMany(() => Product, (product) => product.id, { cascade: true })
  // @JoinTable({
  //   name: 'product_chance',
  //   joinColumn: { name: 'chanceId', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  // })
  // products: Product[];

  @OneToMany(() => Chance_Product, (chance_product) => chance_product.chance)
  chanceProducts: Chance_Product[];
}
