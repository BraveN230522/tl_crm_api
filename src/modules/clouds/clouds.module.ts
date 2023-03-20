import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), PassportModule],
  controllers: [CloudsController],
  providers: [CloudsService],
  exports: [CloudsService, CloudsModule],
})
export class CloudsModule {}
