import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  redirectLink?: string;

  @IsOptional()
  campaignId?: string;
}

export class UpdateBannerDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  redirectLink?: string;

  @IsOptional()
  campaignId?: string;
}

export class GetFilterBannersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
