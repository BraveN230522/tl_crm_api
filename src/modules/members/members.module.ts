import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Member } from '../../entities/members.entity';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { MembersService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), PassportModule],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
})
export class MembersModule {}
