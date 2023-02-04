"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const members_entity_1 = require("../../entities/members.entity");
const rules_entity_1 = require("../../entities/rules.entity");
const stores_entity_1 = require("../../entities/stores.entity");
const tiers_entity_1 = require("../../entities/tiers.entity");
const stores_controller_1 = require("./stores.controller");
const stores_repository_1 = require("./stores.repository");
const stores_service_1 = require("./stores.service");
let StoresModule = class StoresModule {
};
StoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stores_entity_1.Store, rules_entity_1.Rule, tiers_entity_1.Tier, members_entity_1.Member]), common_2.PassportModule],
        controllers: [stores_controller_1.StoresController],
        providers: [stores_service_1.StoresService, stores_repository_1.StoresRepository],
    })
], StoresModule);
exports.StoresModule = StoresModule;
//# sourceMappingURL=stores.module.js.map