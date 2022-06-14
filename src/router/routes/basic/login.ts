import type { RouteRecordRaw } from "vue-router";

const loginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/layouts/default/login/index.vue"),
};

export default loginRoute;
