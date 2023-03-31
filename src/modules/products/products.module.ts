import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Category } from '../../entities/categories.entity';
import { Product } from '../../entities/products.entity';
import { CategoriesRepository } from './../categories/categories.repository';
import { CategoriesService } from './../categories/categories.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), PassportModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CategoriesService, CategoriesRepository],
})
export class ProductsModule {}
