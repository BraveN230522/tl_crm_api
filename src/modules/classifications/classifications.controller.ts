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
import { Classification } from '../../entities/classifications.entity';
import { IPaginationResponse } from '../../interfaces';
import { ClassificationsService } from './classifications.service';
import {
  CreateClassificationDto,
  GetFilterClassificationsDto,
  UpdateClassificationDto,
} from './dto/classifications.dto';

@Controller('classifications')
@UseGuards(AuthGuard(), RolesGuard)
export class ClassificationsController {
  constructor(private classificationsService: ClassificationsService) {}

  @Post()
  create(@Body() createClassificationDto: CreateClassificationDto): Promise<Classification> {
    return this.classificationsService.create(createClassificationDto);
  }

  @Get()
  readList(
    @Query() getFilterClassifications: GetFilterClassificationsDto,
  ): Promise<IPaginationResponse<Classification[]>> {
    return this.classificationsService.readList(getFilterClassifications);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Classification> {
    return this.classificationsService.readOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateClassificationDto: UpdateClassificationDto,
  ): Promise<string> {
    return this.classificationsService.update(id, updateClassificationDto);
  }

  @Delete('/:id')
  deleteClassificationById(@Param('id') id: number): Promise<string> {
    return this.classificationsService.delete(id);
  }
}
