import type { Router } from "vue-router";
import nProgress from "nprogress";

/**是否开启全局进度 */
export function createProgressGuard(router: Router): void {
	router.beforeEach(async to => {
		if (to.meta.loaded) {
			return true;
		}
		nProgress.start();
		return true;
	});

	router.afterEach(async () => {
		nProgress.done();
		return true;
	});
}
