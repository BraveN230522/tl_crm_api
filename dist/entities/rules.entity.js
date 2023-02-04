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
exports.Rule = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const stores_entity_1 = require("./stores.entity");
let Rule = class Rule extends base_1.BaseTable {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rule.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'start_time',
    }),
    __metadata("design:type", String)
], Rule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'store_image',
    }),
    __metadata("design:type", String)
], Rule.prototype, "storeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'privacy_policy',
    }),
    __metadata("design:type", String)
], Rule.prototype, "privacyPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rule_rate',
    }),
    __metadata("design:type", Number)
], Rule.prototype, "ruleRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dob_rule_rate',
    }),
    __metadata("design:type", Number)
], Rule.prototype, "dobRuleRate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stores_entity_1.Store, (store) => store.rules, { onDelete: 'CASCADE' }),
    __metadata("design:type", stores_entity_1.Store)
], Rule.prototype, "store", void 0);
Rule = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Rule);
exports.Rule = Rule;
//# sourceMappingURL=rules.entity.js.map