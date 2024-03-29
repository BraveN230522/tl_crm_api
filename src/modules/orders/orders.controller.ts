import { RoleDecorator } from './../../common/decorators/role.decorator';
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
import { RolesGuard } from '../../common/guards';
import { Order } from '../../entities/orders.entity';
import { IOrderResponse, IPaginationResponse } from '../../interfaces';
import { UserDecorator } from './../../common/decorators/user.decorator';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';
import { Role } from '../../enums';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @UserDecorator() currentUser): Promise<IOrderResponse> {
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
  readList(@Query() getOrderDto: GetOrderDto): Promise<IPaginationResponse<IOrderResponse>> {
    return this.ordersService.readList(getOrderDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<IOrderResponse> {
    return this.ordersService.getOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<string> {
    return this.ordersService.delete(id);
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
