import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Banner } from '../../entities/banners.entity';

@Injectable()
export class BannersRepository extends BaseRepository<Banner> {
  constructor(
    @InjectRepository(Banner)
    repository: Repository<Banner>,
  ) {
    super(repository);
  }
}
