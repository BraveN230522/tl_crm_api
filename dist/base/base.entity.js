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
exports.BaseTable = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class BaseTable {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseTable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'bigint',
        default: new Date().getTime(),
        transformer: {
            to: (value) => value,
            from: (value) => parseInt(value),
        },
    }),
    __metadata("design:type", Number)
], BaseTable.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        type: 'bigint',
        default: new Date().getTime(),
        transformer: {
            to: (value) => value,
            from: (value) => parseInt(value),
        },
    }),
    __metadata("design:type", Number)
], BaseTable.prototype, "updatedAt", void 0);
exports.BaseTable = BaseTable;
//# sourceMappingURL=base.entity.js.map