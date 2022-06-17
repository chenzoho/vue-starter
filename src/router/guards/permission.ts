import type { Router } from "vue-router";
import { usePermissionStore } from "@/store/modules/permission";

/**是否开启权限验证 */
export function createPermissionGuard(router: Router): void {
	router.beforeEach(async (to, from, next) => {
		const permissionStore = usePermissionStore();
		const { getIsDynamicAddedRoute } = permissionStore;
		if (!getIsDynamicAddedRoute) {
			// 获取权限
			const routes = await permissionStore.generateRoutes();

			// router.getRoutes().forEach((e) => console.log(e));
			routes.forEach(e => {
				router.addRoute(e);
			});
			// router.getRoutes().forEach((e) => console.log(e));
			next();
			return;
		}

		//是否启用
		if (to.meta.enable) {
			next();
			return;
		}

		//跳转到异常页面
		next({ name: "redirect", query: { redirect: to.fullPath }, replace: false });
	});
}
