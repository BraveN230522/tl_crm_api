import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './configuration';
// import { DatabaseModule } from './database';
import { dataSourceOptions } from './database/data-source';
import { Branch } from './entities/branches.entity';
import { Campaign } from './entities/campaigns.entity';
import { Category } from './entities/categories.entity';
import { ChanceProcess } from './entities/chanceProcesses.entity';
import { Chance } from './entities/chances.entity';
import { Classification } from './entities/classifications.entity';
import { Customer } from './entities/customers.entity';
import { Order } from './entities/orders.entity';
import { Order_Product } from './entities/orders_products.entity';
import { Product } from './entities/products.entity';
import { Rule } from './entities/rules.entity';
import { Store } from './entities/stores.entity';
import { Tier } from './entities/tiers.entity';
import { User } from './entities/users.entity';
import { AuthModule } from './modules/auth/auth.module';
import { BranchesModule } from './modules/branches/branches.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ChanceProcessesModule } from './modules/chanceProcesses/chanceProcesses.module';
import { ChancesModule } from './modules/chances/chances.module';
import { ClassificationsModule } from './modules/classifications/classifications.module';
import { CloudsModule } from './modules/clouds/clouds.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersProductsModule } from './modules/orders_products/orders_products.module';
import { ProductsModule } from './modules/products/products.module';
import { RulesModule } from './modules/rules/rules.module';
import { SmsModule } from './modules/sms/sms.module';
import { StoresModule } from './modules/stores/stores.module';
import { TiersModule } from './modules/tiers/tiers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // DatabaseModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      synchronize: false,
      autoLoadEntities: false,
      entities: [
        Branch,
        Customer,
        Rule,
        Store,
        Tier,
        User,
        Campaign,
        Chance,
        ChanceProcess,
        Order,
        Product,
        Category,
        Classification,
        Order_Product,
      ],
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    StoresModule,
    BranchesModule,
    CustomersModule,
    RulesModule,
    TiersModule,
    UsersModule,
    CampaignsModule,
    ChancesModule,
    ChanceProcessesModule,
    OrdersModule,
    ProductsModule,
    SmsModule,
    CloudsModule,
    CategoriesModule,
    ClassificationsModule,
    OrdersProductsModule,
  ],
})
export class AppModule {}
