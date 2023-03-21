import { Module } from '@nestjs/common';
import { PassportModule } from '../../common';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  imports: [PassportModule],
  controllers: [CloudsController],
  providers: [CloudsService],
  exports: [CloudsService, CloudsModule],
})
export class CloudsModule {}
