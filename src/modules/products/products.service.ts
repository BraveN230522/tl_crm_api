import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { OrderStatus } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { CategoriesService } from '../categories/categories.service';
import { GetFilterCategoriesDto } from '../categories/dto/categories.dto';
import { Product } from './../../entities/products.entity';
import { assignIfHasKey } from './../../utilities/mapping';
import { CreateProductDto, GetCustomerFavoriteProduct, UpdateProductDto } from './dto/products.dto';
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
    const category = categoryId
      ? await this.categoriesService.getCategoryById(categoryId)
      : undefined;

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
      query
        .andWhere('LOWER(products.name) LIKE LOWER(:search)', { search: `%${search}%` })
        .where('products.id = :id', { id: search });
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
    const updateData = _.omit(updateProductDto, 'categoryId');
    try {
      assignIfHasKey(product, { ...updateData, category });
      await this.productsRepository.save([product]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('product');
    } catch (error) {
      console.log({ error });
    }
  }

  async getCustomerFavoriteProduct(
    getCustomerFavoriteProduct: GetCustomerFavoriteProduct,
  ): Promise<any> {
    const { customerId } = getCustomerFavoriteProduct;
    const paidStatus = OrderStatus.IS_PAID;

    try {
      const products = await this.productsRepository
        .createQueryBuilder('product')
        .leftJoin('product.orderProducts', 'orderProd')
        .leftJoin('orderProd.order', 'prodOrders')
        .leftJoin('prodOrders.customer', 'orderCustomer')
        .andWhere('prodOrders.status = :paidStatus', { paidStatus })
        .andWhere('orderCustomer.id = :customerId', { customerId })
        .select(['product.id', 'product.name', 'product.image', 'product.cost'])
        .addSelect('SUM(orderProd.quantity)', 'numOfPurchases')
        .groupBy('product.id')
        .orderBy('SUM(orderProd.quantity)')
        .take(5)
        .getRawMany();
      console.log({ products });
      return products;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }
}
