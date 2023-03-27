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
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
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

  @IsString()
  @IsOptional()
  taxCode: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsInt({ each: true })
  @IsOptional()
  classificationIds: number[];

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

  @IsString()
  @IsOptional()
  taxCode: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsInt({ each: true })
  @IsOptional()
  classificationIds: number[];

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
