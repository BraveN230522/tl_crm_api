import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Customer } from '../../entities/customers.entity';
import { Rule } from '../../entities/rules.entity';
import { Store } from '../../entities/stores.entity';
import { Tier } from '../../entities/tiers.entity';
import { StoresController } from './stores.controller';
import { StoresRepository } from './stores.repository';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Rule, Tier, Customer]), PassportModule],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
})
export class StoresModule {}
