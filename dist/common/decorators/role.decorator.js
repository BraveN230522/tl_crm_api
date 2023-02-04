"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDecorator = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = __importDefault(require("lodash"));
exports.ROLES_KEY = 'roles';
const RoleDecorator = (...roles) => {
    const mappingRoles = lodash_1.default.flatMap(roles);
    return (0, common_1.SetMetadata)(exports.ROLES_KEY, mappingRoles);
};
exports.RoleDecorator = RoleDecorator;
//# sourceMappingURL=role.decorator.js.map