import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Chance } from '../../entities/chances.entity';
import { Product } from '../../entities/products.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper, isValidRole } from '../../helpers';
import { IChanceResponse, IPaginationResponse, IProduct } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities';
import { CampaignsService } from '../campaigns/campaigns.service';
import { ChancesProductsService } from '../chances_products/chances_products.service';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { ChancesRepository } from './chances.repository';
import { CreateChancesDto, GetChancesDto, UpdateChanceDto } from './dto/chances.dto';

@Injectable()
export class ChancesService {
  constructor(
    @InjectRepository(ChancesRepository) private chancesRepository: ChancesRepository,
    private userService: UsersService,
    private productsService: ProductsService,
    private chancesProductsService: ChancesProductsService,
    private customersService: CustomersService,
    private campaignsService: CampaignsService,
  ) {}

  async create(
    {
      name,
      status,
      customerId,
      chanceProducts,
      note,
      expectEndDate,
      campaignId,
      desc,
      currentProcess,
      successRate,
      failedNote,
      successNote,
    }: CreateChancesDto,
    currentUser,
  ): Promise<IChanceResponse> {
    const products = await this.productsService.getProductByIds(
      _.map(chanceProducts, (chanceProduct) => chanceProduct.id),
    );

    const customer = await this.customersService.readOne(customerId);
    const campaign = await this.campaignsService.readOne(campaignId);

    const mappingChanceProducts: IProduct[] = _.map(products, (product, index) => {
      if (product.quantity <= 0)
        ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

      const quantity = product.quantity - chanceProducts[index]?.quantity;

      if (quantity < 0)
        ErrorHelper.ConflictException(APP_MESSAGE.QUANTITY_ALLOWED(product.quantity, product.name));

      this.productsService.updateProduct(product.id, { quantity });

      return {
        ...product,
        ...chanceProducts?.[index],
      };
    });

    const total = _.reduce(
      mappingChanceProducts,
      (acc, cur) => {
        return acc + cur.cost * cur.quantity;
      },
      0,
    );

    const chance = this.chancesRepository.create({
      name,
      desc,
      note,
      failedNote,
      successNote,
      successRate,
      currentProcess,
      status,
      expectEndDate,
      chanceProducts,
      total,
      user: currentUser,
      campaign,
      customer: _.omit(customer, ['stores', 'classifications']),
    });

    const saveChances = await this.chancesRepository.save([chance]);

    await Promise.all(
      _.map(mappingChanceProducts, (chanceProduct) => {
        return this.chancesProductsService.create({
          chance: saveChances[0],
          product: chanceProduct,
          quantity: chanceProduct.quantity,
        });
      }),
    );

    return { ...saveChances[0], products: mappingChanceProducts };
  }


  async update(
    id: number,
    {
      name,
      status,
      customerId,
      chanceProducts,
      note,
      expectEndDate,
      campaignId,
      desc,
      currentProcess,
      successRate,
      failedNote,
      successNote,
    }: UpdateChanceDto,
    currentUser,
  ): Promise<string> {
    const chance = await this.readOne(id);
    const customer = await this.customersService.readOne(customerId);
    const campaign = await this.campaignsService.readOne(campaignId);

    let total;
    let exporter;
    let importer;

    if (chanceProducts) {
      const products = await this.productsService.getProductByIds(
        _.map(chanceProducts, (chanceProducr) => chanceProducr.id),
      );
      const mappingChanceProducts: IProduct[] = _.map(products, (product, index) => {
        let quantity = product.quantity - chanceProducts[index]?.quantity;
        const prevProduct = _.find(chance.chanceProducts, (op) => op?.product?.id === product?.id);

        if (prevProduct) {
          quantity = prevProduct.quantity - chanceProducts[index]?.quantity + product?.quantity;
        }
        // if (product.quantity <= 0)
        //   ErrorHelper.ConflictException(APP_MESSAGE.OUT_OF_STOCK(product.name));

        if (quantity < 0)
          ErrorHelper.ConflictException(
            APP_MESSAGE.QUANTITY_ALLOWED(chanceProducts[index]?.quantity + quantity, product.name),
          );

        this.productsService.updateProduct(product.id, { quantity });

        return {
          ...product,
          ...chanceProducts?.[index],
        };
      });

      total = _.reduce(
        mappingChanceProducts,
        (acc, cur) => {
          return acc + cur.cost * cur.quantity;
        },
        0,
      );

      await Promise.all(
        _.map(mappingChanceProducts, (chanceProduct) => {
          // console.log('check2', chanceProduct);
          const found = chance.chanceProducts.find((prod) => prod.product.id === chanceProduct.id);
          console.log({ found });
          if (!found)
            return this.chancesProductsService.create({
              chance: chance,
              product: chanceProduct,
              quantity: chanceProduct.quantity,
            });
          else
            return this.chancesProductsService.update({
              chance: chance,
              product: chanceProduct,
              quantity: chanceProduct.quantity,
            });
        }),
      );
    }

    assignIfHasKey(chance, {
      name,
      desc,
      note,
      failedNote,
      successNote,
      successRate,
      currentProcess,
      status,
      expectEndDate,
      chanceProducts,
      total,
      user: currentUser,
      campaign,
      customer: _.omit(customer, ['stores', 'classifications']),
    });

    delete chance.chanceProducts;

    await this.chancesRepository.save([chance]);

    return APP_MESSAGE.UPDATED_SUCCESSFULLY('chance');
  }

  async readList(getChancesDto: GetChancesDto): Promise<IPaginationResponse<any>> {
    const { search, customerId, fromDate, toDate, productId, status } = getChancesDto;
    try {
      const queryBuilderRepo = await this.chancesRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.chanceProducts', 'cc')
        .leftJoinAndSelect('cc.product', 'ccp')
        .leftJoinAndSelect('c.customer', 'ccu')
        .leftJoinAndSelect('c.campaign', 'cca')
        .leftJoinAndSelect('c.user', 'cu')
        .orderBy('c.id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(c.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      if (customerId) {
        queryBuilderRepo.andWhere('ccu.id = :customerId', { customerId });
      }

      if (fromDate) {
        queryBuilderRepo.andWhere('c.createdAt >= :fromDate', { fromDate });
      }

      if (toDate) {
        queryBuilderRepo.andWhere('c.createdAt <= :toDate', { toDate });
      }

      if (productId) {
        queryBuilderRepo.andWhere('ccp.id = :productId', { productId });
      }

      if (status) {
        queryBuilderRepo.andWhere('c.status = :status', { status });
      }

      const data = await this.chancesRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getChancesDto,
      );

      // const chances = _.map(data, (chance) => {
      //   return _.omit(chance, ['chancesProducts']);
      // });

      return data;
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id: string | number): Promise<Chance> {
    const found = await this.chancesRepository.findOne(
      { id },
      {
        relations: [
          'chanceProducts',
          'chanceProducts.product',
          'customer',
          'campaign',
          'user',
        ],
      },
    );

    if (!found) ErrorHelper.NotFoundException(`Chance is not found`);

    return found;
  }

  async getOne(id: string | number): Promise<any> {
    const found = await this.chancesRepository.findOne(
      { id },
      {
        relations: [
          'chanceProducts',
          'chanceProducts.product',
          'customer',
          'campaign',
          'user',
        ],
      },
    );

    if (!found) ErrorHelper.NotFoundException(`Chance is not found`);

    const chanceProducts = _.map(found?.chanceProducts, (item) => {
      return { ...item?.product, quantity: item?.quantity };
    });

    return { ...found, chanceProducts };
  }

  async delete(id: string): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.chancesRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Chance ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('chance');
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }
}
