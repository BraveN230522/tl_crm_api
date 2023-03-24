import { Transform } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  branchName;

  @IsString()
  @IsNotEmpty()
  announcements;

  @IsString()
  @IsNotEmpty()
  customerUrl;

  @Transform(({ value }) => {
    return value.toLowerCase() === 'true' || false;
  })
  @IsBooleanString()
  @IsNotEmpty()
  isActiveTiers;
}
