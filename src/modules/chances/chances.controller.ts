import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { Chance } from '../../entities/chances.entity';
import { ChancesService } from './chances.service';
import { CreateChancesDto } from './dto/chances.dto';

@Controller('chances')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ChancesController {
  constructor(private chanceService: ChancesService) {}

  
  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  createChance(@Body() createChanceDto: CreateChancesDto): Promise<Chance> {
    return this.chanceService.createChance(createChanceDto);
  }
  
}
