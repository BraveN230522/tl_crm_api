"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL_UPLOAD_IMAGE_CK = exports.INVESTOR_EXCEL_NAME = exports.PAGE_NO_LIMIT = exports.SOFT_FIELD = exports.SOFT_TYPE = exports.OFFSET = exports.PAGE = exports.LIMIT = exports.PAGE_LIMIT = exports.UUID_PATTERN = exports.DATE_PATTERN = exports.EMAIL_PATTERN = exports.SPEC_KEY = exports.PHONE_PATTEN = exports.PASSWORD_PATTERN = void 0;
exports.PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
exports.PHONE_PATTEN = /(([+][[]?[0-9]{1,3}[]]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})/;
exports.SPEC_KEY = 'SPEC';
exports.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.DATE_PATTERN = /(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
exports.UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
exports.PAGE_LIMIT = 10;
exports.LIMIT = 10;
exports.PAGE = 1;
exports.OFFSET = 0;
exports.SOFT_TYPE = 'DESC';
exports.SOFT_FIELD = 'updated_at';
exports.PAGE_NO_LIMIT = {
    page: 1,
    perPage: 0,
};
exports.INVESTOR_EXCEL_NAME = 'investors.xlsx';
exports.URL_UPLOAD_IMAGE_CK = '/api/clouds/upload-image-ckeditor';
//# sourceMappingURL=base.constant.js.map