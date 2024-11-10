import { Router } from "express";
import { MemberRoutes } from "../modules/member/member.routes";

const routes = [
  {
    path: "/members",
    route: MemberRoutes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => router.use(path, route));

export const appRoutes = router;
