import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Branch } from '../../entities/branches.entity';
import { User } from '../../entities/users.entity';
import { UserStatus } from '../../enums';
import { ErrorHelper, encryptSha256, isValidRole } from '../../helpers';
import { IPaginationResponse, ISendSMS } from '../../interfaces';
import { APP_MESSAGE } from '../../messages';
import { assignIfHasKey, matchWord } from '../../utilities';
import { BranchesService } from '../branches/branches.service';
import { Role } from './../../enums/commons';
import { EncryptHelper } from './../../helpers/encrypt.helper';
import { SmsService } from './../sms/sms.service';
import { StoresService } from './../stores/stores.service';
import {
  ChangePasswordDto,
  ConfirmForgotPasswordDto,
  CreateUserAdminDto,
  CreateUserDto,
  ForgotPasswordDto,
  GetUserDto,
  ResetPasswordDto,
  UpdateUserAdminDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private smsService: SmsService,
    private branchesService: BranchesService,
    private storesService: StoresService,
  ) {}

  async getUser(id): Promise<User> {
    // if (UUID_PATTERN.test(id)) found = await this.usersRepository.findOneBy({ inviteId: id });
    const found = await this.usersRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`User is not found`);

    return found;
  }

  async getUserByUsername({ username }): Promise<User> {
    const found = await this.usersRepository.findOneRaw(
      { username },
      { relations: ['store', 'branch'] },
    );

    return found;
  }

  async getUserByPhone({ phone }): Promise<User> {
    const found = await this.usersRepository.findOneByRaw({ phone });

    if (!found) ErrorHelper.NotFoundException(`User is not found`);

    return found;
  }

  async createUserAdmin(createUserAdminDto: CreateUserAdminDto): Promise<User> {
    const {
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      branchName,
      announcements,
      isActiveTiers,
    } = createUserAdminDto;
    const hashedPassword = await EncryptHelper.hash(password);

    const branch: Branch = await this.branchesService.createBranch({
      branchName,
      announcements,
      customerUrl: `/customer?${encryptSha256(username, username)}`,
      isActiveTiers,
    });

    try {
      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        email,
        role: Role.ADMIN,
        branch,
      });

      await this.usersRepository.save([user]);

      const mappingUser = _.pick(user, [
        'username',
        'firstName',
        'lastName',
        'phone',
        'role',
        'id',
        'branch',
      ]) as User;

      return mappingUser;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);

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

  async updateUserAdmin(
    updateUserAdminDto: UpdateUserAdminDto,
    currentUser?: User,
  ): Promise<string> {
    try {
      assignIfHasKey(currentUser, updateUserAdminDto);

      await Promise.all([
        this.usersRepository.save([currentUser]),
        this.branchesService.updateBranch(updateUserAdminDto, currentUser),
      ]);

      return APP_MESSAGE.UPDATED_SUCCESSFULLY('admin');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto, currentUserRole: Role): Promise<User> {
    const {
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      role = Role.STAFF,
      storeId,
    } = createUserDto;

    if (!isValidRole(currentUserRole, role)) {
      ErrorHelper.ForbiddenException();
    }

    const hashedPassword = await EncryptHelper.hash(password);

    const store = await this.storesService.readOne(storeId);

    try {
      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        email,
        role,
        store,
      });

      await this.usersRepository.save([user]);

      const mappingUser = _.pick(user, [
        'username',
        'firstName',
        'lastName',
        'phone',
        'role',
        'id',
        'store',
      ]) as User;

      return mappingUser;
    } catch (error) {
      console.log({ error });
      if (error.response) ErrorHelper.ConflictException(error.response);

      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone', 'username', 'email'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser?: User,
    isLogin?: boolean,
  ): Promise<string> {
    const user = await this.getUser(id);
    // Check role update: not have role greater be updating user role or not the user himself
    if (!isValidRole(currentUser?.role, user?.role) && currentUser?.id !== user.id && !isLogin) {
      ErrorHelper.ForbiddenException();
    }
    // check permission update this user role
    if (currentUser?.id === user.id && updateUserDto?.role && !isLogin) {
      ErrorHelper.ForbiddenException();
    }

    try {
      assignIfHasKey(user, updateUserDto);
      await this.usersRepository.save([user]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('user');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async toggleActivateUser(id: number, currentUser?: User, status?: UserStatus): Promise<string> {
    const user = await this.getUser(id);
    // Check role update: not have role greater be updating user role or not the user himself
    if (!isValidRole(currentUser?.role, user?.role) && currentUser.id !== user.id) {
      ErrorHelper.ForbiddenException();
    }
    // check permission update this user role
    if (currentUser.id === user.id) {
      ErrorHelper.ForbiddenException();
    }
    try {
      assignIfHasKey(user, {
        status,
      });
      await this.usersRepository.save([user]);
      return APP_MESSAGE.UPDATED_SUCCESSFULLY('user');
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail as string;
        const uniqueArr = ['phone'];
        uniqueArr.forEach((item) => {
          if (matchWord(detail, item) !== null) {
            ErrorHelper.ConflictException(`This ${item} already exists`);
          }
        });
      } else ErrorHelper.InternalServerErrorException();
    }
  }

  async deleteUser(id: number, currentUser?: User): Promise<string> {
    const user = await this.getUser(id);
    if (!isValidRole(currentUser?.role, user?.role) || currentUser.id === user.id) {
      ErrorHelper.ForbiddenException();
    }
    try {
      const result = await this.usersRepository.delete(id);

      if (result.affected === 0) ErrorHelper.NotFoundException(`User ${id} is not found`);

      return APP_MESSAGE.DELETED_SUCCESSFULLY('user');
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
  }

  async readUser(getUserDto: GetUserDto): Promise<IPaginationResponse<User>> {
    const { search, role } = getUserDto;

    try {
      const queryBuilderRepo = await this.usersRepository
        .createQueryBuilder('u')
        .where('u.role != :role', { role: Role.ADMIN })
        .orderBy('id', 'DESC');

      if (search) {
        queryBuilderRepo
          .andWhere('LOWER(u.first_name) LIKE LOWER(:search)', {
            search: `%${search}%`,
          })
          .orWhere('LOWER(u.last_name) LIKE LOWER(:search)', {
            search: `%${search}%`,
          });
      }

      if (role) {
        queryBuilderRepo.andWhere('u.role = :role', { role });
      }

      const data = await this.usersRepository.paginationQueryBuilder(queryBuilderRepo, getUserDto);

      return data;
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
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

    if (data.errorMessage) ErrorHelper.InternalServerErrorException(data.errorMessage);

    try {
      assignIfHasKey(user, { ...user, forgotPasswordOtp: code });

      await this.usersRepository.save([user]);

      return APP_MESSAGE.SEND_OTP_SUCCESSFULLY;
    } catch (error) {
      ErrorHelper.InternalServerErrorException();
    }
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
      if (error.response) ErrorHelper.BadRequestException(error.response);

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
      ErrorHelper.InternalServerErrorException();
    }
  }
}
