import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { User } from '../../entities/users.entity';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from '../sms/sms.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Branch]), PassportModule, SmsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SmsService],
  exports: [UsersRepository],
})
export class UsersModule {}
