import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Campaign } from '../../entities/campaigns.entity';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { CampaignsService } from '../campaigns/campaigns.service';
import { VouchersController } from './vouchers.controller';
import { VouchersRepository } from './vouchers.repository';
import { VouchersService } from './vouchers.service';
import { Voucher } from '../../entities/vouchers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Campaign]), PassportModule],
  controllers: [VouchersController],
  providers: [VouchersService, VouchersRepository, CampaignsService, CampaignsRepository],
  exports: [VouchersService, VouchersRepository, TypeOrmModule.forFeature([Voucher])],
})
export class VouchersModule {}
