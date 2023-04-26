import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { ErrorHelper } from '../../helpers';
import { IOrderResponse, IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities';
import { CustomersService } from '../customers/customers.service';
import { OrdersProductsService } from '../orders_products/orders_products.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
    private ordersProductsService: OrdersProductsService,
    private customersService: CustomersService,
    private usersService: UsersService,
  ) {}

  async create(
    {
      name,
      status,
      customerId,
      orderProducts,
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
    }: CreateOrderDto,
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
      total,
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
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
    {
      name,
      status,
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
      customerId,
      orderProducts,
      importerId,
      exporterId,
    }: UpdateOrderDto,
    currentUser,
  ): Promise<string> {
    const order = await this.readOne(id);
    const customer = await this.customersService.readOne(customerId);

    let total;
    let exporter;
    let importer;

    if (importerId) {
      importer = await this.usersService.getUser(importerId);
    }

    if (exporterId) {
      exporter = await this.usersService.getUser(exporterId);
    }

    if (orderProducts) {
      const products = await this.productsService.getProductByIds(
        _.map(orderProducts, (orderProduct) => orderProduct.id),
      );

      const mappingOrderProducts: Product[] = _.map(products, (product, index) => {
        if (product.quantity <= 0)
          ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

        const quantity = product.quantity - orderProducts[index]?.quantity;

        if (quantity < 0)
          ErrorHelper.ConflictException(
            APP_MESSAGE.QUANTITY_ALLOWED(product.quantity, product.name),
          );

        return {
          ...product,
          ...orderProducts?.[index],
        };
      });

      total = _.reduce(
        mappingOrderProducts,
        (acc, cur) => {
          return acc + cur.cost * cur.quantity;
        },
        0,
      );

      await Promise.all(
        _.map(mappingOrderProducts, (orderProduct) => {
          return this.ordersProductsService.create({
            order: order,
            product: orderProduct,
            quantity: orderProduct.quantity,
          });
        }),
      );
    }

    assignIfHasKey(order, {
      name,
      status,
      total,
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
      importer,
      exporter,
      customer: _.omit(customer, ['stores', 'classifications']),
    });

    await this.ordersRepository.save([order]);

    return APP_MESSAGE.UPDATED_SUCCESSFULLY('order');
  }

  async readList(getOrderDto: GetOrderDto): Promise<IPaginationResponse<Order>> {
    const { search, customerId, fromDate, toDate, productId, status } = getOrderDto;
    try {
      const queryBuilderRepo = await this.ordersRepository
        .createQueryBuilder('o')
        .leftJoinAndSelect('o.orderProducts', 'oo')
        .leftJoinAndSelect('oo.product', 'oop')
        .leftJoinAndSelect('o.customer', 'oc')
        .leftJoinAndSelect('o.importer', 'oi')
        .leftJoinAndSelect('o.exporter', 'oe')
        .orderBy('o.id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(o.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      if (customerId) {
        queryBuilderRepo.andWhere('oc.id = :customerId', { customerId });
      }

      if (fromDate) {
        queryBuilderRepo.andWhere('o.createdAt >= :fromDate', { fromDate });
      }

      if (toDate) {
        queryBuilderRepo.andWhere('o.createdAt <= :toDate', { toDate });
      }

      if (productId) {
        queryBuilderRepo.andWhere('oop.id = :productId', { productId });
      }

      if (status) {
        queryBuilderRepo.andWhere('o.status = :status', { status });
      }

      const data = await this.ordersRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getOrderDto,
      );

      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id): Promise<Order> {
    const found = await this.ordersRepository.findOne(
      { id },
      { relations: ['orderProducts', 'orderProducts.product', 'customer', 'importer', 'exporter'] },
    );

    if (!found) ErrorHelper.NotFoundException(`Order is not found`);

    return found;
  }

  async delete(id: string): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.ordersRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Order ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('order');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }
}
