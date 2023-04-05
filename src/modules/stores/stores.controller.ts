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
import { CreateStoreDto, GetStoreDto, UpdateStoreDto } from './dto/stores.dto';
import { StoresService } from './stores.service';

@Controller('stores')
@UseGuards(AuthGuard(), RolesGuard)
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @UserDecorator() currentUser): Promise<Store> {
    return this.storesService.create(createStoreDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Get()
  readList(@Query() getStoreDto: GetStoreDto): Promise<IPaginationResponse<Store>> {
    return this.storesService.readList(getStoreDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Store> {
    return this.storesService.readOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto): Promise<string> {
    return this.storesService.update(id, updateStoreDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<string> {
    return this.storesService.delete(id);
  }
}
