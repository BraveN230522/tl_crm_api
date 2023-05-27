import { IsOptional } from "class-validator";

export class GetOverviewDto {
  @IsOptional()
  filter?: number;
}
