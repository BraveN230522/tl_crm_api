import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Chance } from '../../entities/chances.entity';
import { ChancesController } from './chances.controller';
import { ChancesRepository } from './chances.repository';
import { ChancesService } from './chances.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chance]), PassportModule],
  controllers: [ChancesController],
  providers: [ChancesService, ChancesRepository],
})
export class ChancesModule {}
