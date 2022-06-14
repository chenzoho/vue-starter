<template>
  <el-container class="el-layout">
    <LayoutMeun />

    <el-container direction="vertical">
      <LayoutHeader />
      <LayoutTabs />
      <LayoutContent />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutMeun from "./menu/index.vue";
import LayoutHeader from "./header/index.vue";
import LayoutTabs from "./tabs/index.vue";
import LayoutContent from "./content/index.vue";

export default defineComponent({
  components: { LayoutMeun, LayoutHeader, LayoutTabs, LayoutContent },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.el-container {
  position: relative !important;
}
</style>
