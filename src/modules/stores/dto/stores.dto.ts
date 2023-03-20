import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
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
