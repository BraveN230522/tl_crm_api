import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './configuration';
// import { DatabaseModule } from './database';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { BranchesModule } from './modules/branches/branches.module';
import { MembersModule } from './modules/members/members.module';
import { RulesModule } from './modules/rules/rules.module';
import { StoresModule } from './modules/stores/stores.module';
import { TiersModule } from './modules/tiers/tiers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // DatabaseModule,
    TypeOrmModule.forRoot({ ...dataSourceOptions, synchronize: true, autoLoadEntities: true }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    StoresModule,
    BranchesModule,
    MembersModule,
    RulesModule,
    TiersModule,
    UsersModule,
  ],
})
export class AppModule {}
