import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Category } from '../../entities/categories.entity';
import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { CategoriesService } from '../categories/categories.service';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Category]), PassportModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
})
export class OrdersModule {}
