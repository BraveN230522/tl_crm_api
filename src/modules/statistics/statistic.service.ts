import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import moment from 'moment';
import { OrderStatus } from '../../enums';
import { ErrorHelper, getMonthlyRate } from '../../helpers';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { CustomersRepository } from '../customers/customers.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { GetOverviewDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(CustomersRepository) private customersRepository: CustomersRepository,
    @InjectRepository(OrdersRepository) private ordersRepository: OrdersRepository,
    @InjectRepository(CampaignsRepository) private campaignsRepository: CampaignsRepository,
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
    try {
      //customers
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
        .where('order.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('SUM(order.total)', 'total')
        .groupBy('order.id')
        .getRawMany();
      console.log({ ordersRevenue });
      const prevOrdersRevenue = await this.ordersRepository
        .createQueryBuilder('order')
        .where('order.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .where('order.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('order.status = :paidStatus', { paidStatus })
        .select('sum(order.total)', 'total')
        .groupBy('order.id')
        .getRawMany();
      console.log({ prevOrdersRevenue });

      //campaigns
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
        .leftJoin("orders.orderProducts", "orderProducts")
        .andWhere('orders.createdAt >= :startOfMonth', { startOfMonth })
        .andWhere('orders.createdAt <= :endOfMonth', { endOfMonth })
        .andWhere('orders.status = :paidStatus', { paidStatus })
        .groupBy('orders.id')
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ soldProducts });

      const prevSoldProducts = await this.ordersRepository
        .createQueryBuilder('orders')
        .leftJoin("orders.orderProducts", "orderProducts")
        .andWhere('orders.createdAt >= :startOfLastMonth', { startOfLastMonth })
        .andWhere('orders.createdAt <= :endOfLastMonth', { endOfLastMonth })
        .andWhere('orders.status = :paidStatus', { paidStatus })
        .groupBy('orders.id')
        .select('SUM(orderProducts.quantity)', 'total')
        .getRawOne();
      console.log({ prevSoldProducts });
      return {
        customers: {
          total: createdCustomers?.total,
          rate: getMonthlyRate(createdCustomers?.total, prevCreatedCustomers?.total),
        },
        revenue: {
          // total: ordersRevenue?.total,
          // rate: getMonthlyRate(ordersRevenue?.total, prevOrdersRevenue?.total),
        },
        campaigns: {
          total: createdCampaigns?.total,
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
}
