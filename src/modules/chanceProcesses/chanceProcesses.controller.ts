import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { ChanceProcessesService } from './chanceProcesses.service';

@Controller('chance-processes')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ChanceProcessesController {
  constructor(private branchesService: ChanceProcessesService) {}
}
