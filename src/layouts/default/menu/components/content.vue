<template>
  <template v-if="!isLast">
    <template v-if="!isExist">
      <router-link :to="resolvePath(item.path)">
        <el-icon>
          <Menu />
        </el-icon>
        {{ item.name }}
      </router-link>
    </template>
    <template v-else>
      <a target="_blank" rel="noopener" :href="resolvePath(item.path)">
        <el-icon>
          <Menu />
        </el-icon>
        {{ item.name }}
      </a>
    </template>
  </template>
  <template v-else>
    <el-icon>
      <Menu />
    </el-icon>
    <template v-if="!showTitle">{{ item.name }}</template>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { itemProps } from "./props";
import { isExternal } from "@/utils/validate";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import path from "path-browserify";
export default defineComponent({
  name: "SubMenuContent",
  props: itemProps,
  data() {
    return {
      basePath: "#",
    };
  },
  setup(props) {
    const basePath = "";
    const app = useAppStore();
    const getIcon = computed(() => props.item?.icon);
    const isLast = computed(() => props.item.children?.length);
    const isExist = computed(() => isExternal(props.item.path));
    const isCurrent = computed(() => props.item.path === useRoute().path);
    const showTitle = computed(() => app.setting.menuSetting.collapse || false);
    function resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return path.resolve(basePath, routePath);
    }
    return { getIcon, isLast, isExist, isCurrent, showTitle, resolvePath };
  },
});
</script>

<style lang="scss" scoped>
a {
  color: #fff;
  cursor: pointer;
}
</style>
