import { Router } from "express";
import { MemberRoutes } from "../modules/member/member.routes";
import { BookRoutes } from "../modules/book/book.routes";
import { BorrowRoutes, ReturnRoutes } from "../modules/borrow/borrow.routes";

const routes = [
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRoutes,
  },
  {
    path: "/return",
    route: ReturnRoutes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => router.use(path, route));

export const appRoutes = router;
