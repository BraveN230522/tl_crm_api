import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { ISendSMS } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { EncryptHelper } from './../../helpers/encrypt.helper';
import { SmsService } from './../sms/sms.service';
import {
  ChangePasswordDto,
  ConfirmForgotPasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private smsService: SmsService,
  ) {}

  async getUser(id): Promise<User> {
    // if (UUID_PATTERN.test(id)) found = await this.usersRepository.findOneBy({ inviteId: id });
    const found = await this.usersRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`User is not found`);

    return found;
  }

  async getUserByUsername({ username }): Promise<User> {
    const found = await this.usersRepository.findOneByRaw({ username });

    if (!found) ErrorHelper.NotFoundException(`User is not found`);

    return found;
  }

  async getUserByPhone({ phone }): Promise<User> {
    const found = await this.usersRepository.findOneByRaw({ phone });

    if (!found) ErrorHelper.NotFoundException(`User is not found`);

    return found;
  }

  async createUser(createUserDto): Promise<any> {
    const { username, password, firstName, lastName, phone } = createUserDto;

    const hashedPassword = await EncryptHelper.hash(password);

    try {
      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: Role.USER,
      });
      await this.usersRepository.save([user]);
      // const mappingUser = _.omit(user, ['projects']);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone', 'username'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async updateUser(id, updateUserDto): Promise<string> {
    const user = await this.getUser(id);
    try {
      assignIfHasKey(user, updateUserDto);

      await this.usersRepository.save([user]);

      return APP_MESSAGE.UPDATED_SUCCESSFULLY('user');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone', 'username'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, currentUser: User): Promise<string> {
    const { newPassword } = changePasswordDto;
    const hashedPassword = await EncryptHelper.hash(newPassword);

    try {
      assignIfHasKey(currentUser, {
        ...currentUser,
        password: hashedPassword,
        updatedAt: new Date().getTime(),
      });

      await this.usersRepository.save([currentUser]);

      return APP_MESSAGE.UPDATED_SUCCESSFULLY('password');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { phone } = forgotPasswordDto;
    const user = await this.getUserByPhone({ phone });
    const { data, code } = (await this.smsService.sendSms(phone)) as ISendSMS;
    return '';
    // if (data.errorMessage) ErrorHelper.InternalServerErrorException(data.errorMessage);

    // try {
    //   assignIfHasKey(user, { ...user, forgotPasswordOtp: code });

    //   await this.usersRepository.save([user]);

    //   return APP_MESSAGE.SEND_OTP_SUCCESSFULLY;
    // } catch (error) {
    //   ErrorHelper.InternalServerErrorException();
    // }
  }

  async confirmForgotPasswordOtp(
    confirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ): Promise<string> {
    const { code, phone } = confirmForgotPasswordDto;
    const user = await this.getUserByPhone({ phone });

    try {
      if (code === user.forgotPasswordOtp) {
        assignIfHasKey(user, { ...user, isForgotPassword: true });

        await this.usersRepository.save([user]);

        return APP_MESSAGE.CONFIRM_OTP_SUCCESSFULLY;
      } else {
        ErrorHelper.BadRequestException('Your OTP is invalid');
      }
    } catch (error) {
      if (error.response) ErrorHelper.InternalServerErrorException(error.response);

      ErrorHelper.InternalServerErrorException();
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { newPassword, phone } = resetPasswordDto;

    const user = await this.getUserByPhone({ phone });

    if (!user.isForgotPassword) ErrorHelper.BadRequestException('Failed to reset password');

    const hashedPassword = await EncryptHelper.hash(newPassword);

    try {
      assignIfHasKey(user, {
        ...user,
        password: hashedPassword,
        isForgotPassword: false,
        updatedAt: new Date().getTime(),
      });

      await this.usersRepository.save([user]);

      return APP_MESSAGE.UPDATED_SUCCESSFULLY('password');
    } catch (error) {
      if (error.response) ErrorHelper.InternalServerErrorException(error.response);

      ErrorHelper.InternalServerErrorException();
    }
  }
}
