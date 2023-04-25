import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classification } from '../../entities/classifications.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { ClassificationsRepository } from './classifications.repository';
import {
  CreateClassificationDto,
  GetFilterClassificationsDto,
  UpdateClassificationDto,
} from './dto/classifications.dto';

@Injectable()
export class ClassificationsService {
  constructor(
    @InjectRepository(ClassificationsRepository)
    private classificationsRepository: ClassificationsRepository,
  ) {}

  async readOne(id): Promise<Classification> {
    const found = await this.classificationsRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`Classification is not found`);

    return found;
  }

  async readList(
    filter: GetFilterClassificationsDto,
  ): Promise<IPaginationResponse<Classification[]>> {
    const { search } = filter;
    const query = this.classificationsRepository
      .createQueryBuilder('classifications')
      .orderBy('id', 'DESC');
    if (search) {
      query.andWhere('LOWER(classifications.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }
    const classifications = this.classificationsRepository.paginationQueryBuilder(query, filter);
    return classifications;
  }

  async create({ name, desc }: CreateClassificationDto): Promise<Classification> {
    const classification = this.classificationsRepository.create({
      name,
      desc,
    });
    await this.classificationsRepository.save([classification]);
    return classification;
  }

  async update(id: string, updateClassificationDto: UpdateClassificationDto): Promise<string> {
    const store = await this.readOne(id);

    try {
      assignIfHasKey(store, updateClassificationDto);
      await this.classificationsRepository.save([store]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('store');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['email', 'phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async delete(id: number): Promise<string> {
    const result = await this.classificationsRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This classification with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('classification');
    }
  }
}
