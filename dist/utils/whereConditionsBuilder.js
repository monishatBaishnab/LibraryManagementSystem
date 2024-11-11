"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeFilters_1 = __importDefault(require("./sanitizeFilters"));
const whereConditionsBuilder = (query, searchFields, filterKeys) => {
    const { searchTerm } = query;
    const filters = (0, sanitizeFilters_1.default)(query, filterKeys);
    const whereConditions = [];
    if (searchTerm) {
        whereConditions.push({
            OR: searchFields.map((field) => ({
                [field]: { contains: searchTerm, mode: "insensitive" },
            })),
        });
    }
    if (filters) {
        whereConditions.push({
            AND: Object.keys(filters).map((key) => ({
                [key]: { equals: filters[key] },
            })),
        });
    }
    return whereConditions;
};
exports.default = whereConditionsBuilder;
