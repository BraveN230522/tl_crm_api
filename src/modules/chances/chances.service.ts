import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Chance } from '../../entities/chances.entity';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { matchWord } from '../../utilities';
import { UsersService } from '../users/users.service';
import { ChancesRepository } from './chances.repository';
import { CreateChancesDto } from './dto/chances.dto';

@Injectable()
export class ChancesService {
  constructor(
    @InjectRepository(ChancesRepository) private chanceRepository: ChancesRepository,
    private userService: UsersService,
  ) {}

  async createChance(createChanceDto: CreateChancesDto): Promise<Chance> {
    const { name, currentProcess = 0, chanceProcesses } = createChanceDto;

    const user: User = await this.userService.getUser(createChanceDto.user);

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
}
