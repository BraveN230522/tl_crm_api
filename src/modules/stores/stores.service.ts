import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { CreateStoreDto, GetStoreDto, UpdateStoreDto } from './dto/stores.dto';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(StoresRepository) private storesRepository: StoresRepository) {}

  async create(createStoreDto: CreateStoreDto, currentUser: User): Promise<any> {
    const { name, address, email, phone, businessType, storeImage, privacyPolicy } = createStoreDto;

    try {
      const store = this.storesRepository.create({
        name,
        address,
        email,
        phone,
        businessType,
        storeImage,
        privacyPolicy,
      });

      await this.storesRepository.save([store]);

      return store;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);

      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['address'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async readOne(id): Promise<Store> {
    const found = await this.storesRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`Store is not found`);

    return found;
  }

  async readList(getStoreDto: GetStoreDto): Promise<IPaginationResponse<Store>> {
    const { search } = getStoreDto;
    try {
      const queryBuilderRepo = await this.storesRepository
        .createQueryBuilder('s')
        .orderBy('id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(s.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      const data = await this.storesRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getStoreDto,
      );

      return data;
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<string> {
    const store = await this.readOne(id);

    try {
      assignIfHasKey(store, updateStoreDto);
      await this.storesRepository.save([store]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('store');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['address'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<string> {
    await this.readOne(id);

    try {
      const result = await this.storesRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Project ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('store');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }
}
