import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Campaign } from '../../entities/campaigns.entity';
import { Chance } from '../../entities/chances.entity';
import { Chance_Product } from '../../entities/chances_products.entity';
import { Classification } from '../../entities/classifications.entity';
import { Customer } from '../../entities/customers.entity';
import { Product } from '../../entities/products.entity';
import { User } from '../../entities/users.entity';
import { BranchesModule } from '../branches/branches.module';
import { BranchesService } from '../branches/branches.service';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { CampaignsService } from '../campaigns/campaigns.service';
import { ChancesProductsRepository } from '../chances_products/chances_products.repository';
import { ChancesProductsService } from '../chances_products/chances_products.service';
import { ClassificationsRepository } from '../classifications/classifications.repository';
import { ClassificationsService } from '../classifications/classifications.service';
import { CustomersRepository } from '../customers/customers.repository';
import { CustomersService } from '../customers/customers.service';
import { DepartmentsRepository } from '../departments/departments.repository';
import { DepartmentsService } from '../departments/departments.service';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from '../sms/sms.service';
import { StoresRepository } from '../stores/stores.repository';
import { StoresService } from '../stores/stores.service';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { ChancesController } from './chances.controller';
import { ChancesRepository } from './chances.repository';
import { ChancesService } from './chances.service';
import { CategoriesRepository } from '../categories/categories.repository';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../../entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chance,
      User,
      Customer,
      Classification,
      Product,
      Chance_Product,
      Campaign,
      Category,
    ]),
    SmsModule,
    PassportModule,
    UsersModule,
    BranchesModule,
  ],
  controllers: [ChancesController],
  providers: [
    ChancesService,
    ChancesRepository,
    SmsService,
    UsersService,
    UsersRepository,
    BranchesService,
    StoresService,
    StoresRepository,
    DepartmentsService,
    DepartmentsRepository,
    CustomersService,
    CustomersRepository,
    ClassificationsService,
    ClassificationsRepository,
    ProductsService,
    ProductsRepository,
    ChancesProductsService,
    ChancesProductsRepository,
    CampaignsService,
    CampaignsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
  exports: [TypeOrmModule.forFeature([Chance])],
})
export class ChancesModule {}
