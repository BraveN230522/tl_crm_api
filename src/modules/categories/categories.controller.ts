import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { CategoriesService } from './categories.service';

@Controller('chance-processes')
@UseGuards(AuthGuard(), RolesGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
}
