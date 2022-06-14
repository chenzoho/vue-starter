<template>
  <el-aside class="el-layout-aside" :style="getWrapperStyle">
    <AppLogo></AppLogo>
    <el-scrollbar>
      <el-menu class="el-menu-vertical-demo" :default-active="activeMenu" :style="getMenuStyle" :background-color="bgColor" text-color="#fff" :collapse="settingRef.collapse" :unique-opened="settingRef.accordion">
        <template v-for="item in menus" :key="item.path">
          <SubMenu :item="item" />
        </template>
      </el-menu>
    </el-scrollbar>
    <div ref="drag" class="el-layout-aside__bar" v-if="!settingRef.fixed"></div>
  </el-aside>
</template>

<script lang="ts">
// import type { CSSProperties } from "vue";
import { computed, defineComponent, ref, reactive, unref } from "vue";
import { useDraggable, useDebounceFn } from "@vueuse/core";
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import { AppLogo } from "@/components/Application";
import { useRoute } from "vue-router";

import SubMenu from "./sub.vue";

export default defineComponent({
  components: { SubMenu, AppLogo },
  setup() {
    const appStore = useAppStore();
    const permissionStore = usePermissionStore();
    const route: any = useRoute();

    const menus = reactive(permissionStore.menus);
    const { menuSetting, theme } = appStore.setting;
    const settingRef = reactive(menuSetting);

    const themeRef = ref(theme);
    const activeMenu = computed(() => route.path);
    const bgColor = unref(themeRef) == "light" ? "#001529" : "#333";
    const defaultWidth = 200;
    const getWrapperStyle = computed(() => {
      return {
        "--el-aside-width": `${settingRef.width}px`,
        "--el-menu-width": `${settingRef.width}px`,
        "--el-aside-height": `${settingRef.showLogo ? "48px" : "0px"}`,
        "--el-aside-bg-color": bgColor,
      };
    });

    const getMenuStyle = computed(() => {
      return {
        "--el-menu-active-color": "var(--el-color-primary)",
      };
    });

    const drag = ref(null);

    // 切换菜单收缩
    const debouncedCollapse = useDebounceFn(() => {
      if (settingRef.width <= defaultWidth) {
        settingRef.collapse = true;
      } else {
        settingRef.collapse = false;
      }
    }, 200);

    // 菜单拖拽
    useDraggable(drag, {
      preventDefault: true,
      onMove(position) {
        settingRef.width = position.x;
        debouncedCollapse();
      },
      onEnd() {
        appStore.updateSettings({ menuSetting: settingRef });
      },
    });

    return {
      menus,
      getWrapperStyle,
      getMenuStyle,
      settingRef,
      themeRef,
      bgColor,
      drag,
      activeMenu,
    };
  },
});
</script>
<style lang="scss">
.el-layout-aside {
  height: 100vh;
  padding-left: 1px;
  overflow-x: hidden;
  background-color: var(--el-aside-bg-color);

  .el-scrollbar {
    height: calc(100vh - var(--el-aside-height)) !important;
    &__view {
      height: calc(100vh - var(--el-aside-height));
    }
  }

  .el-menu {
    min-height: 100%;
  }

  &__bar {
    position: absolute;
    top: 0;
    right: -2px;
    left: var(--el-aside-width);
    z-index: 200;
    width: 2px;
    height: 100%;
    cursor: col-resize;
    border-top: none;
    border-bottom: none;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-aside {
  width: auto !important;
}
</style>
