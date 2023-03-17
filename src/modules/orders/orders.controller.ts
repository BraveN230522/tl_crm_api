import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
@RoleDecorator(Role.SUPER_ADMIN)
export class OrdersController {
  constructor(private branchesService: OrdersService) {}
}
