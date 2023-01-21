import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';

@Injectable()
export class StoresRepository extends Repository<Store> {
  constructor(
    @InjectRepository(Store)
    repository: Repository<Store>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
