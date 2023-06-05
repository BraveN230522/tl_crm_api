import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { Category } from '../../entities/categories.entity';
import { IPaginationResponse } from '../../interfaces';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, GetFilterCategoriesDto, UpdateCategoryDto } from './dto/categories.dto';

@Controller('categories')
@UseGuards(AuthGuard(), RolesGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query() getFilterCategories: GetFilterCategoriesDto,
  ): Promise<IPaginationResponse<Category[]>> {
    return this.categoriesService.getCategories(getFilterCategories);
  }

  @Get('/:id')
  getCategory(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<string> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: number, @Body() update: UpdateCategoryDto): Promise<string> {
    return this.categoriesService.updateCategory(id, update);
  }

  @Delete('/:id')
  deleteCategoryById(@Param('id') id: number): Promise<string> {
    return this.categoriesService.deleteCategoryById(id);
  }
}
