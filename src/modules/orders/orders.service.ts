import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { ErrorHelper } from '../../helpers';
import { IOrderResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { CustomersService } from '../customers/customers.service';
import { OrdersProductsService } from '../orders_products/orders_products.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
    private ordersProductsService: OrdersProductsService,
    private customersService: CustomersService,
  ) {}

  async create(
    { name, status, customerId, orderProducts }: CreateOrderDto,
    currentUser,
  ): Promise<IOrderResponse> {
    const products = await this.productsService.getProductByIds(
      _.map(orderProducts, (orderProduct) => orderProduct.id),
    );

    const customer = await this.customersService.readOne(customerId);

    const mappingOrderProducts: Product[] = _.map(products, (product, index) => {
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

    const total = _.reduce(
      mappingOrderProducts,
      (acc, cur) => {
        return acc + cur.cost * cur.quantity;
      },
      0,
    );

    const order = this.ordersRepository.create({
      name,
      status,
      total: total,
      importer: currentUser,
      customer: _.omit(customer, ['stores', 'classifications']),
    });

    const savedOrder = await this.ordersRepository.save([order]);

    await Promise.all(
      _.map(mappingOrderProducts, (orderProduct) => {
        return this.ordersProductsService.create({
          order: savedOrder[0],
          product: orderProduct,
          quantity: orderProduct.quantity,
        });
      }),
    );

    return { ...savedOrder[0], products: mappingOrderProducts };
  }

  async update(
    id: number,
    { name, status, customerId, orderProducts }: UpdateOrderDto,
    currentUser,
  ): Promise<string> {
    // const found = this.readOne(id)

    // const products = await this.productsService.getProductByIds(
    //   _.map(orderProducts, (orderProduct) => orderProduct.id),
    // );

    // const customer = await this.customersService.readOne(customerId);

    // const mappingOrderProducts: Product[] = _.map(products, (product, index) => {
    //   if (product.quantity <= 0)
    //     ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

    //   const quantity = product.quantity - orderProducts[index]?.quantity;

    //   if (quantity < 0)
    //     ErrorHelper.ConflictException(APP_MESSAGE.QUANTITY_ALLOWED(product.quantity, product.name));

    //   return {
    //     ...product,
    //     ...orderProducts?.[index],
    //   };
    // });

    // const total = _.reduce(
    //   mappingOrderProducts,
    //   (acc, cur) => {
    //     return acc + cur.cost * cur.quantity;
    //   },
    //   0,
    // );

    // const order = this.ordersRepository.create({
    //   name,
    //   status,
    //   total: total,
    //   importer: currentUser,
    //   customer: _.omit(customer, ['stores', 'classifications']),
    // });

    // const savedOrder = await this.ordersRepository.save([order]);

    // await Promise.all(
    //   _.map(mappingOrderProducts, (orderProduct) => {
    //     return this.ordersProductsService.create({
    //       order: savedOrder[0],
    //       product: orderProduct,
    //       quantity: orderProduct.quantity,
    //     });
    //   }),
    // );

    return '';
  }

  async readOne(id): Promise<Order> {
    const found = await this.ordersRepository.findOne({ id }, { relations: [] });

    if (!found) ErrorHelper.NotFoundException(`Order is not found`);

    return found;
  }
}
