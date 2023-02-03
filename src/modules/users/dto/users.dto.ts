import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
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
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName;

  @IsNotEmpty()
  @IsString()
  lastName;

  @IsNotEmpty()
  @IsString()
  phone;

  @IsEnum({ USER: Role.USER })
  role;
}
// export class GetUserDto {
//   uuid: string;
// }
