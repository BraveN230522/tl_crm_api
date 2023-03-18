import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import _ from 'lodash';
import { Customer } from '../../entities/customers.entity';
import { User } from '../../entities/users.entity';

// import { Admin } from '../../modules/admin/admin.entity';

export const UserDecorator = createParamDecorator<User>(
  (_data, ctx: ExecutionContext): User | Customer => {
    const req = ctx.switchToHttp().getRequest();
    // const mappingReqUser = _.omit(req.user, ['password']) as User | Customer;
    return req.user as User;
  },
);
