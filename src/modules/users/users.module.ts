import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { User } from '../../entities/users.entity';
import { BranchesRepository } from '../branches/branches.repository';
import { BranchesService } from '../branches/branches.service';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from '../sms/sms.service';
import { BranchesModule } from './../branches/branches.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Branch]), PassportModule, SmsModule, BranchesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SmsService, BranchesService, BranchesRepository],
  exports: [UsersRepository, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
