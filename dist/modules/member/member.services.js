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
exports.MemberServices = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
// Function for fetch all members data from database
const findAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prismaClient_1.default.member.findMany();
    return members;
});
// Function for fetch single member data from db using member id
const findByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prismaClient_1.default.member.findUniqueOrThrow({
        where: { memberId: id },
    });
    return members;
});
// Function for create new member in database
const createIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdMember = yield prismaClient_1.default.member.create({
        data: payload,
    });
    return createdMember;
});
// Function for update existing member information
const updateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check member is exists or not. if not the throw an error.
    yield prismaClient_1.default.member.findUniqueOrThrow({
        where: {
            memberId: id,
        },
    });
    const updatedMember = yield prismaClient_1.default.member.update({
        data: payload,
        where: { memberId: id },
    });
    return updatedMember;
});
// Function for delete member information
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check member is exists or not. if not the throw an error.
    yield prismaClient_1.default.member.findUniqueOrThrow({
        where: {
            memberId: id,
        },
    });
    yield prismaClient_1.default.member.delete({
        where: { memberId: id },
    });
});
exports.MemberServices = {
    findAllFromDB,
    findByIdFromDB,
    createIntoDB,
    updateFromDB,
    deleteFromDB,
};
