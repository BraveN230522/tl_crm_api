"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.validate = exports.generate = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const common_1 = require("@nestjs/common");
function generate(input, expiresIn, secret) {
    const token = {
        sub: input.userId,
        merchantId: input.merchantId,
        email: input.email,
        role: input.role,
        permissions: input.permissions,
    };
    const options = {
        expiresIn,
        issuer: 'rewardingPlatform',
        audience: 'rewardingPlatform:auth',
    };
    return jwt.sign(token, secret, options);
}
exports.generate = generate;
function validate(accessToken, secret) {
    try {
        const options = {
            algorithms: ['HS256'],
            issuer: 'rewardingPlatform',
            audience: 'rewardingPlatform:auth',
        };
        const payload = jwt.verify(accessToken, secret, options);
        return payload;
    }
    catch (e) {
        throw new common_1.UnauthorizedException();
    }
}
exports.validate = validate;
function decode(accessToken) {
    const token = jwt.decode(accessToken);
    return token;
}
exports.decode = decode;
//# sourceMappingURL=jwt.helper.js.map