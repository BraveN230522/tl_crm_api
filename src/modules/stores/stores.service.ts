import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../../entities/stores.entity';
import { User } from '../../entities/users.entity';
import { CreateStoreDto } from './dto/stores.dto';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(StoresRepository) private usersRepository: StoresRepository) {}

  async createUser(createStoreDto: CreateStoreDto, currentUser: User): Promise<any> {
    return;
    // if (UUID_PATTERN.test(id)) found = await this.usersRepository.findOneBy({ inviteId: id });
    // const found = await this.usersRepository.findOneBy({ id });

    // if (!found) ErrorHelper.NotFoundException(`User is not found`);

    // return found;
  }
}
