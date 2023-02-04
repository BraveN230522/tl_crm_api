export declare class EncryptHelper {
    static hash(str: any, saltRounds?: number): Promise<any>;
    static compare(str: any, hash: any): any;
}
