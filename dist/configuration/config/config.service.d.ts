import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: NestConfigService);
    get baseUrlPrefix(): string;
    get accessTokenSecret(): string;
    get accessTokenExpires(): string;
    get accessTokenRememberMe(): string;
    get temporaryTokenSecret(): string;
    get temporaryTokenExpires(): string;
}
