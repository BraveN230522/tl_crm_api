import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { CategoriesService } from '../categories/categories.service';
import { GetFilterCategoriesDto } from '../categories/dto/categories.dto';
import { Product } from './../../entities/products.entity';
import { assignIfHasKey } from './../../utilities/mapping';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository) private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
  ) {}

  async createProduct({
    name,
    desc,
    cost,
    quantity,
    categoryId,
    image,
  }: CreateProductDto): Promise<string> {
    const category = await this.categoriesService.getCategoryById(categoryId);

    const product = this.productsRepository.create({
      name,
      desc,
      cost,
      image,
      quantity,
      category,
    });

    await this.productsRepository.save([product]);

    return APP_MESSAGE.ADDED_SUCCESSFULLY('Create product successfully');
  }

  async getProducts(
    getFilterProducts: GetFilterCategoriesDto,
  ): Promise<IPaginationResponse<Product[]>> {
    const { search } = getFilterProducts;
    const query = this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'productsCategory')
      .orderBy('products.id', 'DESC');

    if (search) {
      query.andWhere('LOWER(products.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    const products = this.productsRepository.paginationQueryBuilder(query, getFilterProducts);

    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const found = this.productsRepository.findOne({ id }, { relations: ['category'] });

    if (!found) ErrorHelper.NotFoundException(`This product with ${id} was not found`);

    return found;
  }

  async getProductByIds(ids: number[]): Promise<Product[]> {
    const found = this.productsRepository.findByIds(ids);

    if (!found) ErrorHelper.NotFoundException(`This product with was not found`);

    return found;
  }

  async deleteProductById(id: number): Promise<string> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This product with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('Delete product successfully');
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<string> {
    const { categoryId } = updateProductDto;
    const product = await this.getProductById(id);
    const category =
      categoryId && (await this.categoriesService.getCategoryById(updateProductDto?.categoryId));
    try {
      assignIfHasKey(product, { ...updateProductDto, category });
      await this.productsRepository.save([product]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('product');
    } catch (error) {
      console.log({ error });
    }
  }
}
