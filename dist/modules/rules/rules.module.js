"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const rules_entity_1 = require("../../entities/rules.entity");
const rules_controller_1 = require("./rules.controller");
const rules_repository_1 = require("./rules.repository");
const rules_service_1 = require("./rules.service");
let RulesModule = class RulesModule {
};
RulesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rules_entity_1.Rule]), common_2.PassportModule],
        controllers: [rules_controller_1.RulesController],
        providers: [rules_service_1.RulesService, rules_repository_1.RulesRepository],
    })
], RulesModule);
exports.RulesModule = RulesModule;
//# sourceMappingURL=rules.module.js.map