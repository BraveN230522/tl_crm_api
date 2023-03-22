import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { VIETNAM_PHONE_PATTERN } from '../../../constants';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  businessType: string;

  @IsNotEmpty()
  @IsString()
  storeImage: string;

  @IsNotEmpty()
  @IsString()
  privacyPolicy: string;
}
export class UpdateStoreDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  businessType: string;

  @IsOptional()
  @IsString()
  storeImage: string;

  @IsOptional()
  @IsString()
  privacyPolicy: string;
}

export class GetStoreDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  // @IsOptional()
  // search?: string;
}
