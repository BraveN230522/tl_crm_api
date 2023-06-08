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
import { Customer } from '../../entities/customers.entity';
import { IPaginationResponse } from '../../interfaces';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, GetCustomerDto, UpdateCustomerDto } from './dto/customers.dto';
import { Role } from '../../enums';

@Controller('customers')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UserDecorator() currentUser,
  ): Promise<Customer> {
    return this.customersService.create(createCustomerDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('/:id')
  updateUser(
    @Param('id') id,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.customersService.update(id, updateCustomerDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  // @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Delete('/:id')
  deleteUser(@Param('id') id, @UserDecorator() currentUser): Promise<string> {
    return this.customersService.delete(id, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  readUser(@Query() getUserDto: GetCustomerDto): Promise<IPaginationResponse<Customer>> {
    return this.customersService.readList(getUserDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  getUser(@Param('id') id): Promise<Customer> {
    return this.customersService.readOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Delete('/destroy/:id')
  destroyUser(@Param('id') id,  @UserDecorator() currentUser): Promise<string> {
    return this.customersService.destroy(id, currentUser);
  }
}
