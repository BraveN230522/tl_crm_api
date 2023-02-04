import _ from 'lodash';
import { IPagination, ObjectAny } from '../interfaces';
export declare const assignIfHasKey: (assignedObj: ObjectAny, obj: ObjectAny) => void;
export declare const myMapOmit: <T>(data: any, toOmit: string[]) => _.Omit<any, string>[];
export declare const myMapPick: <T>(data: T[], toPick: string[]) => Partial<T>[];
export declare const numberInputs: (input: any) => {
    [key: string]: number;
};
export declare const genPagination: (page: number, perPage: number, arrayLength: number) => IPagination;
