"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const member_controllers_1 = require("./member.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const member_schemas_1 = require("./member.schemas");
const router = (0, express_1.Router)();
// Route for get all members
router.get("/", member_controllers_1.MemberControllers.findAll);
// Route for get single member
router.get("/:id", member_controllers_1.MemberControllers.findById);
// Route for crete new member
router.post("/", (0, validateRequest_1.default)(member_schemas_1.MemberSchemas.createSchema), member_controllers_1.MemberControllers.create);
// Route for update existing member
router.put("/:id", (0, validateRequest_1.default)(member_schemas_1.MemberSchemas.updateSchema), member_controllers_1.MemberControllers.update);
// Route for delete existing member
router.delete("/:id", member_controllers_1.MemberControllers.deleteMember);
exports.MemberRoutes = router;
