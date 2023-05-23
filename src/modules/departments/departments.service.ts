import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Department } from '../../entities/departments.entity';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { DepartmentsRepository } from './departments.repository';
import {
  CreateDepartmentDto,
  GetFilterDepartmentsDto,
  UpdateDepartmentDto,
} from './dto/departments.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentsRepository)
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async readOne(id): Promise<Department> {
    const found = await this.departmentsRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`Department is not found`);

    return found;
  }

  async readList(filter: GetFilterDepartmentsDto): Promise<any> {
    const { search } = filter;
    const query = this.departmentsRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.users', 'departmentUsers')
      .orderBy('department.id', 'DESC');
    if (search) {
      query.andWhere('LOWER(department.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }
    const departments: any = await this.departmentsRepository.paginationQueryBuilder(query, filter);

    // console.log(departments);

    const data = _.map(departments?.items, (campaign: any) => {
      const { users, ...newData } = campaign;
      return {
        ...newData,
        totalUsers: users?.length,
      };
    });
    // return departments;

    return { ...departments, items: data };
  }

  async create({ name, desc }: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentsRepository.create({
      name,
      desc,
    });
    await this.departmentsRepository.save([department]);
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<string> {
    const department = await this.readOne(id);

    try {
      assignIfHasKey(department, updateDepartmentDto);
      await this.departmentsRepository.save([department]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('department');
    } catch (error) {
      console.log({ error });
      ErrorHelper.InternalServerErrorException();
    }
  }

  async delete(id: number): Promise<string> {
    const result = await this.departmentsRepository.delete(id);

    if (result.affected === 0) {
      ErrorHelper.NotFoundException(`This department with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('department');
    }
  }
}
