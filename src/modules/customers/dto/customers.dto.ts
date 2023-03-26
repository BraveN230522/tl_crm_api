import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { VIETNAM_PHONE_PATTERN } from '../../../constants';
import { Gender } from '../../../enums';

export class CreateCustomerDto {
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  dob: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsOptional()
  address: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsInt()
  @IsNotEmpty()
  point: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsNotEmpty()
  cashback: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsNotEmpty()
  classificationId: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  storeId?: string;
}

export class UpdateCustomerDto {
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  dob: number;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  address: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsInt()
  @IsOptional()
  point: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  cashback: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  rate: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  classificationId: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  storeId?: string;
}

export class GetCustomerDto {
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
  classification?: string;
}
