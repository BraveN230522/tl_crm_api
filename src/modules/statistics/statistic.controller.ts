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
import {
  GetCustomerStatisticDto,
  GetOverviewDto,
  GetStatisticChartDto,
  GetStatisticDto,
} from './dto/statistic.dto';
import { StatisticService } from './statistic.service';

@Controller('statistic')
@UseGuards(AuthGuard(), RolesGuard)
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/overview')
  getOverview(@Query() getOverviewDto: GetOverviewDto): Promise<any> {
    return this.statisticService.getOverview(getOverviewDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newCustomers')
  getNewsCustomer(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    return this.statisticService.getNewCustomers(getStatisticChartDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/potentialCustomers')
  getPotentialCustomers(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getPotentialCustomers(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/customerConversion')
  getCustomerConversion(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getCustomerConversion(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newChances')
  getNewsChances(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    return this.statisticService.getNewChances(getStatisticChartDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/newOrders')
  getNewOrders(@Query() getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    return this.statisticService.getNewOrders(getStatisticChartDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/chanceConversion')
  getChanceConversion(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getChanceConversion(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/popularCategories')
  getPopularCategories(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getPopularCategories(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/popularProductByQuantity')
  getPopularProductsByQuantity(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getPopularProductsByQuantity(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/popularProductByRevenue')
  getPopularProductsByRevenue(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getPopularProductsByRevenue(getStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get('/mostSpentCustomers')
  getMostSpentCustomers(@Query() getStatisticDto: GetStatisticDto): Promise<any> {
    return this.statisticService.getMostSpentCustomers(getStatisticDto);
  }

  // Customer dashboard

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/customerOverview')
  getCustomerOverview(
    @Query() getCustomerStatisticDto: GetCustomerStatisticDto,
  ): Promise<any> {
    return this.statisticService.getCustomerOverview(getCustomerStatisticDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/customerMonthlyOverview')
  getCustomerMonthlyOverview(
    @Query() getCustomerStatisticDto: GetCustomerStatisticDto,
  ): Promise<any> {
    return this.statisticService.getCustomerMonthlyOverview(getCustomerStatisticDto);
  }
}
