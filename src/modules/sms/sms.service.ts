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
import { assignIfHasKey, matchWord } from '../../utilities';

// import { ChangePasswordDto } from './dto/sms.dto';

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

@Injectable()
export class SmsService {
  constructor() {}

  async sendSms(phone): Promise<any> {
    return client.messages
      .create({ body: 'Hello brave nha', from: '+19205451426', to: '+84866081099' })
      .then((message) => {
        console.log(message);
      });
  }
}
