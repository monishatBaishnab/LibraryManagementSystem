import { Router } from "express";
import { MemberRoutes } from "../modules/member/member.routes";
import { BookRoutes } from "../modules/book/book.routes";

const routes = [
  {
    path: "/members",
    route: MemberRoutes,
  },{
    path: "/books",
    route: BookRoutes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => router.use(path, route));

export const appRoutes = router;
