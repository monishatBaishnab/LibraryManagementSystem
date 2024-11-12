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
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const http_status_1 = __importDefault(require("http-status"));
// Function for find all borrows
const findOverDueBorrowsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const overDueBorrows = yield prismaClient_1.default.borrowRecord.findMany({
        where: {
            OR: [
                {
                    returnDate: {
                        gt: prismaClient_1.default.borrowRecord.fields.dueDate,
                    },
                },
                {
                    AND: [
                        { returnDate: null },
                        {
                            dueDate: {
                                lt: new Date().toISOString(),
                            },
                        },
                    ],
                },
            ],
        },
        select: {
            borrowId: true,
            returnDate: true,
            dueDate: true,
            book: { select: { title: true } },
            member: { select: { name: true } },
        },
    });
    const filteredOverdueBorrows = overDueBorrows === null || overDueBorrows === void 0 ? void 0 : overDueBorrows.map((borrow) => {
        let overdueTimes = 0;
        const dueDate = new Date(borrow.dueDate);
        // Set overdue days
        if (borrow.returnDate) {
            const returnDate = new Date(borrow.returnDate);
            overdueTimes = returnDate.getTime() - dueDate.getTime();
        }
        else {
            const returnDate = new Date();
            overdueTimes = returnDate.getTime() - dueDate.getTime();
        }
        return {
            borrowId: borrow.borrowId,
            bookTitle: borrow.book.title,
            borrowerName: borrow.member.name,
            overdueDays: Math.floor(overdueTimes / (1000 * 3600 * 24)),
        };
    });
    return filteredOverdueBorrows;
});
// Function for borrow book
const borrowBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check book exists or not
    const bookData = yield prismaClient_1.default.book.findUniqueOrThrow({
        where: {
            bookId: payload.bookId,
        },
    });
    if (Number(bookData === null || bookData === void 0 ? void 0 : bookData.availableCopies) < 1) {
        throw new HttpError_1.default(http_status_1.default.CONFLICT, "No copies available of this book");
    }
    //Check member exists or not
    yield prismaClient_1.default.member.findUniqueOrThrow({
        where: {
            memberId: payload.memberId,
        },
    });
    // Create due date after next 14 days
    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const borrowData = Object.assign(Object.assign({}, payload), { dueDate: (payload === null || payload === void 0 ? void 0 : payload.dueDate) ? payload === null || payload === void 0 ? void 0 : payload.dueDate : dueDate });
    // implement prisma transaction for borrow book
    const createdBorrow = prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // create borrow
        const borrow = yield transactionClient.borrowRecord.create({
            data: borrowData,
        });
        // Update the available quantity of this book
        yield transactionClient.book.update({
            data: {
                availableCopies: Number(bookData.availableCopies) - 1,
            },
            where: { bookId: payload.bookId },
        });
        return {
            borrowId: borrow.borrowId,
            bookId: borrow.bookId,
            memberId: borrow.memberId,
            borrowDate: borrow.borrowDate,
        };
    }));
    return createdBorrow;
});
// Function for return borrowed book
const returnBorrowedBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check borrow exists or not
    const borrowData = yield prismaClient_1.default.borrowRecord.findUniqueOrThrow({
        where: {
            borrowId: payload.borrowId,
        },
    });
    if (borrowData.returnDate !== null) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Book already returned.");
    }
    // Check book exists or not
    const bookData = yield prismaClient_1.default.book.findUniqueOrThrow({
        where: { bookId: borrowData.bookId },
        select: { availableCopies: true, bookId: true },
    });
    // create current date for provide return date
    // Date.now() + 16 * 24 * 60 * 60 * 1000 for after 16 days
    const currentDate = new Date().toISOString();
    // Implement prisma transaction for return borrowed book
    yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Update borrow data
        yield transactionClient.borrowRecord.update({
            data: {
                returnDate: currentDate,
            },
            where: {
                borrowId: payload.borrowId,
            },
        });
        // Update the available quantity of this book
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
    findOverDueBorrowsFromDB,
    borrowBookFromDB,
    returnBorrowedBookFromDB,
};
