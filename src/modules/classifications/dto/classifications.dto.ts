import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassificationDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  desc?: string;
}

export class UpdateClassificationDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  desc?: string;
}

export class GetFilterClassificationsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
