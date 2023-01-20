import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '../../common';
import { JwtStrategy } from '../../common/jwt/jwt.strategy';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfigModule, AppConfigService } from '../../configuration';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // secret: 'top',
      // signOptions: {
      //   expiresIn: 3600,
      // },
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.accessTokenSecret,
        signOptions: {
          expiresIn: configService.accessTokenExpires,
        },
      }),
      inject: [AppConfigService],
    }),
    // TypeOrmModule.forFeature([UsersRepository, AdminRepository]),
    UsersModule,
    AdminModule,
  ],
  providers: [AuthService, UsersService, AdminService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
