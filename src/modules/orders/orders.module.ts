import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Category } from '../../entities/categories.entity';
import { Classification } from '../../entities/classifications.entity';
import { Customer } from '../../entities/customers.entity';
import { Order } from '../../entities/orders.entity';
import { Order_Product } from '../../entities/orders_products.entity';
import { Product } from '../../entities/products.entity';
import { Store } from '../../entities/stores.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { CategoriesService } from '../categories/categories.service';
import { ClassificationsRepository } from '../classifications/classifications.repository';
import { ClassificationsService } from '../classifications/classifications.service';
import { CustomersRepository } from '../customers/customers.repository';
import { CustomersService } from '../customers/customers.service';
import { OrdersProductsRepository } from '../orders_products/orders_products.repository';
import { OrdersProductsService } from '../orders_products/orders_products.service';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { StoresRepository } from '../stores/stores.repository';
import { StoresService } from '../stores/stores.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Product,
      Category,
      Order_Product,
      Customer,
      Classification,
      Store,
    ]),
    PassportModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
    OrdersProductsService,
    OrdersProductsRepository,
    CustomersService,
    CustomersRepository,
    ClassificationsService,
    ClassificationsRepository,
    StoresService,
    StoresRepository,
  ],
})
export class OrdersModule {}
