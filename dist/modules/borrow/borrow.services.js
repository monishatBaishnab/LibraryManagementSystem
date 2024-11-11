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
exports.BorrowServices = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
// Function for find all borrows
const findAllFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () { });
// Function for borrow book
const borrowBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check book exists or not
    const bookData = yield prismaClient_1.default.book.findUniqueOrThrow({
        where: {
            bookId: payload.bookId,
        },
    });
    if (Number(bookData === null || bookData === void 0 ? void 0 : bookData.availableCopies) < 1) {
        throw new Error("No copies available of this book");
    }
    //Check member exists or not
    yield prismaClient_1.default.member.findUniqueOrThrow({
        where: {
            memberId: payload.memberId,
        },
    });
    const createdBorrow = prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowData = yield transactionClient.borrowRecord.create({
            data: payload,
        });
        yield transactionClient.book.update({
            data: {
                availableCopies: Number(bookData.availableCopies) - 1,
            },
            where: { bookId: payload.bookId },
        });
        return borrowData;
    }));
    return createdBorrow;
});
// Function for return borrowed book
const returnBorrowedBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowData = yield prismaClient_1.default.borrowRecord.findUniqueOrThrow({
        where: {
            borrowId: payload.borrowId,
        },
    });
    const bookData = yield prismaClient_1.default.book.findUniqueOrThrow({
        where: { bookId: borrowData.bookId },
        select: { availableCopies: true, bookId: true },
    });
    const currentDate = new Date().toISOString();
    yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.borrowRecord.update({
            data: {
                returnDate: currentDate,
            },
            where: {
                borrowId: payload.borrowId,
            },
        });
        yield transactionClient.book.update({
            data: {
                availableCopies: Number(bookData.availableCopies) + 1,
            },
            where: {
                bookId: bookData.bookId,
            },
        });
    }));
});
exports.BorrowServices = {
    findAllFromDB,
    borrowBookFromDB,
    returnBorrowedBookFromDB,
};
