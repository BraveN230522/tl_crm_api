import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { ErrorHelper } from '../../helpers';
import { matchWord } from '../../utilities';
import { Branch } from './../../entities/branches.entity';
import { BranchesRepository } from './branches.repository';
import { CreateBranchDto } from './dto/branches.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchesRepository) private branchesRepository: BranchesRepository,
  ) {}

  async createBranch(createBranchDto: CreateBranchDto, user: User): Promise<Branch> {
    const { branchName, announcements, memberUrl, isActiveTiers } = createBranchDto;

    try {
      const branch = this.branchesRepository.create({
        name: branchName,
        announcements,
        memberUrl,
        isActiveTiers,
        user,
      });

      await this.branchesRepository.save([branch]);
      return branch;
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['name', 'memberUrl'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This branch ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }
}
