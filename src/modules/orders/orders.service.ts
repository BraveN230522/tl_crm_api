import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { ErrorHelper } from '../../helpers';
import { IOrderResponse, IPaginationResponse, IProduct } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities';
import { CustomersService } from '../customers/customers.service';
import { OrdersProductsService } from '../orders_products/orders_products.service';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
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
    private storesService: StoresService,
  ) {}

  async create(
    {
      name,
      status,
      customerId,
      storeId,
      orderProducts,
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
      actualTotal,
    }: CreateOrderDto,
    currentUser,
  ): Promise<IOrderResponse> {
    const products = await this.productsService.getProductByIds(
      _.map(orderProducts, (orderProduct) => orderProduct.id),
    );

    const customer = await this.customersService.readOne(customerId);
    const store = await this.storesService.readOne(storeId);

    const mappingOrderProducts: IProduct[] = _.map(products, (product, index) => {
      if (product.quantity <= 0)
        ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

      const quantity = product.quantity - orderProducts[index]?.quantity;

      if (quantity < 0)
        ErrorHelper.ConflictException(APP_MESSAGE.QUANTITY_ALLOWED(product.quantity, product.name));

      this.productsService.updateProduct(product.id, { quantity });

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
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
      total: actualTotal || total,
      importer: currentUser,
      customer: _.omit(customer, ['stores', 'classifications']),
      store,
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
      actualTotal,
      customerId,
      storeId,
      orderProducts,
      importerId,
      exporterId,
    }: UpdateOrderDto,
    currentUser,
  ): Promise<string> {
    const order = await this.readOne(id);
    const customer = customerId && await this.customersService.readOne(customerId);
    const store = await this.storesService.readOne(storeId);

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
      const mappingOrderProducts: IProduct[] = _.map(products, (product, index) => {
        let quantity = product.quantity - orderProducts[index]?.quantity;
        const prevProduct = _.find(order.orderProducts, (op) => op?.product?.id === product?.id);

        if (prevProduct) {
          quantity = prevProduct.quantity - orderProducts[index]?.quantity + product?.quantity;
        }
        // if (product.quantity <= 0)
        //   ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

        if (quantity < 0)
          ErrorHelper.ConflictException(
            APP_MESSAGE.QUANTITY_ALLOWED(orderProducts[index]?.quantity + quantity, product.name),
          );

        this.productsService.updateProduct(product.id, { quantity });

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

      // this.ordersProductsService.clearByOrder(order);

      await Promise.all(
        _.map(order.orderProducts, (prodChance) => {
          const newUpdateProduct = mappingOrderProducts?.map((prod) => prod?.id);
          if (!newUpdateProduct?.includes(prodChance?.product?.id)) {
            this.ordersProductsService.delete({
              order: order,
              product: prodChance?.product,
            });
          }
        }),
      );

      await Promise.all(
        _.map(mappingOrderProducts, (orderProduct) => {
          // console.log('check2', orderProduct);
          const found = order.orderProducts.find((prod) => prod?.product?.id === orderProduct.id);
          console.log({ found });
          if (!found)
            return this.ordersProductsService.create({
              order: order,
              product: orderProduct,
              quantity: orderProduct.quantity,
            });
          else
            return this.ordersProductsService.update({
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
      note,
      shippingAddress,
      billingAddress,
      paymentDate,
      deliveryDate,
      importer,
      exporter,
      total: actualTotal || total,
      customer: _.omit(customer, ['stores', 'classifications']),
      store,
    });

    delete order.orderProducts;

    await this.ordersRepository.save([order]);

    return APP_MESSAGE.UPDATED_SUCCESSFULLY('order');
  }

  async readList(getOrderDto: GetOrderDto): Promise<IPaginationResponse<Order>> {
    const { search, customerId, fromDate, toDate, productId, status, isPaid } = getOrderDto;
    try {
      const queryBuilderRepo = await this.ordersRepository
        .createQueryBuilder('o')
        .leftJoinAndSelect('o.orderProducts', 'oo')
        .leftJoinAndSelect('oo.product', 'oop')
        .leftJoinAndSelect('oop.category', 'oopc')
        .leftJoinAndSelect('o.customer', 'oc')
        .leftJoinAndSelect('o.store', 'os')
        .leftJoinAndSelect('o.importer', 'oi')
        .leftJoinAndSelect('o.exporter', 'oe')
        .orderBy('o.id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(o.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      if (isPaid) {
        queryBuilderRepo.andWhere('o.paymentDate > 0', { isPaid });
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

      // const orders = _.map(data, (order) => {
      //   return _.omit(order, ['orderProducts']);
      // });

      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id: string | number): Promise<Order> {
    const found = await this.ordersRepository.findOne(
      { id },
      {
        relations: [
          'orderProducts',
          'orderProducts.product',
          'orderProducts.product.category',
          'customer',
          'store',
          'importer',
          'exporter',
          'voucher',
        ],
      },
    );

    if (!found) ErrorHelper.NotFoundException(`Order is not found`);

    return found;
  }

  async getOne(id: string | number): Promise<any> {
    const found = await this.ordersRepository.findOne(
      { id },
      {
        relations: [
          'orderProducts',
          'orderProducts.product',
          'customer',
          'store',
          'importer',
          'exporter',
          'voucher',
        ],
      },
    );

    if (!found) ErrorHelper.NotFoundException(`Order is not found`);

    const orderProducts = _.map(found?.orderProducts, (item) => {
      return { ...item?.product, quantity: item?.quantity };
    });

    return { ...found, orderProducts };
  }

  async delete(id: string): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.ordersRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Order ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('order');
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }
}
