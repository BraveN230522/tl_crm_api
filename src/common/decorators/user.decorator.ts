import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import _ from 'lodash';
import { Member } from '../../entities/members.entity';
import { User } from '../../entities/users.entity';

// import { Admin } from '../../modules/admin/admin.entity';

export const UserDecorator = createParamDecorator((_data, ctx: ExecutionContext): User | Member => {
  const req = ctx.switchToHttp().getRequest();
  const mappingReqUser = _.omit(req.user, ['password']) as User | Member;
  return mappingReqUser;
});
