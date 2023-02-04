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
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const branches_entity_1 = require("./branches.entity");
const members_entity_1 = require("./members.entity");
const rules_entity_1 = require("./rules.entity");
const tiers_entity_1 = require("./tiers.entity");
let Store = class Store extends base_1.BaseTable {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_type',
    }),
    __metadata("design:type", String)
], Store.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'store_image',
    }),
    __metadata("design:type", String)
], Store.prototype, "storeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'privacy_policy',
    }),
    __metadata("design:type", String)
], Store.prototype, "privacyPolicy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => branches_entity_1.Branch, (branch) => branch.stores, { onDelete: 'CASCADE' }),
    __metadata("design:type", branches_entity_1.Branch)
], Store.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rules_entity_1.Rule, (rule) => rule.store),
    __metadata("design:type", Array)
], Store.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tiers_entity_1.Tier, (tier) => tier.store),
    __metadata("design:type", Array)
], Store.prototype, "tiers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => members_entity_1.Member, (member) => member.id, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'member_store',
        joinColumn: { name: 'storeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'memberId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Store.prototype, "members", void 0);
Store = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Store);
exports.Store = Store;
//# sourceMappingURL=stores.entity.js.map