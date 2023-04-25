import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { UpdateUserAdminDto, UpdateUserDto } from '../users/dto/users.dto';
import { Branch } from './../../entities/branches.entity';
import { BranchesRepository } from './branches.repository';
import { CreateBranchDto } from './dto/branches.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchesRepository) private branchesRepository: BranchesRepository,
  ) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    const { branchName, announcements, customerUrl, isActiveTiers } = createBranchDto;
    try {
      const branch = this.branchesRepository.create({
        name: branchName,
        announcements,
        customerUrl,
        isActiveTiers,
      });
      await this.branchesRepository.save([branch]);
      return branch;
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['name', 'customerUrl'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This branch ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async updateBranch(updateUserAdminDto: UpdateUserAdminDto, currentUser?: User): Promise<void> {
    try {
      const branch = currentUser.branch;
      assignIfHasKey(branch, updateUserAdminDto);
      await this.branchesRepository.save([{ ...branch, name: updateUserAdminDto.branchName }]);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }
}
