"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const branches_entity_1 = require("../../entities/branches.entity");
const stores_entity_1 = require("../../entities/stores.entity");
const branches_controller_1 = require("./branches.controller");
const branches_repository_1 = require("./branches.repository");
const branches_service_1 = require("./branches.service");
let BranchesModule = class BranchesModule {
};
BranchesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stores_entity_1.Store, branches_entity_1.Branch]), common_2.PassportModule],
        controllers: [branches_controller_1.BranchesController],
        providers: [branches_service_1.BranchesService, branches_repository_1.BranchesRepository],
    })
], BranchesModule);
exports.BranchesModule = BranchesModule;
//# sourceMappingURL=branches.module.js.map