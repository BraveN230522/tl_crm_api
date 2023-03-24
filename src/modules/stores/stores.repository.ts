import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Store } from '../../entities/stores.entity';

@Injectable()
export class StoresRepository extends BaseRepository<Store> {
  constructor(
    @InjectRepository(Store)
    repository: Repository<Store>,
  ) {
    super(repository);
  }
}
