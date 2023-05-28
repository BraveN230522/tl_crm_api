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
import { GetOverviewDto, GetStatisticChartDto, GetStatisticDto } from './dto/statistic.dto';

@Controller('statistic')
@UseGuards(AuthGuard(), RolesGuard)
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/overview')
  getOverview(@Query() getOverviewDto: GetOverviewDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getOverview(getOverviewDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newCustomers')
  getNewsCustomer(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getNewCustomers(getStatisticChartDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/potentialCustomers')
  getPotentialCustomers(@Query() getStatisticDto: GetStatisticDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getPotentialCustomers(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/customerConversion')
  getCustomerConversion(@Query() getStatisticDto: GetStatisticDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getCustomerConversion(getStatisticDto);
  }
<<<<<<< HEAD

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newChances')
  getNewsChances(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getNewChances(getStatisticChartDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newOrders')
  getNewOrders(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<IPaginationResponse<Store>> {
    return this.statisticService.getNewOrders(getStatisticChartDto);
  }
=======
>>>>>>> d36707e59aaa96506f92ea2de121d59ce402f393
}
