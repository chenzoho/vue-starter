<template>
  <span :class="[elClass, theme]" @click="toggleCollapsed">
    <el-icon v-if="!collapse">
      <fold />
    </el-icon>
    <el-icon v-else>
      <expand />
    </el-icon>
  </span>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useNamespace } from "@/hooks/use-namespace";

export default defineComponent({
  name: "HeaderTrigger",
  setup() {
    const appStore = useAppStore();
    const ns = useNamespace("header-trigger");
    const elClass = computed(() => [ns.b()]);
    const theme = ref(appStore.setting.theme);
    const menuSetting = reactive(appStore.setting.menuSetting);
    const collapse = computed(() => menuSetting.collapse);
    function toggleCollapsed() {
      menuSetting.collapse = !menuSetting.collapse;
      appStore.updateSettings({
        menuSetting: menuSetting,
      });
    }
    return {
      elClass,
      theme,
      collapse,
      toggleCollapsed,
    };
  },
});
</script>

<style lang="scss">
@use "@/styles/mixins/bem.scss" as *;

@include b("header-trigger") {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1px 10px 0;
  color: #000;
  cursor: pointer;
}
</style>
