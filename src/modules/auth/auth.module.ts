import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '../../common';
import { JwtStrategy } from '../../common/jwt/jwt.strategy';
import { AppConfigModule, AppConfigService } from '../../configuration';
import { SmsService } from '../sms/sms.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { SmsModule } from './../sms/sms.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
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
    SmsModule,
  ],
  providers: [AuthService, UsersService, JwtStrategy, SmsService],
  controllers: [AuthController],
})
export class AuthModule {}
