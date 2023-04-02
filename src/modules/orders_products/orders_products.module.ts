import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Order_Product } from '../../entities/orders_products.entity';
import { OrdersProductsRepository } from './orders_products.repository';
import { OrdersProductsService } from './orders_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order_Product]), PassportModule],
  providers: [OrdersProductsService, OrdersProductsRepository],
})
export class OrdersProductsModule {}
