import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseTable } from '../base';
import { CampaignStatus, Role } from '../enums';
import { Branch } from './branches.entity';
import { Chance } from './chances.entity';
import { Store } from './stores.entity';
import { User } from './users.entity';
import { Voucher } from './vouchers.entity';
import { Banner } from './banners.entity';

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
  name: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column({
    name: 'start_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  startDate: number;

  @Column({
    name: 'end_date',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  endDate: number;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;

  // relate

  @ManyToOne(() => Store, (store) => store.campaigns, { onDelete: 'CASCADE' })
  store: Store;

  @ManyToOne(() => User, (user) => user.importerCampaigns, { onDelete: 'CASCADE' })
  importer: User;

  @ManyToOne(() => User, (user) => user.importerCampaigns, { onDelete: 'CASCADE' })
  exporter: User;

  // is relate

  @OneToMany(() => Chance, (chance) => chance.campaign)
  chances: Chance[];

  @OneToMany(() => Voucher, (voucher) => voucher.campaign)
  vouchers: Voucher[];

  @OneToMany(() => Banner, (banners) => banners.campaign)
  banners: Banner[];
}
