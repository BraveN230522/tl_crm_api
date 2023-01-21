import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { Store } from '../../entities/stores.entity';
import { BranchesController } from './branches.controller';
import { BranchesRepository } from './branches.repository';
import { BranchesService } from './branches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Branch]), PassportModule],
  controllers: [BranchesController],
  providers: [BranchesService, BranchesRepository],
})
export class BranchesModule {}
