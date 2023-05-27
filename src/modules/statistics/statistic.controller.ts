import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Store } from '../../entities/stores.entity';
import { Role } from '../../enums';
import { IPaginationResponse } from '../../interfaces';
import { StatisticService } from './statistic.service';
import { GetOverviewDto } from './dto/statistic.dto';

@Controller('statistic')
@UseGuards(AuthGuard(), RolesGuard)
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/overview')
  readList(@Query() getOverviewDto: GetOverviewDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.readList(getOverviewDto);
  }
}
