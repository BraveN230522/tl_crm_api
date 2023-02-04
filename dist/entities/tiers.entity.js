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
exports.Tier = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const enums_1 = require("../enums");
const tiers_1 = require("../enums/tiers");
const stores_entity_1 = require("./stores.entity");
let Tier = class Tier extends base_1.BaseTable {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tier.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tier.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tier.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tier.prototype, "gap", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tier_rate',
    }),
    __metadata("design:type", String)
], Tier.prototype, "tierRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dob_tier_rate',
    }),
    __metadata("design:type", Number)
], Tier.prototype, "dobTierRate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stores_entity_1.Store, (store) => store.tiers, { onDelete: 'CASCADE' }),
    __metadata("design:type", stores_entity_1.Store)
], Tier.prototype, "store", void 0);
Tier = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Tier);
exports.Tier = Tier;
//# sourceMappingURL=tiers.entity.js.map