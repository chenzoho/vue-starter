import type { Router } from "vue-router";
import nProgress from "nprogress";
import { unref } from "vue";
import { useSetting } from "@/hooks/use-setting";

/**是否开启全局进度 */
export function createProgressGuard(router: Router): void {
  const { getTransitionSettingProcess } = useSetting();
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    unref(getTransitionSettingProcess) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getTransitionSettingProcess) && nProgress.done();
    return true;
  });
}
