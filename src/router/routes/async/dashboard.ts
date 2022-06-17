import type { RouteRecordRaw } from "vue-router";

import LAYOUT from "@/layouts/default/index.vue";

const dashboard: RouteRecordRaw = {
  path: "/dashboard",
  name: "桌面",
  component: LAYOUT,
  redirect: "/dashboard/analysis",
  meta: {
    code: "001",
  },
  children: [
    {
      path: "analysis",
      name: "Analysis",
      component: () => import("@/views/dashboard/analysis/index.vue"),
      meta: {
        transitionName: "fade-slide",
        code: "001001",
      },
    },
    {
      path: "workbench",
      name: "Workbench",
      component: () => import("@/views/dashboard/workbench/index.vue"),
      meta: {
        transitionName: "fade-slide",
        code: "001002",
      },
    },
  ],
};

export default dashboard;
