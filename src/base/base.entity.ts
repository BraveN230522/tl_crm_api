import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

//Unix timestamp

export abstract class BaseTable {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  public id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  public updatedAt: number;

}
