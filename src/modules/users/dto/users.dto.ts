import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from '../../../common';
import { VIETNAM_PHONE_PATTERN } from '../../../constants';
import { Role } from '../../../enums';

export class CreateUserAdminDto {
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
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  branchName: string;

  @IsNotEmpty()
  @IsString()
  announcements: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    return value.toLowerCase() === 'true';
  })
  isActiveTiers: boolean;
}

export class UpdateUserAdminDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  branchName: string;

  @IsString()
  @IsOptional()
  announcements: string;

  @IsBoolean()
  @Transform(({ value }) => {
    return value.toLowerCase() === 'true';
  })
  @IsOptional()
  isActiveTiers: boolean;
}

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

  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;

  @Transform((params) => {
    return Number(params.value);
  })
  @ValidateIf((obj: CreateUserDto) => {
    return obj.role === Role.S_MANAGER || obj.role === Role.STAFF;
  })
  storeId?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @Matches(VIETNAM_PHONE_PATTERN, { message: 'phone must be a valid phone number' })
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  token?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  storeId?: string;
}

export class GetUserDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
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
