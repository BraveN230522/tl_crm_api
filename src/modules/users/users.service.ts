import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID_PATTERN } from '../../constants';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {}

  async getUser(id): Promise<User> {
    // if (UUID_PATTERN.test(id)) found = await this.usersRepository.findOneBy({ inviteId: id });
    const found = await this.usersRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`User ${id} is not found`);

    return found;
  }

  async getUserByUsername({ username }): Promise<User> {
    return await this.usersRepository.findOneByRaw({ username });
  }

  async updateUser(id, updateUserDto): Promise<string> {
    const user = await this.getUser(id);
    try {
      assignIfHasKey(user, updateUserDto);

      await this.usersRepository.save([user]);

      return APP_MESSAGE.UPDATED_SUCCESSFULLY('user');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = [];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }
}
