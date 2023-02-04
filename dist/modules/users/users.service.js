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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const helpers_1 = require("../../helpers");
const messages_1 = require("../../messages");
const utilities_1 = require("../../utilities");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUser(id) {
        const found = await this.usersRepository.findOneBy({ id });
        if (!found)
            helpers_1.ErrorHelper.NotFoundException(`User ${id} is not found`);
        return found;
    }
    async getUserByUsername({ username }) {
        return await this.usersRepository.findOneByRaw({ username });
    }
    async createUser(createUserDto) {
        console.log({ createUserDto });
        const { username, password, firstName, lastName, phone } = createUserDto;
        try {
            const user = this.usersRepository.create({
                username,
                password,
                firstName,
                lastName,
                phone,
                role: enums_1.Role.USER,
            });
            await this.usersRepository.save([user]);
            return user;
        }
        catch (error) {
            if (error.code === '23505') {
                const detail = error.detail;
                const uniqueArr = ['phone', 'username'];
                uniqueArr.forEach((item) => {
                    if ((0, utilities_1.matchWord)(detail, item) !== null) {
                        helpers_1.ErrorHelper.ConflictException(`This ${item} already exists`);
                    }
                });
            }
            else
                helpers_1.ErrorHelper.InternalServerErrorException();
        }
    }
    async updateUser(id, updateUserDto) {
        const user = await this.getUser(id);
        try {
            (0, utilities_1.assignIfHasKey)(user, updateUserDto);
            await this.usersRepository.save([user]);
            return messages_1.APP_MESSAGE.UPDATED_SUCCESSFULLY('user');
        }
        catch (error) {
            if (error.code === '23505') {
                const detail = error.detail;
                const uniqueArr = ['phone', 'username'];
                uniqueArr.forEach((item) => {
                    if ((0, utilities_1.matchWord)(detail, item) !== null) {
                        helpers_1.ErrorHelper.ConflictException(`This ${item} already exists`);
                    }
                });
            }
            else
                helpers_1.ErrorHelper.InternalServerErrorException();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_repository_1.UsersRepository)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map