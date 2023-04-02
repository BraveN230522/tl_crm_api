import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { ErrorHelper } from '../../helpers';
import { IProductOrder } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { ProductsService } from '../products/products.service';
import { myMapPick } from './../../utilities/mapping';
import { CreateOrderDto } from './dto/orders.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
  ) {}

  async create({
    name,
    status,
    customerId,
    importer_id,
    exporter_id,
    orderProducts,
  }: CreateOrderDto): Promise<any> {
    // return myMapPick(orderProducts, ['id']);

    const products = await this.productsService.getProductByIds(
      _.map(orderProducts, (orderProduct) => orderProduct.id),
    );
    const mappingOrderProducts = products.map((product, index) => {
      if (product.quantity <= 0)
        ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

      const quantity = product.quantity - orderProducts[index]?.quantity;

      if (quantity < 0)
        ErrorHelper.ConflictException(APP_MESSAGE.QUANTITY_ALLOWED(product.quantity, product.name));

      return {
        ...product,
        ...orderProducts?.[index],
      };
    });

    return mappingOrderProducts;
    // const total = products.reduce((acc, cur) => {
    //   return acc + cur.cost;
    // }, 0);
    // console.log(total);
    // return total;
    // const classification = this.ordersRepository.create({
    //   name,
    //   desc,
    // });
    // await this.ordersRepository.save([classification]);
    // return classification;
  }
}
