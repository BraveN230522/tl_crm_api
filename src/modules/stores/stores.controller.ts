import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Store } from '../../entities/stores.entity';
import { Role } from '../../enums';
import { CreateStoreDto } from './dto/stores.dto';
import { StoresService } from './stores.service';

@Controller('stores')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Post()
  createUser(@Body() createStoreDto: CreateStoreDto, @UserDecorator() currentUser): Promise<Store> {
    return this.storesService.createUser(createStoreDto, currentUser);
  }
}
