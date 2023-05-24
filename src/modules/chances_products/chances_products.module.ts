import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { ChancesProductsRepository } from './chances_products.repository';
import { ChancesProductsService } from './chances_products.service';
import { Chance_Product } from '../../entities/chances_products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chance_Product]), PassportModule],
  providers: [ChancesProductsService, ChancesProductsRepository],
})
export class ChancesProductsModule {}
