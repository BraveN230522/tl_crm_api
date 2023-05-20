import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;
}

export class UpdateDepartmentDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  desc?: string;
}

export class GetFilterDepartmentsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
