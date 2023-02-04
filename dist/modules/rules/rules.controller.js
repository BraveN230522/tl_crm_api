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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const enums_1 = require("../../enums");
const rules_service_1 = require("./rules.service");
let RulesController = class RulesController {
    constructor(branchesService) {
        this.branchesService = branchesService;
    }
};
RulesController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), guards_1.RolesGuard),
    (0, decorators_1.RoleDecorator)(enums_1.Role.SUPER_ADMIN),
    __metadata("design:paramtypes", [rules_service_1.RulesService])
], RulesController);
exports.RulesController = RulesController;
//# sourceMappingURL=rules.controller.js.map