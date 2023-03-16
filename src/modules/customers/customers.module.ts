import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Customer } from '../../entities/customers.entity';
import { customersController } from './customers.controller';
import { customersRepository } from './customers.repository';
import { customersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), PassportModule],
  controllers: [customersController],
  providers: [customersService, customersRepository],
})
export class customersModule {}
