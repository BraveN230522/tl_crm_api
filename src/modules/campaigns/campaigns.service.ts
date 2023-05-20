import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Campaign } from '../../entities/campaigns.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities';
import { CampaignsRepository } from './campaigns.repository';
import { CreateCampaignDto, GetCampaignDto, UpdateCampaignDto } from './dto/campaigns.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignsRepository) private campaignsRepository: CampaignsRepository,
  ) {}

  async create(
    { name, desc, startDate, endDate, status }: CreateCampaignDto,
    currentUser,
  ): Promise<any> {
    try {
      const campaign = this.campaignsRepository.create({
        name,
        desc,
        startDate,
        endDate,
        status,
        importer: currentUser,
      });

      await this.campaignsRepository.save([campaign]);

      return campaign;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);
      else ErrorHelper.InternalServerErrorException();
    }
  }

  async readList(getCampaign: GetCampaignDto): Promise<any> {
    const { search, fromDate, toDate, status } = getCampaign;
    try {
      const queryBuilderRepo = await this.campaignsRepository
        .createQueryBuilder('campaign')
        .leftJoinAndSelect('campaign.importer', 'campaignImporter')
        .leftJoinAndSelect('campaign.exporter', 'campaignExporter')
        .leftJoinAndSelect('campaign.chances', 'campaignChances')
        .leftJoinAndSelect('campaign.vouchers', 'campaignVouchers')
        .leftJoinAndSelect('campaign.banners', 'campaignBanners')
        .orderBy('campaign.id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(campaign.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      if (fromDate) {
        queryBuilderRepo.andWhere('campaign.createdAt >= :fromDate', { fromDate });
      }

      if (toDate) {
        queryBuilderRepo.andWhere('campaign.createdAt <= :toDate', { toDate });
      }

      if (status) {
        queryBuilderRepo.andWhere('campaign.status = :status', { status });
      }

      const data = await this.campaignsRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getCampaign,
      );

      const campaigns = _.map(data?.items, (campaign: any) => {
        const {chances, banners, vouchers, ...newData} = campaign;
        return {
          ...newData,
          totalChances: chances?.length,
          totalBanners: banners?.length,
          totalVoucher: vouchers?.length,
        };
      });

      return {...data, items: campaigns};
    } catch (error) {
      console.log(error);
      ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id: string | number): Promise<Campaign> {
    const found = this.campaignsRepository.findOne({ id }, { relations: ['importer', 'exporter'] });

    if (!found) ErrorHelper.NotFoundException(`This product with ${id} was not found`);

    return found;
  }

  async update(id: string | number, updateCampaignDto: UpdateCampaignDto): Promise<string> {
    const data = await this.readOne(id);

    try {
      assignIfHasKey(data, updateCampaignDto);
      await this.campaignsRepository.save([data]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('campaign');
    } catch (error) {
      console.log({ error });
      ErrorHelper.InternalServerErrorException();
    }
  }

  async delete(id: string | number): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.campaignsRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Campaign ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('campaign');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }
}
