import type { Router } from "vue-router";
import { useAppStore } from "@/store/modules/app";

/**是否开启全局加载 */
export function createLoadingGuard(router: Router): void {
	const appStore = useAppStore();
	router.beforeEach(async to => {
		if (to.meta.loaded) {
			return true;
		}
		appStore.updateLoading(true);
		return true;
	});

	router.afterEach(async () => {
		appStore.updateLoading(false);
		return true;
	});
}
