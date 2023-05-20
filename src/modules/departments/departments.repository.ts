import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Department } from '../../entities/departments.entity';

@Injectable()
export class DepartmentsRepository extends BaseRepository<Department> {
  constructor(
    @InjectRepository(Department)
    repository: Repository<Department>,
  ) {
    super(repository);
  }
}
