import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { Category } from '../../entities/categories.entity';
import { Classification } from '../../entities/classifications.entity';
import { Customer } from '../../entities/customers.entity';
import { Order } from '../../entities/orders.entity';
import { Order_Product } from '../../entities/orders_products.entity';
import { Product } from '../../entities/products.entity';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';
import { BranchesRepository } from '../branches/branches.repository';
import { BranchesService } from '../branches/branches.service';
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
import { SmsService } from '../sms/sms.service';
import { StoresRepository } from '../stores/stores.repository';
import { StoresService } from '../stores/stores.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { DepartmentsService } from '../departments/departments.service';
import { DepartmentsRepository } from '../departments/departments.repository';
import { Department } from '../../entities/departments.entity';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { OrdersRepository } from '../orders/orders.repository';
import { OrdersService } from '../orders/orders.service';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { Campaign } from '../../entities/campaigns.entity';
import { Chance } from '../../entities/chances.entity';
import { ChancesRepository } from '../chances/chances.repository';

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
      User,
      Branch,
      Department,
      Campaign,
      Chance,
    ]),
    PassportModule,
  ],
  controllers: [StatisticController],
  providers: [
    ChancesRepository,
    StatisticService,
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
    OrdersRepository,
    OrdersService,
    OrdersProductsService,
    OrdersProductsRepository,
    CustomersService,
    CustomersRepository,
    ClassificationsService,
    ClassificationsRepository,
    StoresService,
    StoresRepository,
    UsersService,
    UsersRepository,
    SmsService,
    BranchesService,
    BranchesRepository,
    StoresService,
    StoresRepository,
    DepartmentsService,
    DepartmentsRepository,
    CampaignsRepository,
  ],
})
export class StatisticModule {}
