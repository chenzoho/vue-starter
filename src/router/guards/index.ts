import type { Router } from "vue-router";
import { createProgressGuard } from "./progress";
import { createLoadingGuard } from "./loading";
import { createPermissionGuard } from "./permission";

/**是否开启权限验证 */
export function createGuard(router: Router): void {
  createPermissionGuard(router);
  createProgressGuard(router);
  createLoadingGuard(router);
}
