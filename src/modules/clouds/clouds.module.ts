import { Module } from '@nestjs/common';
import { PassportModule } from '../../common';
import { HttpModule } from '../../common/http/http.module';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [CloudsController],
  providers: [CloudsService],
  exports: [CloudsService, CloudsModule],
})
export class CloudsModule {}
