import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User])],
  exports: [AdminRepository],
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
})
export class AdminModule {}
