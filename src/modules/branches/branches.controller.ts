import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Role } from '../../enums';
import { BranchesService } from './branches.service';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class BranchesController {
  constructor(private branchesService: BranchesService) {}
}
