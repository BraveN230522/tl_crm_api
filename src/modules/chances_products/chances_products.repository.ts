import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Chance_Product } from '../../entities/chances_products.entity';

@Injectable()
export class ChancesProductsRepository extends BaseRepository<Chance_Product> {
  constructor(
    @InjectRepository(Chance_Product)
    repository: Repository<Chance_Product>,
  ) {
    super(repository);
  }
}
