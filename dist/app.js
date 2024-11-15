"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorhandler_1 = __importDefault(require("./utils/globalErrorhandler"));
const notFoundHandler_1 = __importDefault(require("./utils/notFoundHandler"));
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["*"],
}));
app.use((0, cookie_parser_1.default)());
// Route for check server health
app.get("/", (req, res, next) => {
    res.status(http_status_1.default.OK).send({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Library Management System running smoothly...",
    });
});
// Call the app routes
app.use("/api", routes_1.appRoutes);
// Path Error Handler
app.use("*", notFoundHandler_1.default);
// Global Error Handler
app.use(globalErrorhandler_1.default);
exports.default = app;
