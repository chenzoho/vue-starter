import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes";

const routes: Array<RouteRecordRaw> = [];

basicRoutes.forEach((e) => {
  routes.push(e);
});

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
// export function resetRouter(): void {
//   router.getRoutes().forEach((route) => {
//     const { name } = route;
//     if (name && !WHITE_NAME_LIST.includes(name as string)) {
//       router.hasRoute(name) && router.removeRoute(name);
//     }
//   });
// }

export default router;
