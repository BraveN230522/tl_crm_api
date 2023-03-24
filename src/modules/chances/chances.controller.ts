import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator, UserDecorator } from '../../common';
import { RolesGuard } from '../../common/guards';
import { Chance } from '../../entities/chances.entity';
import { Role } from '../../enums';
import { ChancesService } from './chances.service';
import { CreateChancesDto, UpdateChanceDto } from './dto/chances.dto';

@Controller('chances')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ChancesController {
  constructor(private chanceService: ChancesService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  createChance(
    @Body() createChanceDto: CreateChancesDto,
    @UserDecorator() currentUser,
  ): Promise<Chance> {
    return this.chanceService.createChance(createChanceDto, currentUser);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @RoleDecorator(Role.ADMIN, Role.B_MANAGER, Role.S_MANAGER)
  @Patch('/:id')
  updateChance(
    @Param('id') id,
    @Body() updateChanceDto: UpdateChanceDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.chanceService.updateChance(id, updateChanceDto, currentUser);
  }
}
