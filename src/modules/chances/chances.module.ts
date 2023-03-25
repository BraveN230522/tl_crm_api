import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Chance } from '../../entities/chances.entity';
import { User } from '../../entities/users.entity';
import { BranchesModule } from '../branches/branches.module';
import { BranchesService } from '../branches/branches.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([Chance, User]),
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
  ],
  exports: [TypeOrmModule.forFeature([Chance])],
})
export class ChancesModule {}
