import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../../entities/vouchers.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities/mapping';
import { CampaignsService } from '../campaigns/campaigns.service';
import { CreateVoucherDto, GetFilterVoucherDto, UpdateVoucherDto } from './dto/vouchers.dto';
import { VouchersRepository } from './vouchers.repository';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(VouchersRepository) private vouchersRepository: VouchersRepository,
    private campaignsService: CampaignsService,
  ) {}

  async create({
    name,
    desc,
    note,
    startDate,
    endDate,
    discountPercent,
    discountAmount,
    maxNumOfUse,
    minCostToApply,
    numOfUsed,
    status,
    type,
    campaignId,
  }: CreateVoucherDto): Promise<string> {
    const campaign = campaignId && (await this.campaignsService.readOne(Number(campaignId)));

    const voucher = this.vouchersRepository.create({
      name,
      desc,
      note,
      startDate,
      endDate,
      discountPercent,
      discountAmount,
      maxNumOfUse,
      minCostToApply,
      numOfUsed,
      status,
      type,
      campaign,
    });

    await this.vouchersRepository.save([voucher]);

    return APP_MESSAGE.ADDED_SUCCESSFULLY('voucher');
  }

  async readList(getFilterVouchers: GetFilterVoucherDto): Promise<IPaginationResponse<Voucher[]>> {
    const { search, fromDate, toDate } = getFilterVouchers;
    const query = this.vouchersRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.campaign', 'voucherCampaign')
      .orderBy('voucher.id', 'DESC');

    if (search) {
      query.andWhere('LOWER(voucher.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    if (fromDate) {
      query.andWhere('voucher.startDate >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('voucher.endDate <= :toDate', { toDate });
    }

    const vouchers = this.vouchersRepository.paginationQueryBuilder(query, getFilterVouchers);

    return vouchers;
  }

  async readOne(id: number): Promise<Voucher> {
    const found = this.vouchersRepository.findOne({ id }, { relations: ['campaign'] });

    if (!found) ErrorHelper.NotFoundException(`This voucher with ${id} was not found`);

    return found;
  }

  async readIds(ids: number[]): Promise<Voucher[]> {
    const found = this.vouchersRepository.findByIds(ids);

    if (!found) ErrorHelper.NotFoundException(`This voucher with was not found`);

    return found;
  }

  async delete(id: number): Promise<string> {
    const result = await this.vouchersRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This voucher with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('voucher');
    }
  }

  async update(id: number, updateVoucherDto: UpdateVoucherDto): Promise<string> {
    const { campaignId } = updateVoucherDto;
    const voucher = await this.readOne(id);
    const campaign =
      campaignId && (await this.campaignsService.readOne(Number(updateVoucherDto?.campaignId)));
    try {
      assignIfHasKey(voucher, { ...updateVoucherDto, campaign });
      await this.vouchersRepository.save([voucher]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('voucher');
    } catch (error) {
      console.log({ error });
      ErrorHelper.InternalServerErrorException();
    }
  }
}
