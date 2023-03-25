import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Classification } from '../../entities/classifications.entity';
import { ClassificationsController } from './classifications.controller';
import { ClassificationsRepository } from './classifications.repository';
import { ClassificationsService } from './classifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classification]), PassportModule],
  controllers: [ClassificationsController],
  providers: [ClassificationsService, ClassificationsRepository],
})
export class ClassificationsModule {}
