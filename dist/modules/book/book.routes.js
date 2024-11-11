"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const book_controllers_1 = require("./book.controllers");
const book_schemas_1 = require("./book.schemas");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const router = (0, express_1.Router)();
// Route for get all books
router.get("/", book_controllers_1.BookControllers.findAll);
// Route for get unique book by id
router.get("/:id", book_controllers_1.BookControllers.findById);
// Route for create new book
router.post("/", (0, validateRequest_1.default)(book_schemas_1.BookSchemas.creteSchema), book_controllers_1.BookControllers.create);
// Route for update existing product
router.put("/:id", (0, validateRequest_1.default)(book_schemas_1.BookSchemas.updateSchema), book_controllers_1.BookControllers.update);
// Route for delete existing book
router.delete("/:id", book_controllers_1.BookControllers.deleteById);
exports.BookRoutes = router;
