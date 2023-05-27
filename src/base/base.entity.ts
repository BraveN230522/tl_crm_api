import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Unix timestamp

export abstract class BaseTable {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  public id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'bigint',
    default: () => String(new Date().valueOf()),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'bigint',
    default: () => String(new Date().valueOf()),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public updatedAt: number;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date().valueOf();
  }

  @BeforeUpdate()
  updateManagedAt(): void {
    this.updatedAt = new Date().valueOf();
  }
}
