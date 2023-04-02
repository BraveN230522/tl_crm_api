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
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Order } from '../../entities/orders.entity';
import { Role } from '../../enums';
import { IPaginationResponse } from '../../interfaces';
import { CreateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  // @Get()
  // readList(
  //   @Query() getFilterClassifications: GetFilterClassificationsDto,
  // ): Promise<IPaginationResponse<any[]>> {
  //   return this.ordersService.readList(getFilterClassifications);
  // }

  // @UseGuards(AuthGuard(), RolesGuard)
  // @Get('/:id')
  // readOne(@Param('id') id): Promise<Classification> {
  //   return this.ordersService.readOne(id);
  // }

  // @Patch('/:id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateClassificationDto: UpdateClassificationDto,
  // ): Promise<string> {
  //   return this.ordersService.update(id, updateClassificationDto);
  // }

  // @Delete('/:id')
  // deleteClassificationById(@Param('id') id: number): Promise<string> {
  //   return this.ordersService.delete(id);
  // }
}
