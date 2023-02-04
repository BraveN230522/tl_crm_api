import * as jwt from 'jsonwebtoken';
export declare class TokenHelper {
    static generate(payload: Record<string, any>, secret: string, expiresIn: string): {
        token: string;
        expires: number;
    };
    static verify<T>(token: string, secret: string, opts?: jwt.VerifyOptions): T;
}
