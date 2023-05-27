import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import moment from 'moment';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { ClassificationsService } from '../classifications/classifications.service';
import { CustomersRepository } from '../customers/customers.repository';
import { StoresService } from '../stores/stores.service';
import { GetOverviewDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(CustomersRepository) private customersRepository: CustomersRepository,
    private classificationsService: ClassificationsService,
    private storesService: StoresService,
  ) {}

  async getOverview(getOverviewDto: GetOverviewDto): Promise<any> {
    const { filter } = getOverviewDto;
    //first and end time of current month
    const startOfMonth = moment().startOf('month').valueOf();
    const endOfMonth = moment().endOf('month').valueOf();
    //first and end time of last month
    const startOfLastMonth = moment().startOf('month').valueOf();
    const endOfLastMonth = moment().endOf('month').valueOf();
    try {
      //customers
      const createdCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :fromDate', { startOfMonth })
        .andWhere('customer.createdAt <= :toDate', { endOfMonth })
        .select('COUNT(customer.id)', 'total');
      const prevCreatedCustomers = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :fromDate', { startOfLastMonth })
        .andWhere('customer.createdAt <= :toDate', { endOfLastMonth })
        .select('COUNT(customer.id)', 'total');
      //orders
      const createdOrders = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :fromDate', { startOfMonth })
        .andWhere('customer.createdAt <= :toDate', { endOfMonth })
        .select('COUNT(customer.id)', 'total');
      const prevCreatedOrders = await this.customersRepository
        .createQueryBuilder('customer')
        .andWhere('customer.createdAt >= :fromDate', { startOfLastMonth })
        .andWhere('customer.createdAt <= :toDate', { endOfLastMonth })
        .select('COUNT(customer.id)', 'total');
      return {
        customers: {
          total: createdCustomers,
          rate: 1,
        },
      };
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }
}
