import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { ClassificationsService } from '../classifications/classifications.service';
import { StoresService } from '../stores/stores.service';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto, GetCustomerDto, UpdateCustomerDto } from './dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersRepository) private customersRepository: CustomersRepository,
    private classificationsService: ClassificationsService,
    private storesService: StoresService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, currentUser: User): Promise<Customer> {
    const {
      phone,
      firstName,
      lastName,
      dob,
      gender,
      address,
      point,
      cashback,
      rate,
      taxCode,
      image,
      email,
      classificationIds,
      storeId = currentUser?.store?.id,
    } = createCustomerDto;

    if (!storeId) {
      ErrorHelper.BadRequestException('storeId should not be empty');
    }

    const classifications = await Promise.all(
      _.map(classificationIds, (tempId) => this.classificationsService.readOne(tempId)),
    );

    const store = await this.storesService.readOne(storeId);

    try {
      const customer = this.customersRepository.create({
        phone,
        firstName,
        lastName,
        dob,
        gender,
        address,
        point,
        cashback,
        rate,
        taxCode,
        image,
        email,
        classifications: classifications,
        stores: [store],
      });

      await this.customersRepository.save([customer]);

      return customer;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);

      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone', 'email'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id): Promise<Customer> {
    const found = await this.customersRepository.findOne(
      { id },
      { relations: ['classifications', 'stores'] },
    );

    if (!found) ErrorHelper.NotFoundException(`Customer is not found`);

    return found;
  }

  async readList(getCustomerDto: GetCustomerDto): Promise<IPaginationResponse<Customer>> {
    const { search, classification } = getCustomerDto;
    try {
      const queryBuilderRepo = await this.customersRepository
        .createQueryBuilder('s')
        .leftJoinAndSelect('s.classifications', 'sc')
        .leftJoinAndSelect('s.stores', 'ss')
        .orderBy('s.id', 'DESC');
      if (search) {
        queryBuilderRepo
          .where('LOWER(s.first_name) LIKE LOWER(:search)', { search: `%${search.trim()}%` })
          .orWhere('LOWER(s.last_name) LIKE LOWER(:search)', { search: `%${search.trim()}%` })
          .orWhere('LOWER(s.phone) LIKE LOWER(:search)', { search: `%${search.trim()}%` })
          .orWhere('LOWER(s.address) LIKE LOWER(:search)', { search: `%${search.trim()}%` });
      }
      if (classification) {
        queryBuilderRepo.andWhere('sc.id = :classification', { classification });
      }
      const data = await this.customersRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getCustomerDto,
      );

      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    currentUser: User,
  ): Promise<string> {
    const { classificationIds, storeId = currentUser?.store?.id } = updateCustomerDto;

    const customer = await this.readOne(id);
    const classifications = await Promise.all(
      _.map(classificationIds, (tempId) => this.classificationsService.readOne(tempId)),
    );
    const store = await this.storesService.readOne(storeId);
    const addedStores = _.differenceBy([store], customer.stores, 'id');

    try {
      assignIfHasKey(customer, {
        ...updateCustomerDto,
        classifications,
        stores: [...customer.stores, ...addedStores],
      });
      await this.customersRepository.save([customer]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('customer');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['email', 'phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.customersRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Project ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('customer');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }
}
