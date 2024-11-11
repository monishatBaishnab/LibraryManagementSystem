"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeQueries = (object, keys) => {
    const finalObject = {};
    keys.forEach((key) => {
        if (object && Object.hasOwnProperty.call(object, key)) {
            finalObject[key] = object[key];
        }
    });
    return finalObject;
};
exports.default = sanitizeQueries;
