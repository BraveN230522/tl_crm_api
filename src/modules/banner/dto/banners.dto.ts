import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  name: number;

  @IsOptional()
  desc?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  redirectLink?: string;

  @IsOptional()
  campaignId?: string;
}

export class UpdateBannerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

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
