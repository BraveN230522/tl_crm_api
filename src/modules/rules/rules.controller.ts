import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { RulesService } from './rules.service';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class RulesController {
  constructor(private branchesService: RulesService) {}
}
