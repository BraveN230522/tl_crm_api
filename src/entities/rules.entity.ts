import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from '../base';
import { Store } from './stores.entity';

@Entity()
export class Rule extends BaseTable {
  constructor(partial: Partial<Rule>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  title: string;

  @Column({
    name: 'start_time',
  })
  startTime: string;

  @Column()
  endTime: string;

  @Column({
    name: 'store_image',
  })
  storeImage: string;

  @Column({
    name: 'privacy_policy',
  })
  privacyPolicy: string;

  @Column({
    name: 'rule_rate',
  })
  ruleRate: number;

  @Column({
    name: 'dob_rule_rate',
  })
  dobRuleRate: number;

  @ManyToOne(() => Store, (store) => store.rules, { onDelete: 'CASCADE' })
  store: Store;
}
