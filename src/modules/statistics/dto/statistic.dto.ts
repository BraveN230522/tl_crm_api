import { IsOptional } from "class-validator";
import { enumDashboardDataFilter, enumDashboardFilter } from "../../../enums";

export class GetOverviewDto {
  @IsOptional()
  filter?: number;
}

export class GetStatisticDto {
  @IsOptional()
  timePeriod?: enumDashboardDataFilter;
}

export class GetStatisticChartDto {
  @IsOptional()
  timePeriod?: enumDashboardFilter;
}

export class GetCustomerStatisticDto {
  @IsOptional()
  customerId?: string | number;
}