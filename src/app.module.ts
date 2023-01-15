import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppConfigModule } from './configuration';
import { DatabaseModule } from './database';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, AdminModule, AuthModule, DatabaseModule, AppConfigModule],
})
export class AppModule {}
