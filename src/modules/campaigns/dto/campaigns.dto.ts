import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CampaignStatus } from '../../../enums';

export class CreateCampaignDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

  @IsNumber()
  @IsOptional()
  startDate: number;

  @IsNumber()
  @IsOptional()
  endDate: number;

  @IsEnum(CampaignStatus)
  @IsOptional()
  status: CampaignStatus;

  @IsOptional()
  note?: string;
}

export class UpdateCampaignDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  desc?: string;

  @IsNumber()
  @IsOptional()
  startDate: number;

  @IsNumber()
  @IsOptional()
  endDate: number;

  @IsEnum(CampaignStatus)
  @IsOptional()
  status: CampaignStatus;

  @IsOptional()
  note?: string;
}

export class GetCampaignDto {
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
  fromDate?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  toDate?: number;


  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;
}

