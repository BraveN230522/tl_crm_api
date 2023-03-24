import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateChancesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsNumber()
  currentProcess: number;

  @IsNotEmpty()
  @IsNumber()
  creator: number;

  @IsArray()
  chanceProcesses: any[];
}

export class UpdateChanceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsNumber()
  currentProcess?: number;

  @IsNotEmpty()
  @IsNumber()
  creator?: number;

  @IsArray()
  chanceProcesses?: any[];
}

export class GetChancesDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  search?: string;
}
