import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Department } from '../../entities/departments.entity';
import { User } from '../../entities/users.entity';
import { BranchesService } from '../branches/branches.service';
import { SmsService } from '../sms/sms.service';
import { StoresService } from '../stores/stores.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsRepository } from './departments.repository';
import { DepartmentsService } from './departments.service';
import { Branch } from '../../entities/branches.entity';
import { Store } from '../../entities/stores.entity';
import { BranchesRepository } from '../branches/branches.repository';
import { StoresRepository } from '../stores/stores.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Department, User, Branch, Store]), PassportModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentsRepository,
    UsersRepository,
    UsersService,
    SmsService,
    BranchesService,
    BranchesRepository,
    StoresService,
    StoresRepository,
  ],
  exports: [DepartmentsService, DepartmentsService, TypeOrmModule.forFeature([Department])],
})
export class DepartmentsModule {}
