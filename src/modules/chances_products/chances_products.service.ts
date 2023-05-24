import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IChanceProduct } from '../../interfaces';
import { ChancesProductsRepository } from './chances_products.repository';
import { Chance_Product } from '../../entities/chances_products.entity';

@Injectable()
export class ChancesProductsService {
  constructor(
    @InjectRepository(ChancesProductsRepository)
    private chancesProductsRepository: ChancesProductsRepository,
  ) {}

  async readOne(productId, chanceId): Promise<any> {
    const found = await this.chancesProductsRepository
      .createQueryBuilder('chanceProduct')
      .where('chanceProduct.productId = :productId', { productId })
      .andWhere('chanceProduct.chanceId = :chanceId', { chanceId })
      .getOne();

    if (!found) return null;

    return found;
  }

  async create({ chance, product, quantity }: IChanceProduct): Promise<void> {
    const chanceProduct = this.chancesProductsRepository.create({
      chance,
      product,
      quantity,
    });

    this.chancesProductsRepository.save([chanceProduct]);
  }

  async update({ chance, product, quantity }: IChanceProduct): Promise<void> {
    const chanceProduct = await this.readOne(product.id, chance.id);
    await this.chancesProductsRepository.update(chanceProduct.id, {
      chance,
      product,
      quantity,
    });
  }

  async clearByChance({ chance }: IChanceProduct): Promise<void> {
    await this.chancesProductsRepository
      .createQueryBuilder('chanceProducts')
      .delete()
      .from(Chance_Product)
      .where('chanceId = :id', { id: chance?.id })
      .execute();
  }
}
