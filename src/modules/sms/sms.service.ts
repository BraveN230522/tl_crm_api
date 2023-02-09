import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import twilio from 'twilio';
import { UUID_PATTERN } from '../../constants';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ACCOUNT_SID, AUTH_TOKEN } from '../../environments';
import { ErrorHelper } from '../../helpers';
import { EncryptHelper } from '../../helpers/encrypt.helper';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, getRandom4DigitsCode, matchWord } from '../../utilities';

// import { ChangePasswordDto } from './dto/sms.dto';

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

@Injectable()
export class SmsService {
  constructor() {}

  async sendSms(phone): Promise<any> {
    try {
      const random4DigitsCode = getRandom4DigitsCode();
      const twilioData = await client.messages.create({
        body: 'Your OTP code is ' + random4DigitsCode,
        from: '+19205451426',
        to: '+84' + phone,
      });
      return {
        data: twilioData,
        code: random4DigitsCode,
      };
    } catch (error) {
      ErrorHelper.InternalServerErrorException(error.response);

      ErrorHelper.InternalServerErrorException();
    }
  }
}
