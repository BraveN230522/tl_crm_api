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
import { RoleDecorator, UserDecorator } from '../../common';
import { RolesGuard } from '../../common/guards';
import { Chance } from '../../entities/chances.entity';
import { Role } from '../../enums';
import { IPaginationResponse } from '../../interfaces';
import { ChancesService } from './chances.service';
import { CreateChancesDto, GetChancesDto, UpdateChanceDto } from './dto/chances.dto';

@Controller('chances')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ChancesController {
  constructor(private chanceService: ChancesService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  getChanceList(@Query() getChancesDto: GetChancesDto): Promise<IPaginationResponse<any>> {
    return this.chanceService.readList(getChancesDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  createChance(
    @Body() createChanceDto: CreateChancesDto,
    @UserDecorator() currentUser,
  ): Promise<any> {
    return this.chanceService.create(createChanceDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<any> {
    return this.chanceService.getOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Patch('/:id')
  update(
    @Param('id') id,
    @Body() updateChanceDto: UpdateChanceDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.chanceService.update(id, updateChanceDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<string> {
    return this.chanceService.delete(id);
  }
}
