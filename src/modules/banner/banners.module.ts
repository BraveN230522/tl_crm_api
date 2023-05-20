import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Banner } from '../../entities/banners.entity';
import { Campaign } from '../../entities/campaigns.entity';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
import { CampaignsService } from '../campaigns/campaigns.service';
import { BannersController } from './banners.controller';
import { BannersRepository } from './banners.repository';
import { BannersService } from './banners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Campaign]), PassportModule],
  controllers: [BannersController],
  providers: [BannersService, BannersRepository, CampaignsService, CampaignsRepository],
  exports: [BannersService, BannersRepository, TypeOrmModule.forFeature([Banner])],
})
export class BannersModule {}
