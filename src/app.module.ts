import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './configuration';
// import { DatabaseModule } from './database';
import { dataSourceOptions } from './database/data-source';
import { Branch } from './entities/branches.entity';
import { Customer } from './entities/customers.entity';
import { Rule } from './entities/rules.entity';
import { Store } from './entities/stores.entity';
import { Tier } from './entities/tiers.entity';
import { User } from './entities/users.entity';
import { AuthModule } from './modules/auth/auth.module';
import { BranchesModule } from './modules/branches/branches.module';
import { customersModule } from './modules/customers/customers.module';
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
      entities: [Branch, Customer, Rule, Store, Tier, User],
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    StoresModule,
    BranchesModule,
    customersModule,
    RulesModule,
    TiersModule,
    UsersModule,
    SmsModule,
  ],
})
export class AppModule {}
