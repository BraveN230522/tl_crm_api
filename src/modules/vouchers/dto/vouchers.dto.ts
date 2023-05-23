import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { VoucherStatus, VoucherType } from '../../../enums/vouchers';
import { Transform } from 'class-transformer';

export class CreateVoucherDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  note?: string;

  @IsNumber()
  @IsOptional()
  startDate: number;

  @IsNumber()
  @IsOptional()
  endDate: number;

  @IsOptional()
  campaignId?: string;

  @IsOptional()
  discountPercent?: string;

  @IsOptional()
  discountAmount?: string;

  @IsOptional()
  maxNumOfUse?: string;

  @IsOptional()
  minCostToApply?: string;

  @IsOptional()
  numOfUsed?: string;

  @IsEnum(VoucherStatus)
  @IsNotEmpty()
  status: VoucherStatus;

  @IsEnum(VoucherType)
  @IsNotEmpty()
  type: VoucherType;
}

export class UpdateVoucherDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  note?: string;

  @IsNumber()
  @IsOptional()
  startDate: number;

  @IsNumber()
  @IsOptional()
  endDate: number;

  @IsOptional()
  campaignId?: string;

  @IsOptional()
  discountPercent?: string;

  @IsOptional()
  discountAmount?: string;

  @IsOptional()
  maxNumOfUse?: string;

  @IsOptional()
  minCostToApply?: string;

  @IsOptional()
  numOfUsed?: string;

  @IsEnum(VoucherStatus)
  @IsOptional()
  status: VoucherStatus;

  @IsEnum(VoucherType)
  @IsOptional()
  type: VoucherType;
}

export class GetFilterVoucherDto {
  @IsOptional()
  @IsString()
  search?: string;

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

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
