"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dev_1 = __importDefault(require("../dev"));
const envSchema_1 = require("../envSchema");
const config_service_1 = require("./config.service");
const NestConfigModule = config_1.ConfigModule.forRoot({
    load: [dev_1.default],
    isGlobal: true,
    validationSchema: envSchema_1.envSchema,
});
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [NestConfigModule],
        providers: [config_service_1.AppConfigService],
        exports: [config_service_1.AppConfigService],
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=config.module.js.map