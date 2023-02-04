"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPagination = exports.numberInputs = exports.myMapPick = exports.myMapOmit = exports.assignIfHasKey = void 0;
const lodash_1 = __importDefault(require("lodash"));
const assignIfHasKey = (assignedObj, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        if (key)
            assignedObj[key] = value;
    });
};
exports.assignIfHasKey = assignIfHasKey;
const myMapOmit = (data, toOmit) => {
    return lodash_1.default.compact(lodash_1.default.map(data, (item) => (item ? lodash_1.default.omit(item, toOmit) : null)));
};
exports.myMapOmit = myMapOmit;
const myMapPick = (data, toPick) => {
    return lodash_1.default.compact(lodash_1.default.map(data, (item) => (item ? lodash_1.default.pick(item, toPick) : null)));
};
exports.myMapPick = myMapPick;
const numberInputs = (input) => Object.keys(input).reduce((acc, val) => {
    acc[val] = +input[val];
    return acc;
}, {});
exports.numberInputs = numberInputs;
const genPagination = (page, perPage, arrayLength) => {
    return {
        page: page,
        perPage: perPage,
        totalPages: Math.ceil(arrayLength / perPage),
        totalItems: arrayLength,
    };
};
exports.genPagination = genPagination;
//# sourceMappingURL=mapping.js.map