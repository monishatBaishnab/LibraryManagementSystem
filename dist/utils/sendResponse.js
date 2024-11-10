"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { success, status, message, data }) => {
    res.status(status).send({
        success,
        status,
        message,
        data,
    });
};
exports.default = sendResponse;
