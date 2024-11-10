"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    const success = false;
    const status = (err === null || err === void 0 ? void 0 : err.httpStatus) || http_status_1.default.BAD_REQUEST;
    const message = (err === null || err === void 0 ? void 0 : err.name) || "Something want wrong.";
    res.status(status).send({
        success,
        status,
        message,
    });
};
exports.default = globalErrorHandler;