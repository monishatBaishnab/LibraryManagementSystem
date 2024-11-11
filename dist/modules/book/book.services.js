"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const calculatePaginate_1 = __importDefault(require("../../utils/calculatePaginate"));
const whereConditionsBuilder_1 = __importDefault(require("../../utils/whereConditionsBuilder"));
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const book_constants_1 = require("./book.constants");
// Function for find all books
const findAllFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, sortBy, sortOrder } = (0, calculatePaginate_1.default)(query);
    const whereConditions = (0, whereConditionsBuilder_1.default)(query, book_constants_1.bookSearchFields, book_constants_1.bookFilterKeys);
    const books = yield prismaClient_1.default.book.findMany({
        where: {
            AND: whereConditions,
        },
        skip: skip,
        take: limit,
        orderBy: { [sortBy !== null && sortBy !== void 0 ? sortBy : 'title']: sortOrder },
    });
    return books;
});
// Function for find unique book using book id
const findByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prismaClient_1.default.book.findUnique({
        where: { bookId: id },
    });
    return book;
});
// Function for create new book
const createIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield prismaClient_1.default.book.create({
        data: payload,
    });
    return createdBook;
});
// Function for update existing book
const updateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check book is exists or not. if not the throw an error.
    yield prismaClient_1.default.book.findUniqueOrThrow({
        where: {
            bookId: id,
        },
    });
    const updatedBook = yield prismaClient_1.default.book.update({
        data: payload,
        where: { bookId: id },
    });
    return updatedBook;
});
// Function for delete existing book
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check book is exists or not. if not the throw an error.
    yield prismaClient_1.default.book.findUniqueOrThrow({
        where: {
            bookId: id,
        },
    });
    yield prismaClient_1.default.book.delete({
        where: { bookId: id },
    });
});
exports.BookServices = {
    findAllFromDB,
    findByIdFromDB,
    createIntoDB,
    updateFromDB,
    deleteFromDB,
};
