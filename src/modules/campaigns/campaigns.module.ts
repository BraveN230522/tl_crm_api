import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Campaign } from '../../entities/campaigns.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsService } from './campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign]), PassportModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository],
})
export class CampaignsModule {}
