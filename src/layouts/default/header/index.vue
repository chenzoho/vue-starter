<template>
  <div :class="elClass" :style="getWrapperStyle">
    <HeaderTrigger></HeaderTrigger>
    <BreadCrumb></BreadCrumb>
    <div class="left-wrap">
      <HeaderSearch></HeaderSearch>
      <Screenfull></Screenfull>
      <Theme></Theme>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderTrigger from "./components/trigger.vue";
import Screenfull from "./components/screen-full.vue";
import BreadCrumb from "./components/bread-crumb.vue";
import Avatar from "./components/avatar.vue";
import Theme from "./components/theme.vue";
import HeaderSearch from "./components/header-search.vue";
import { useAppStore } from "@/store/modules/app";
import { useNamespace } from "@/hooks/use-namespace";

export default defineComponent({
  name: "LayoutHeader",
  components: { HeaderTrigger, BreadCrumb, HeaderSearch, Screenfull, Theme, Avatar },
  data() {
    return {
      levelList: [],
    };
  },
  setup() {
    const appStore = useAppStore();
    const ns = useNamespace("layout-header");
    const elClass = computed(() => [ns.b(), appStore.setting.theme]);

    const getWrapperStyle = computed(() => {
      return {
        "--el-header-bg-color": "#fff",
        "--el-header-height": `48px`,
      };
    });
    return { elClass, getWrapperStyle };
  },
});
</script>
<style lang="scss">
@use "@/styles/mixins/bem.scss" as *;

@include b("layout-header") {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0;
  line-height: 48px;
  color: var(--el-text-color-primary);
  background-color: var(--el-header-bg-color);

  &.light {
    border-bottom: 1px solid var(--el-border-color-light);
  }
  .left-wrap {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}
</style>
