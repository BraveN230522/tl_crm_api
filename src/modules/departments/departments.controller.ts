import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { IPaginationResponse } from '../../interfaces';
import { CreateDepartmentDto, GetFilterDepartmentsDto, UpdateDepartmentDto } from './dto/departments.dto';
import { Department } from '../../entities/departments.entity';
import { DepartmentsService } from './departments.service';

@Controller('departments')
@UseGuards(AuthGuard(), RolesGuard)
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  readList(
    @Query() getFilterDepartments: GetFilterDepartmentsDto,
  ): Promise<IPaginationResponse<Department[]>> {
    return this.departmentsService.readList(getFilterDepartments);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Department> {
    return this.departmentsService.readOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<string> {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete('/:id')
  deleteDepartmentById(@Param('id') id: number): Promise<string> {
    return this.departmentsService.delete(id);
  }
}
