import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Banner } from '../../entities/banners.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { CampaignsService } from '../campaigns/campaigns.service';
import { assignIfHasKey } from './../../utilities/mapping';
import { BannersRepository } from './banners.repository';
import { CreateBannerDto, GetFilterBannersDto, UpdateBannerDto } from './dto/banners.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(BannersRepository) private bannersRepository: BannersRepository,
    private campaignsService: CampaignsService,
  ) {}

  async create({
    name,
    desc,
    note,
    image,
    redirectLink,
    campaignId,
  }: CreateBannerDto): Promise<string> {
    const campaign = await this.campaignsService.readOne(Number(campaignId));

    const banner = this.bannersRepository.create({
      name,
      desc,
      note,
      image,
      redirectLink,
      campaign,
    });

    await this.bannersRepository.save([banner]);

    return APP_MESSAGE.ADDED_SUCCESSFULLY('Create banner successfully');
  }

  async readList(getFilterBanners: GetFilterBannersDto): Promise<IPaginationResponse<Banner[]>> {
    const { search } = getFilterBanners;
    const query = this.bannersRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.campaign', 'bannerCampaign')
      .orderBy('banner.id', 'DESC');

    if (search) {
      query.andWhere('LOWER(banner.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    const banners = this.bannersRepository.paginationQueryBuilder(query, getFilterBanners);

    return banners;
  }

  async readOne(id: number): Promise<Banner> {
    const found = this.bannersRepository.findOne({ id }, { relations: ['campaign'] });

    if (!found) ErrorHelper.NotFoundException(`This banner with ${id} was not found`);

    return found;
  }

  async readIds(ids: number[]): Promise<Banner[]> {
    const found = this.bannersRepository.findByIds(ids);

    if (!found) ErrorHelper.NotFoundException(`This banner with was not found`);

    return found;
  }

  async delete(id: number): Promise<string> {
    const result = await this.bannersRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This banner with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('Delete banner successfully');
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<string> {
    const { campaignId } = updateBannerDto;
    const banner = await this.readOne(id);
    const campaign =
      campaignId && (await this.campaignsService.readOne(Number(updateBannerDto?.campaignId)));
    const updateData = _.omit(updateBannerDto, 'campaignId');
    try {
      assignIfHasKey(banner, { ...updateData, campaign });
      await this.bannersRepository.save([banner]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('banner');
    } catch (error) {
      console.log({ error });
      ErrorHelper.InternalServerErrorException();
    }
  }
}
