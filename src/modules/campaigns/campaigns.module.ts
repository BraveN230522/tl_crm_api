import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Banner } from '../../entities/banners.entity';
import { Branch } from '../../entities/branches.entity';
import { Campaign } from '../../entities/campaigns.entity';
import { Category } from '../../entities/categories.entity';
import { Chance } from '../../entities/chances.entity';
import { Classification } from '../../entities/classifications.entity';
import { Product } from '../../entities/products.entity';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';
import { Voucher } from '../../entities/vouchers.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsService } from './campaigns.service';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../orders/orders.repository';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesRepository } from '../categories/categories.repository';
import { OrdersProductsService } from '../orders_products/orders_products.service';
import { OrdersProductsRepository } from '../orders_products/orders_products.repository';
import { CustomersService } from '../customers/customers.service';
import { CustomersRepository } from '../customers/customers.repository';
import { ClassificationsService } from '../classifications/classifications.service';
import { ClassificationsRepository } from '../classifications/classifications.repository';
import { StoresService } from '../stores/stores.service';
import { StoresRepository } from '../stores/stores.repository';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { SmsService } from '../sms/sms.service';
import { BranchesService } from '../branches/branches.service';
import { BranchesRepository } from '../branches/branches.repository';
import { Order } from '../../entities/orders.entity';
import { Customer } from '../../entities/customers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Campaign,
      Store,
      User,
      Chance,
      Voucher,
      Banner,
      Product,
      Category,
      Branch,
      Classification,
      Customer,
      // Order,
    ]),
    PassportModule,
  ],
  controllers: [CampaignsController],
  providers: [
    CampaignsService,
    CampaignsRepository,
    CustomersService,
    CustomersRepository,
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
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
  ],
  exports: [CampaignsService, CampaignsRepository, TypeOrmModule.forFeature([Campaign])],
})
export class CampaignsModule {}
