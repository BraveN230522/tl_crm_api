import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '../../common';
import { Branch } from '../../entities/branches.entity';
import { User } from '../../entities/users.entity';
import { SmsService } from './sms.service';

@Module({
  imports: [PassportModule],
  providers: [SmsService],
})
export class SmsModule {}
