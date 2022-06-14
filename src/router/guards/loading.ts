import type { Router } from "vue-router";
import { unref } from "vue";
import { useSetting } from "@/hooks/use-setting";

/**是否开启全局加载 */
export function createLoadingGuard(router: Router): void {
  const { getTransitionSettingLoding, updateLoading } = useSetting();
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    if (unref(getTransitionSettingLoding)) {
      updateLoading(true);
      return true;
    }
    return true;
  });

  router.afterEach(async () => {
    if (unref(getTransitionSettingLoding)) {
      setTimeout(() => {
        updateLoading(false);
      }, 220);
    }
    return true;
  });
}
