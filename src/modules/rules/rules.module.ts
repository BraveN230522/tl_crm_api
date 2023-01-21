import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Rule } from '../../entities/rules.entity';
import { RulesController } from './rules.controller';
import { RulesRepository } from './rules.repository';
import { RulesService } from './rules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), PassportModule],
  controllers: [RulesController],
  providers: [RulesService, RulesRepository],
})
export class RulesModule {}
