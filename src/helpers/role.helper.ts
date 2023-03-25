import { Role } from '../enums';

export function isValidRole(currentUserRole: Role, targetRole: Role) {
  switch (currentUserRole) {
    case Role.ADMIN:
      return targetRole !== Role.ADMIN;
    case Role.B_MANAGER:
      return targetRole === Role.STAFF || targetRole === Role.S_MANAGER;
    case Role.S_MANAGER:
      return targetRole === Role.STAFF;
    case Role.STAFF:
      return false;
    default:
      return false;
  }
}
