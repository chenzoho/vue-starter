import type { RouteRecordRaw } from "vue-router";
import LAYOUT from "@/layouts/default/index.vue";
import { REDIRECT_NAME } from "@/router/constant";

const redirectRoute: RouteRecordRaw = {
  path: "/redirect",
  component: LAYOUT,
  name: "RedirectTo",
  meta: {
    menu: false,
    tag: false,
    cache: false,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("@/layouts/default/redirect/index.vue"),
      meta: {
        menu: false,
        tag: false,
        cache: false,
      },
    },
  ],
};

export default redirectRoute;
