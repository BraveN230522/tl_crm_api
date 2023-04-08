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
import { UserDecorator } from './../../common/decorators/user.decorator';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @UserDecorator() currentUser): Promise<Order> {
    return this.ordersService.create(createOrderDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('/:id')
  update(
    @Param('id') id,
    @Body() updateOrderDto: UpdateOrderDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.ordersService.update(id, updateOrderDto, currentUser);
  }

  @Get()
  readList(@Query() getOrderDto: GetOrderDto): Promise<IPaginationResponse<Order>> {
    return this.ordersService.readList(getOrderDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Order> {
    return this.ordersService.readOne(id);
  }

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
