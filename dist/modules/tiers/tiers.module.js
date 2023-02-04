"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const tiers_entity_1 = require("../../entities/tiers.entity");
const tiers_controller_1 = require("./tiers.controller");
const tiers_repository_1 = require("./tiers.repository");
const tiers_service_1 = require("./tiers.service");
let TiersModule = class TiersModule {
};
TiersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tiers_entity_1.Tier]), common_2.PassportModule],
        controllers: [tiers_controller_1.TiersController],
        providers: [tiers_service_1.TiersService, tiers_repository_1.TiersRepository],
    })
], TiersModule);
exports.TiersModule = TiersModule;
//# sourceMappingURL=tiers.module.js.map