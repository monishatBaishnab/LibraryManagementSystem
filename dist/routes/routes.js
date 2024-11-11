"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const member_routes_1 = require("../modules/member/member.routes");
const book_routes_1 = require("../modules/book/book.routes");
const routes = [
    {
        path: "/members",
        route: member_routes_1.MemberRoutes,
    }, {
        path: "/books",
        route: book_routes_1.BookRoutes,
    },
];
const router = (0, express_1.Router)();
routes.forEach(({ path, route }) => router.use(path, route));
exports.appRoutes = router;
