import type { Router } from "vue-router";
import { useUserStore } from "@/store/modules/user";

/**是否开启登录验证 */
export function createAuthGuard(router: Router): void {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    //忽略登录
    if (to.meta.ignoreAuth) {
      next();
      return;
    }

    //检查登录是否合法
    if (userStore.valid()) {
      next();
      return;
    }

    //跳转到登录页
    next({ name: "login", query: { redirect: to.fullPath }, replace: true });
  });
}
