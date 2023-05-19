import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  image?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsOptional()
  @IsNumber()
  cost: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}

export class GetFilterProductDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
