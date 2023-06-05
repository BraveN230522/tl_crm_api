import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  desc?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  desc?: string;
}

export class GetFilterCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
