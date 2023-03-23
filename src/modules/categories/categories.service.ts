import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, GetFilterCategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository) private categoriesRepository: CategoriesRepository,
  ) {}

  async getCategories(filter: GetFilterCategoriesDto): Promise<IPaginationResponse<Category[]>> {
    const { search } = filter;
    const query = this.categoriesRepository.createQueryBuilder('categories');
    if (search) {
      query.andWhere('categories.name LIKE LOWER(:search)', { search: `%${search}%` });
    }
    const categories = this.categoriesRepository.paginationQueryBuilder(query, filter);
    return categories;
  }

  async createCategory({ name, desc }: CreateCategoryDto): Promise<string> {
    const category = this.categoriesRepository.create({
      name,
      desc,
    });
    await this.categoriesRepository.save([category]);
    return APP_MESSAGE.ADDED_SUCCESSFULLY('category');
  }

  async deleteCategoryById(id: number): Promise<string> {
    const result = await this.categoriesRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This category with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('category');
    }
  }
}
