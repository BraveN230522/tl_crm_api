import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '../../common';
import { JwtStrategy } from '../../common/jwt/jwt.strategy';
import { AppConfigModule, AppConfigService } from '../../configuration';
import { BranchesModule } from '../branches/branches.module';
import { BranchesRepository } from '../branches/branches.repository';
import { BranchesService } from '../branches/branches.service';
import { SmsService } from '../sms/sms.service';
import { StoresRepository } from '../stores/stores.repository';
import { StoresService } from '../stores/stores.service';
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
    BranchesModule,
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    SmsService,
    BranchesService,
    BranchesRepository,
    StoresService,
    StoresRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
