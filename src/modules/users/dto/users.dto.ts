import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../common';
import { VIETNAM_PHONE_PATTERN } from '../../../constants';
import { Role } from '../../../enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName;

  @IsNotEmpty()
  @IsString()
  lastName;

  @IsNotEmpty()
  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone;

  @IsEnum({ USER: Role.STAFF })
  role;

  @IsNotEmpty()
  @IsString()
  branchName;

  @IsNotEmpty()
  @IsString()
  announcements;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    return value.toLowerCase() === 'true';
  })
  isActiveTiers;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @Match('newPassword')
  confirmNewPassword: string;
}

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;
}

export class ConfirmForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @Match('newPassword')
  confirmNewPassword: string;
}
