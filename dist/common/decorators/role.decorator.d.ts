import { Role } from '../../enums';
export declare const ROLES_KEY = "roles";
export declare const RoleDecorator: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
