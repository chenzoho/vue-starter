<template>
  <router-view v-slot="{ Component, route }">
    <!-- 动画问题:放入mode路由跳转后，页面会空白 -->
    <transition
      :name="
        getTransitionName({
          route,
          enable: getEnableTransition,
          cacheTabs: getCaches,
          name: getBasicTransition,
        })
      "
      appear
    >
      <keep-alive :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useTabsStore } from "@/store/modules/tabs";
import { getTransitionName } from "./transition";

export default defineComponent({
  name: "PageLayout",
  setup() {
    const appStore = useAppStore();
    const tabStore = useTabsStore();

    const { enable, transition } = appStore.setting.transitionSetting;

    const getEnableTransition = ref(enable);
    const getBasicTransition = ref(transition);

    const getCaches = computed((): string[] => {
      return tabStore.getCachedTabList;
    });

    return {
      getTransitionName,
      getEnableTransition,
      getBasicTransition,
      getCaches,
    };
  },
});
</script>
