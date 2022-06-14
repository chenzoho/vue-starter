<template>
  <svg-icon class="screenfull-svg" :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import screenfull from "screenfull";

export default defineComponent({
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    click() {
      const that: any = this;
      if (!screenfull.isEnabled) {
        that.$message.warning("you browser can not work");
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.screenfull-svg {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 20px;
  vertical-align: 10px;
  cursor: pointer;
  fill: #5a5e66;
}
</style>
