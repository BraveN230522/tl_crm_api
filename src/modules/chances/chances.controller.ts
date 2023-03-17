import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { ChancesService } from './chances.service';

@Controller('chances')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ChancesController {
  constructor(private branchesService: ChancesService) {}
}
