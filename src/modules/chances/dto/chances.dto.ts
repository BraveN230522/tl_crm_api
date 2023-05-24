import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Product } from '../../../entities/products.entity';
import { ChanceStatus } from '../../../enums';

export class CreateChancesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(ChanceStatus)
  @IsNotEmpty()
  status: ChanceStatus;

  @IsInt()
  @IsNotEmpty()
  customerId: string;

  @IsOptional()
  @IsNumber()
  currentProcess: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  successRate: string;

  @IsOptional()
  campaignId?: string;

  // @IsOptional()
  // @IsArray()
  // chanceProcesses: any[];

  @IsOptional()
  failedNote: string;

  @IsOptional()
  successNote: string;

  @IsNumber()
  @IsOptional()
  expectEndDate: number;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsNotEmpty()
  chanceProducts: Product[];
}

export class UpdateChanceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(ChanceStatus)
  @IsNotEmpty()
  status: ChanceStatus;

  @IsInt()
  @IsNotEmpty()
  customerId: string;

  @IsOptional()
  @IsNumber()
  currentProcess: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  successRate: string;

  @IsOptional()
  campaignId?: string;

  @IsOptional()
  failedNote: string;

  @IsOptional()
  successNote: string;

  @IsNumber()
  @IsOptional()
  expectEndDate: number;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsNotEmpty()
  chanceProducts: Product[];
}

export class GetChancesDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  search?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  fromDate?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  toDate?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsEnum(ChanceStatus)
  @IsOptional()
  status?: ChanceStatus;

}
