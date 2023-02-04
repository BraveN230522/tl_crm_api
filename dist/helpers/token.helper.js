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
exports.TokenHelper = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const error_helper_1 = require("./error.helper");
class TokenHelper {
    static generate(payload, secret, expiresIn) {
        const token = jwt.sign(payload, secret, {
            expiresIn,
        });
        const decoded = jwt.decode(token);
        return {
            token,
            expires: decoded.iat,
        };
    }
    static verify(token, secret, opts) {
        try {
            const options = Object.assign(Object.assign({}, opts), { algorithms: ['HS256'] });
            const payload = jwt.verify(token, secret, options);
            return payload;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError')
                error_helper_1.ErrorHelper.UnauthorizedException('Access token expired');
            if (error.name === 'JsonWebTokenError')
                error_helper_1.ErrorHelper.UnauthorizedException('Access token not valid');
            throw error;
        }
    }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=token.helper.js.map