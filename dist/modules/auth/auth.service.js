"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const enums_1 = require("../../enums");
const helpers_1 = require("../../helpers");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async loginUser({ username, password }) {
        const found = await this.userService.getUserByUsername({ username });
        const match = (await bcrypt_1.default.compare(password || '', (found === null || found === void 0 ? void 0 : found.password) || '')) && username === (found === null || found === void 0 ? void 0 : found.username);
        if (!match)
            helpers_1.ErrorHelper.UnauthorizedException(`Username or password is incorrect`);
        const payload = { username, role: found.role };
        const accessToken = await this.jwtService.sign(payload);
        const mappingResponse = lodash_1.default.omit(found, ['password']);
        await this.userService.updateUser(found.id, { token: accessToken });
        return Object.assign(Object.assign({}, mappingResponse), { token: 'Bearer ' + accessToken });
    }
    async validate({ username, role }) {
        switch (role) {
            case enums_1.Role.USER:
                console.log(1);
                return await this.userService.getUserByUsername({ username });
            case enums_1.Role.MEMBER:
                console.log(2);
                return await this.userService.getUserByUsername({ username });
            default:
                break;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map