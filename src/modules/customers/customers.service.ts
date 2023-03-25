import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { ClassificationsService } from '../classifications/classifications.service';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto, GetCustomerDto, UpdateCustomerDto } from './dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersRepository) private customersRepository: CustomersRepository,
    private classificationsService: ClassificationsService,
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
      classificationId,
    } = createCustomerDto;

    const classification = await this.classificationsService.readOne(classificationId);

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
        classification,
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
    const found = await this.customersRepository.findOne({ id }, { relations: ['classification'] });

    if (!found) ErrorHelper.NotFoundException(`Customer is not found`);

    return found;
  }

  async readList(getCustomerDto: GetCustomerDto): Promise<IPaginationResponse<Customer>> {
    const { search, classification } = getCustomerDto;
    try {
      const queryBuilderRepo = await this.customersRepository
        .createQueryBuilder('s')
        .leftJoinAndSelect('s.classification', 'sc');

      if (search) {
        queryBuilderRepo
          .where('s.first_name LIKE :search', { search: `%${search.trim()}%` })
          .orWhere('s.last_name LIKE :search', { search: `%${search.trim()}%` })
          .orWhere('s.phone LIKE :search', { search: `%${search.trim()}%` })
          .orWhere('s.address LIKE :search', { search: `%${search.trim()}%` });
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
      ErrorHelper.InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    currentUser: User,
  ): Promise<string> {
    const customer = await this.readOne(id);

    try {
      assignIfHasKey(customer, updateCustomerDto);
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
