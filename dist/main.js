"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app_module_1 = require("./app.module");
const common_2 = require("./common");
const transform_interceptor_1 = require("./common/transformers/transform.interceptor");
const configuration_1 = require("./configuration");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const upload = (0, multer_1.default)();
    const configService = app.get(config_1.ConfigService);
    const appConfigService = app.get(configuration_1.AppConfigService);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static('public'));
    app.use(upload.single('undefined'));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new common_2.HttpExceptionFilter());
    app.setGlobalPrefix(appConfigService.baseUrlPrefix);
    await app.listen(configService.get('SERVER_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map