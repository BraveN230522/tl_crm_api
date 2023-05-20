import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Voucher } from '../../entities/vouchers.entity';

@Injectable()
export class VouchersRepository extends BaseRepository<Voucher> {
  constructor(
    @InjectRepository(Voucher)
    repository: Repository<Voucher>,
  ) {
    super(repository);
  }
}
