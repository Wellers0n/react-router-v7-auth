import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/dashboard/page.tsx"),
  route("/login", "pages/login/page.tsx"),
  route("/logout", "pages/logout/page.tsx"),
] satisfies RouteConfig;
