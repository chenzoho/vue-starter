<template>
  <svg-icon class="theme-svg" icon="theme" @click="drawer = true" />
  <el-drawer v-model="drawer" title="主题配置" size="15%">
    <div class="one-type">
      <label>布局</label>
      <div class="value">
        <el-select v-model="layout" class="m-2" placeholder="Select">
          <el-option v-for="item in optionsLayout" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="one-type">
      <label>主题</label>
      <div class="value">
        <el-select v-model="theme" class="m-2" placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Theme",
  setup() {
    const drawer = ref(false);
    const theme = ref("");
    const layout = ref("");
    const options = [
      {
        value: "蓝黑",
        label: "蓝黑",
      },
      {
        value: "紫白",
        label: "紫白",
      },
      {
        value: "绿白",
        label: "绿白",
      },
      {
        value: "红黑",
        label: "红黑",
      },
    ];
    const optionsLayout = [
      {
        value: "常规",
        label: "常规",
      },
      {
        value: "分栏",
        label: "分栏",
      },
      {
        value: "纵向",
        label: "纵向",
      },
      {
        value: "横向",
        label: "横向",
      },
    ];
    return {
      drawer,
      theme,
      layout,
      options,
      optionsLayout,
    };
  },
});
</script>
<style lang="scss" scoped>
.theme-svg {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 20px;
  vertical-align: 10px;
  cursor: pointer;
  fill: #5a5e66;
}
.one-type {
  display: flex;
  align-items: center;
  .value {
    width: 50%;
    margin-left: auto;
  }
}
</style>
<style lang="scss">
.el-drawer .el-drawer__header {
  margin-bottom: 0 !important;
}
</style>
