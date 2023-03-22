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
  user: string;

  @IsArray()
  chanceProcesses: any[];
}
