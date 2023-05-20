import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from '../../helpers';
import { IPaginationResponse } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { CreateDepartmentDto, GetFilterDepartmentsDto, UpdateDepartmentDto } from './dto/departments.dto';
import { Department } from '../../entities/departments.entity';
import { DepartmentsRepository } from './departments.repository';


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

  async readList(
    filter: GetFilterDepartmentsDto,
  ): Promise<IPaginationResponse<Department[]>> {
    const { search } = filter;
    const query = this.departmentsRepository
      .createQueryBuilder('classifications')
      .orderBy('id', 'DESC');
    if (search) {
      query.andWhere('LOWER(classifications.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }
    const departments = this.departmentsRepository.paginationQueryBuilder(query, filter);
    return departments;
  }

  async create({ name, desc }: CreateDepartmentDto): Promise<Department> {
    const classification = this.departmentsRepository.create({
      name,
      desc,
    });
    await this.departmentsRepository.save([classification]);
    return classification;
  }

  async update(id: string, updateClassificationDto: UpdateDepartmentDto): Promise<string> {
    const department = await this.readOne(id);

    try {
      assignIfHasKey(department, updateClassificationDto);
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
      ErrorHelper.NotFoundException(`This classification with ID: \'${id}'\ was not found`);
    } else {
      return APP_MESSAGE.DELETED_SUCCESSFULLY('classification');
    }
  }
}
