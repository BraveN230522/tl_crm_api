import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

export interface ISendSMS {
  data: MessageInstance;
  code: string;
}
