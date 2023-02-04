"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        baseUrlPrefix: '/api',
    },
    accessToken: {
        expiresIn: '365d',
        rememberMeIn: '365d',
        secret: 'superSecretKey',
    },
    refreshToken: {
        expiresIn: '1d',
    },
    temporaryToken: {
        expiresIn: '7d',
        secret: 'superTemporarySecretKey',
    },
});
//# sourceMappingURL=dev.js.map