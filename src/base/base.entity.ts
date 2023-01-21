import { IsNumber } from 'class-validator';
import { BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

//Unix timestamp

export abstract class BaseTable {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  public id: number;

  @Column({
    name: 'created_at',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public createdAt: number;

  @Column({
    name: 'updated_at',
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public updatedAt: number;

  @BeforeUpdate()
  updateManagedAt(): void {
    this.updatedAt = new Date().getTime();
  }
}
