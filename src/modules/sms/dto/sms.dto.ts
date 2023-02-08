import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../../common';
import { Role } from '../../../enums';

export class SendSmsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  phone: string;
}
