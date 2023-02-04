import { Role } from '../enums';
export declare function generate(input: createToken, expiresIn: string, secret: string): string;
export declare function validate(accessToken: string, secret: string): JWT;
export declare function decode(accessToken: string): JWT;
export type JWT = {
    sub: string;
    email: string;
    merchantId: string;
    role: Role;
    permissions: string[];
};
export type createToken = {
    userId: string;
    email: string;
    merchantId: string;
    role: Role;
    permissions: string[];
};
