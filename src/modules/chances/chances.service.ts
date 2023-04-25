import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Chance } from '../../entities/chances.entity';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper, isValidRole } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey } from '../../utilities';
import { UsersService } from '../users/users.service';
import { ChancesRepository } from './chances.repository';
import { CreateChancesDto, GetChancesDto, UpdateChanceDto } from './dto/chances.dto';

@Injectable()
export class ChancesService {
  constructor(
    @InjectRepository(ChancesRepository) private chanceRepository: ChancesRepository,
    private userService: UsersService,
  ) {}

  async getChance(id): Promise<Chance> {
    const found = await this.chanceRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`Chance is not found`);

    return found;
  }

  async createChance(createChanceDto: CreateChancesDto, currentUser?: User): Promise<Chance> {
    const { name, currentProcess = 0, chanceProcesses } = createChanceDto;

    const creator: User = await this.userService.getUser(createChanceDto.creator);

    const user = currentUser.role === Role.STAFF ? currentUser : creator;

    try {
      const chance = this.chanceRepository.create({
        name,
        currentProcess,
        user,
        chanceProcesses,
      });

      await this.chanceRepository.save([chance]);

      const mappingUser = _.pick(chance, [
        'name',
        'currentProcess',
        'user',
        'chanceProcesses',
      ]) as Chance;

      return mappingUser;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);
      else ErrorHelper.InternalServerErrorException();
    }
  }

  async updateChance(
    id: number,
    updateChanceDto: UpdateChanceDto,
    currentUser?: User,
  ): Promise<string> {
    const chance = await this.getChance(id);
    const createChanceUser: User = await this.userService.getUser(chance.user); // nhan vien tao chance
    if (
      !isValidRole(currentUser?.role, createChanceUser?.role) &&
      currentUser.id !== chance?.user?.id
    ) {
      ErrorHelper.ForbiddenException();
    }
    // check permission update this user role
    if (currentUser.id === chance?.user?.id && updateChanceDto?.creator) {
      ErrorHelper.ForbiddenException();
    }
    try {
      assignIfHasKey(chance, { ...updateChanceDto, user: createChanceUser });
      await this.chanceRepository.save([chance]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('chance');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }

  async deleteChance(id: number, currentUser?: User): Promise<string> {
    const chance = await this.getChance(id);
    const createChanceUser: User = await this.userService.getUser(chance.user); // nhan vien tao chance
    if (!isValidRole(currentUser?.role, createChanceUser?.role)) {
      ErrorHelper.ForbiddenException();
    }
    try {
      const result = await this.chanceRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`Chance ${id} is not found`);
      return APP_MESSAGE.DELETED_SUCCESSFULLY('chance');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }

  async getChanceList(getChancesDto: GetChancesDto): Promise<IPaginationResponse<Chance>> {
    const { search } = getChancesDto;
    try {
      const queryBuilderRepo = await this.chanceRepository
        .createQueryBuilder('chance')
        .orderBy('id', 'DESC');

      if (search) {
        queryBuilderRepo.where('LOWER(chance.name) LIKE LOWER(:search)', {
          search: `%${search.trim()}%`,
        });
      }

      const data = await this.chanceRepository.paginationQueryBuilder(
        queryBuilderRepo,
        getChancesDto,
      );

      return data;
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }
}
