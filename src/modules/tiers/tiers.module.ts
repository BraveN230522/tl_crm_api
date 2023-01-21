import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Tier } from '../../entities/tiers.entity';
import { TiersController } from './tiers.controller';
import { TiersRepository } from './tiers.repository';
import { TiersService } from './tiers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tier]), PassportModule],
  controllers: [TiersController],
  providers: [TiersService, TiersRepository],
})
export class TiersModule {}
