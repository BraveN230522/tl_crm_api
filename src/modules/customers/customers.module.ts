import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Classification } from '../../entities/classifications.entity';
import { Customer } from '../../entities/customers.entity';
import { ClassificationsRepository } from '../classifications/classifications.repository';
import { ClassificationsService } from '../classifications/classifications.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Classification]), PassportModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepository,
    ClassificationsService,
    ClassificationsRepository,
  ],
})
export class CustomersModule {}
