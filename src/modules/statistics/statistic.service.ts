import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import moment from 'moment';
import { CampaignStatus, ChanceStatus, OrderStatus } from '../../enums';
import {
  ErrorHelper,
  getMonthlyRate,
  getPeriodRate,
  getTimeDataFilter,
  getTimePeriodFilter,
} from '../../helpers';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { ChancesRepository } from '../chances/chances.repository';
import { CustomersRepository } from '../customers/customers.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { ProductsRepository } from '../products/products.repository';
import {
  GetCustomerStatisticDto,
  GetOverviewDto,
  GetStatisticChartDto,
  GetStatisticDto,
} from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(CustomersRepository) private customersRepository: CustomersRepository,
    @InjectRepository(OrdersRepository) private ordersRepository: OrdersRepository,
    @InjectRepository(CampaignsRepository) private campaignsRepository: CampaignsRepository,
    @InjectRepository(ChancesRepository) private chancesRepository: ChancesRepository,
    @InjectRepository(CategoriesRepository) private categoriesRepository: CategoriesRepository,
    @InjectRepository(ProductsRepository) private productsRepository: ProductsRepository,
  ) {}

  async getOverview(getOverviewDto: GetOverviewDto): Promise<any> {
    const { filter } = getOverviewDto;
    //first and end time of current month
    const startOfMonth = moment().startOf('month').valueOf();
    const endOfMonth = moment().endOf('month').valueOf();
    //first and end time of last month
    const startOfLastMonth = moment().subtract(1, 'month').startOf('month').valueOf();
    const endOfLastMonth = moment().subtract(1, 'month').endOf('month').valueOf();
    //
    const paidStatus = OrderStatus.IS_PAID;
    const campaignActiveStatus = CampaignStatus.ACTIVE;
    try {
      //customers
      const { totalCustomers } = await this.customersRepository
        .createQueryBuilder('customer')
        .select('COUNT(customer.id)', 'totalCustomers')
        .getRawOne();
      console.log({ totalCustomers });
      const createdCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('customer.createdAt <= :endOfMonth', { endOfMonth })
        .select('COUNT(customer.id)', 'total')
        .getRawOne();
      console.log({ createdCustomers });

      const prevCreatedCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('customer.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .select('COUNT(customer.id)', 'total')
        .getRawOne();
      console.log({ prevCreatedCustomers });

      // orders
      const ordersRevenue = await this.ordersRepository
        .createQueryBuilder('order')
        .where('order.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(order.total)', 'total')
        .getRawOne();
      console.log({ ordersRevenue });
      const prevOrdersRevenue = await this.ordersRepository
        .createQueryBuilder('order')
        .where('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('sum(order.total)', 'total')
        .getRawOne();
      console.log({ prevOrdersRevenue });

      //campaigns
      const { totalCampaigns } = await this.campaignsRepository
        .createQueryBuilder('campaigns')
        .select('COUNT(campaigns.id)', 'totalCampaigns')
        .andWhere('campaigns.status = :campaignActiveStatus', { campaignActiveStatus })
        .getRawOne();
      console.log({ totalCampaigns });
      const createdCampaigns = await this.campaignsRepository
        .createQueryBuilder('campaigns')
        .andWhere('campaigns.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('campaigns.createdAt <= :endOfMonth', { endOfMonth })
        .select('COUNT(campaigns.id)', 'total')
        .getRawOne();
      console.log({ createdCampaigns });

      const prevCreatedCampaigns = await this.campaignsRepository
        .createQueryBuilder('campaigns')
        .andWhere('campaigns.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('campaigns.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .select('COUNT(campaigns.id)', 'total')
        .getRawOne();
      console.log({ prevCreatedCampaigns });

      //products
      const soldProducts = await this.ordersRepository
        .createQueryBuilder('orders')
        .leftJoin('orders.orderProducts', 'orderProducts')
        .andWhere('orders.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('orders.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('orders.status = :paidStatus', { paidStatus })
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ soldProducts });

      const prevSoldProducts = await this.ordersRepository
        .createQueryBuilder('orders')
        .leftJoin('orders.orderProducts', 'orderProducts')
        .andWhere('orders.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('orders.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('orders.status = :paidStatus', { paidStatus })
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ prevSoldProducts });
      return {
        customers: {
          total: totalCustomers,
          rate: getMonthlyRate(createdCustomers?.total, prevCreatedCustomers?.total),
        },
        revenue: {
          total: ordersRevenue?.total,
          rate: getMonthlyRate(ordersRevenue?.total, prevOrdersRevenue?.total),
        },
        campaigns: {
          total: totalCampaigns,
          rate: getMonthlyRate(createdCampaigns?.total, prevCreatedCampaigns?.total),
        },
        products: {
          total: soldProducts?.total,
          rate: getMonthlyRate(soldProducts?.total, prevSoldProducts?.total),
        },
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getNewCustomers(getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    const { timePeriod } = getStatisticChartDto;
    //first and end time of current month
    const times = getTimePeriodFilter(timePeriod);

    try {
      //customers
      const data = await Promise.all(
        _.map(times, async (item) => {
          const startTime = item?.startTime;
          const endTime = item?.endTime;
          const customers = await this.customersRepository
            .createQueryBuilder('customer')
            .andWhere('customer.createdAt >= :startTime', { startTime })
            .andWhere('customer.createdAt <= :endTime', { endTime })
            .select('COUNT(customer.id)', 'total')
            .getRawOne();
          return {
            timePeriod: item?.timeLabel,
            value: customers?.total,
          };
        }),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getPotentialCustomers(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    //first and end time of current month
    const { startTime, endTime, prevStartTime, prevEndTime } = getTimeDataFilter(timePeriod);

    try {
      //customers
      const createdCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :startTime', { startTime })
        .andWhere('customer.createdAt <= :endTime', { endTime })
        .select('COUNT(customer.id)', 'total')
        .getRawOne();
      console.log({ createdCustomers });

      const prevCreatedCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :prevStartTime', { prevStartTime })
        .andWhere('customer.createdAt <= :prevEndTime', { prevEndTime })
        .select('COUNT(customer.id)', 'total')
        .getRawOne();
      console.log({ prevCreatedCustomers });
      return {
        timePeriod: timePeriod,
        rate: getPeriodRate(createdCustomers?.total, prevCreatedCustomers?.total, timePeriod),
        total: Number(createdCustomers?.total),
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getCustomerConversion(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const paidStatus = OrderStatus.IS_PAID;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    console.log({ timePeriod, startTime, endTime });

    try {
      //customers
      const createdCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .where('customer.createdAt >= :startTime', { startTime })
        .andWhere('customer.createdAt <= :endTime', { endTime }) // andWhere đi sau where để bổ sung điều kiện time < startTime and .....
        .select('COUNT(DISTINCT customer.id)', 'total')
        .getRawOne();
      console.log({ createdCustomers });

      const conversionCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .leftJoin('customer.order', 'customerOrder') // lấy tất cả ở bảng bên trái + phù hợp bảng bên phải (k gán mà là cộng thêm)
        .where('customer.createdAt >= :startTime', { startTime })
        .andWhere('customer.createdAt <= :endTime', { endTime })
        .andWhere('customerOrder.status = :paidStatus', { paidStatus })
        .select('COUNT(DISTINCT customer.id)', 'total') // đếm tất cả các id không trùng (DISTINCT)
        .getRawOne();
      console.log({ conversionCustomers });
      return {
        createdCustomer: Number(createdCustomers?.total),
        conversedCustomer: Number(conversionCustomers?.total),
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getNewChances(getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    const { timePeriod } = getStatisticChartDto;
    //first and end time of current month
    const times = getTimePeriodFilter(timePeriod);

    try {
      const data = await Promise.all(
        _.map(times, async (item) => {
          const startTime = item?.startTime;
          const endTime = item?.endTime;
          const chances = await this.chancesRepository
            .createQueryBuilder('chance')
            .where('chance.createdAt >= :startTime', { startTime })
            .andWhere('chance.createdAt <= :endTime', { endTime })
            .select('COUNT(chance.id)', 'total')
            .getRawOne();
          return {
            timePeriod: item?.timeLabel,
            value: Number(chances?.total),
          };
        }),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getNewOrders(getStatisticChartDto: GetStatisticChartDto): Promise<any> {
    const { timePeriod } = getStatisticChartDto;
    //first and end time of current month
    const times = getTimePeriodFilter(timePeriod);

    try {
      const data = await Promise.all(
        _.map(times, async (item) => {
          const startTime = item?.startTime;
          const endTime = item?.endTime;
          const orders = await this.ordersRepository
            .createQueryBuilder('order')
            .where('order.createdAt >= :startTime', { startTime })
            .andWhere('order.createdAt <= :endTime', { endTime })
            .select('COUNT(order.id)', 'total')
            .getRawOne();
          return {
            timePeriod: item?.timeLabel,
            value: orders?.total,
          };
        }),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getChanceConversion(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const completeStatus = ChanceStatus.SUCCESS_END;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    console.log({ timePeriod, startTime, endTime });

    try {
      const createdChances = await this.chancesRepository
        .createQueryBuilder('chance')
        .where('chance.createdAt >= :startTime', { startTime })
        .andWhere('chance.createdAt <= :endTime', { endTime })
        .select('COUNT(DISTINCT chance.id)', 'total') // đếm tất cả các id không trùng (DISTINCT)
        .getRawOne();
      console.log({ createdChances });

      const completeChances = await this.chancesRepository
        .createQueryBuilder('chance')
        .where('chance.createdAt >= :startTime', { startTime })
        .andWhere('chance.createdAt <= :endTime', { endTime })
        .andWhere('chance.status = :completeStatus', { completeStatus })
        .select('COUNT(DISTINCT chance.id)', 'total') // đếm tất cả các id không trùng (DISTINCT)
        .getRawOne();
      console.log({ completeChances });
      return {
        createdChances: Number(createdChances?.total),
        completedChances: Number(completeChances?.total),
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getPopularCategories(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const completeStatus = ChanceStatus.SUCCESS_END;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    const paidStatus = OrderStatus.IS_PAID;
    console.log({ timePeriod, startTime, endTime });

    try {
      const categories = await this.categoriesRepository
        .createQueryBuilder('category')
        .leftJoin('category.products', 'categoryProduct')
        .leftJoin('categoryProduct.orderProducts', 'orderProd')
        .leftJoin('orderProd.order', 'prodOrders')
        .andWhere('prodOrders.status = :paidStatus', { paidStatus })
        .andWhere('prodOrders.updatedAt >= :startTime', { startTime })
        .andWhere('prodOrders.updatedAt <= :endTime', { endTime })
        .select(['category.id', 'category.name'])
        .addSelect('SUM(orderProd.quantity)', 'totalQuantity')
        .groupBy('category.id')
        .orderBy('SUM(orderProd.quantity)')
        .take(8)
        .getRawMany();
      console.log({ categories });
      return categories;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getPopularProductsByQuantity(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const completeStatus = ChanceStatus.SUCCESS_END;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    const paidStatus = OrderStatus.IS_PAID;
    console.log({ timePeriod, startTime, endTime });

    try {
      const products = await this.productsRepository
        .createQueryBuilder('product')
        .leftJoin('product.orderProducts', 'orderProd')
        .leftJoin('orderProd.order', 'prodOrders')
        .andWhere('prodOrders.status = :paidStatus', { paidStatus })
        .andWhere('orderProd.createdAt >= :startTime', { startTime })
        .andWhere('orderProd.createdAt <= :endTime', { endTime })
        .select(['product.id', 'product.name', 'product.image', 'product.cost'])
        .addSelect('SUM(orderProd.quantity)', 'prodQuantity')
        .groupBy('product.id')
        .orderBy('SUM(orderProd.quantity)')
        .take(5)
        .getRawMany();
      console.log({ products });
      return products;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getPopularProductsByRevenue(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const completeStatus = ChanceStatus.SUCCESS_END;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    const paidStatus = OrderStatus.IS_PAID;
    console.log({ timePeriod, startTime, endTime });

    try {
      const products = await this.productsRepository
        .createQueryBuilder('product')
        .leftJoin('product.orderProducts', 'orderProd')
        .leftJoin('orderProd.order', 'prodOrders')
        .andWhere('orderProd.createdAt >= :startTime', { startTime })
        .andWhere('orderProd.createdAt <= :endTime', { endTime })
        .andWhere('prodOrders.status = :paidStatus', { paidStatus })
        .select(['product.id', 'product.name', 'product.image', 'product.cost'])
        .addSelect('SUM(orderProd.quantity * product.cost)', 'totalCost')
        .groupBy('product.id')
        .orderBy('SUM(orderProd.quantity * product.cost)')
        .take(5)
        .getRawMany();
      console.log({ products });
      return products;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getMostSpentCustomers(getStatisticDto: GetStatisticDto): Promise<any> {
    const { timePeriod } = getStatisticDto;
    const completeStatus = ChanceStatus.SUCCESS_END;
    const { startTime, endTime } = getTimeDataFilter(timePeriod);

    const paidStatus = OrderStatus.IS_PAID;
    console.log({ timePeriod, startTime, endTime });

    try {
      const customers = await this.customersRepository
        .createQueryBuilder('customer')
        .leftJoin('customer.order', 'customerOrder')
        .andWhere('customerOrder.createdAt >= :startTime', { startTime })
        .andWhere('customerOrder.createdAt <= :endTime', { endTime })
        .andWhere('customerOrder.status = :paidStatus', { paidStatus })
        // .select(["customer.id"])
        // .select("customer") // => lấy tất cả các field của customer nhưng sẽ gán customer_ ở đầu
        .addSelect(['customer.id', 'customer.firstName', 'customer.lastName', 'customer.image'])
        .addSelect('SUM(customerOrder.total)', 'totalSpent')
        .groupBy('customer.id')
        // .addGroupBy('customerOrder.id')
        // .addGroupBy('customer.order')
        .orderBy('SUM(customerOrder.total)')
        .take(5)
        .getRawMany();
      console.log({ customers });
      return customers;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  //* Customer dashboard

  async getCustomerOverview(getCustomerStatisticDto: GetCustomerStatisticDto): Promise<any> {
    const { customerId } = getCustomerStatisticDto;
    const paidStatus = OrderStatus.IS_PAID;
    const refundStatus = OrderStatus.IS_REFUND;
    try {
      // orders
      const customerOrders = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('COUNT(order.id)', 'total')
        .getRawOne();
      console.log({ customerOrders });

      //products
      const purchasedProducts = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.orderProducts', 'orderProducts')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ purchasedProducts });

      // bill
      const customerBill = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(order.total)', 'total')
        .getRawOne();
      console.log({ customerBill });

      return {
        products: Number(purchasedProducts?.total),
        orders: Number(customerOrders?.total),
        spent: Number(customerBill?.total),
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getCustomerMonthlyOverview(getCustomerStatisticDto: GetCustomerStatisticDto): Promise<any> {
    const { customerId } = getCustomerStatisticDto;
    //first and end time of current month
    const startOfMonth = moment().startOf('month').valueOf();
    const endOfMonth = moment().endOf('month').valueOf();
    //first and end time of last month
    const startOfLastMonth = moment().subtract(1, 'month').startOf('month').valueOf();
    const endOfLastMonth = moment().subtract(1, 'month').endOf('month').valueOf();
    //
    const paidStatus = OrderStatus.IS_PAID;
    const refundStatus = OrderStatus.IS_REFUND;
    try {
      // orders
      const customerOrders = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('COUNT(order.id)', 'total')
        .getRawOne();
      console.log({ customerOrders });
      const prevCustomerOrders = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('COUNT(order.id)', 'total')
        .getRawOne();
      console.log({ prevCustomerOrders });

      //products
      const purchasedProducts = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.orderProducts', 'orderProducts')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ purchasedProducts });

      const prevPurchasedProducts = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.orderProducts', 'orderProducts')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ prevPurchasedProducts });

      // bill
      const customerBill = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(order.total)', 'total')
        .getRawOne();
      console.log({ customerBill });
      const prevCustomerBill = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('sum(order.total)', 'total')
        .getRawOne();

      // refund
      const customerRefund = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :refundStatus', { refundStatus })
        .select('SUM(order.total)', 'total')
        .getRawOne();
      console.log({ customerRefund });
      const prevCustomerRefund = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoin('order.customer', 'orderCustomer')
        .where('orderCustomer.id = :customerId', { customerId })
        .andWhere('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :refundStatus', { refundStatus })
        .select('sum(order.total)', 'total')
        .getRawOne();
      console.log({ prevCustomerRefund });
      return {
        products: {
          total: Number(purchasedProducts?.total),
          rate: getMonthlyRate(purchasedProducts?.total, prevPurchasedProducts?.total),
        },
        orders: {
          total: Number(customerOrders?.total),
          rate: getMonthlyRate(customerOrders?.total, prevCustomerOrders?.total),
        },
        spent: {
          total: Number(customerBill?.total),
          rate: getMonthlyRate(customerBill?.total, prevCustomerBill?.total),
        },
        refund: {
          total: Number(customerRefund?.total),
          rate: getMonthlyRate(customerRefund?.total, prevCustomerRefund?.total),
        },
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }
}
