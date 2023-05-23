import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';
import { BranchesRepository } from '../branches/branches.repository';
import { BranchesService } from '../branches/branches.service';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from '../sms/sms.service';
import { StoresRepository } from '../stores/stores.repository';
import { StoresService } from '../stores/stores.service';
import { BranchesModule } from './../branches/branches.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Order } from '../../entities/orders.entity';
import { Department } from '../../entities/departments.entity';
import { DepartmentsService } from '../departments/departments.service';
import { DepartmentsRepository } from '../departments/departments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Branch, Store, Order, Department]),
    PassportModule,
    SmsModule,
    BranchesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    SmsService,
    BranchesService,
    BranchesRepository,
    StoresService,
    StoresRepository,
    DepartmentsService,
    DepartmentsRepository,
  ],
  exports: [UsersService, UsersRepository, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
