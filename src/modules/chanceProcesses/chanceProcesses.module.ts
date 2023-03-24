import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { ChanceProcess } from '../../entities/chanceProcesses.entity';
import { ChanceProcessesController } from './chanceProcesses.controller';
import { ChanceProcessesRepository } from './chanceProcesses.repository';
import { ChanceProcessesService } from './chanceProcesses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChanceProcess]), PassportModule],
  controllers: [ChanceProcessesController],
  providers: [ChanceProcessesService, ChanceProcessesRepository],
})
export class ChanceProcessesModule {}
