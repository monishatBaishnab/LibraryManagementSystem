import { Router } from "express";
import { MemberControllers } from "./member.controllers";
import validateRequest from "../../utils/validateRequest";
import { MemberSchemas } from "./member.schemas";

const router = Router();

// Route for get all members
router.get("/", MemberControllers.findAll);

// Route for get single member
router.get("/:id", MemberControllers.findById);

// Route for crete new member
router.post("/", validateRequest(MemberSchemas.createSchema), MemberControllers.create);

// Route for update existing member
router.put("/:id", validateRequest(MemberSchemas.updateSchema), MemberControllers.update);

// Route for delete existing member
router.delete("/:id", MemberControllers.deleteMember);

export const MemberRoutes = router;
