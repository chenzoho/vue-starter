<template>
  <el-menu-item :index="item.path">
    <SubMenuContent v-bind="$props" :item="item" />
  </el-menu-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { itemProps } from "./props";
import SubMenuContent from "./content.vue";

export default defineComponent({
  name: "SubMenuItem",
  components: { SubMenuContent },
  props: itemProps,
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.el-menu-item.is-active {
  background: #409eff !important;
}
</style>
