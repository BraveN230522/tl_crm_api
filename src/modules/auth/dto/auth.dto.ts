import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AdminCredentialsDto {
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(3)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  password: string;
}
// export class GetUserDto {
//   uuid: string;
// }
