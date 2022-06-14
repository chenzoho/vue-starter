import { computed } from "vue";

import { useAppStore } from "@/store/modules/app";

export function useSetting(): any {
  const appStore = useAppStore();

  /**是否开启动画 */
  const getTransitionSettingEnable = computed(() => appStore.setting.transitionSetting.enable);
  /**动画名称 */
  const getTransitionSettingName = computed(() => appStore.setting.transitionSetting.transition);
  /**是否开启全局加载 */
  const getTransitionSettingLoding = computed(() => appStore.setting.transitionSetting.loading);
  /**是否开启全局进度 */
  const getTransitionSettingProcess = computed(() => appStore.setting.transitionSetting.progress);
  /**更新全局加载 */
  function updateLoading(loading: boolean) {
    appStore.updateLoading(loading);
  }

  return {
    getTransitionSettingEnable,
    getTransitionSettingName,
    getTransitionSettingLoding,
    getTransitionSettingProcess,
    updateLoading,
  };
}
