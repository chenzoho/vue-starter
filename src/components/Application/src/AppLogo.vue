<template>
  <div :class="elClass">
    <img :class="imageClass" src="@/assets/images/logo.png" />
    <div v-if="!showTitle" :class="titleClass">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useNamespace } from "@/hooks/use-namespace";

export default defineComponent({
  setup() {
    const ns = useNamespace("app-logo");
    const appStore = useAppStore();
    const title = appStore.getSetting.metaSetting.title;
    const showTitle = computed(() => appStore.setting.menuSetting.collapse || false);
    const elClass = computed(() => [ns.b()]);
    const imageClass = computed(() => [ns.e("image")]);
    const titleClass = computed(() => [ns.e("title"), ns.is("visiable", !showTitle.value)]);

    return {
      title,
      showTitle,
      elClass,
      imageClass,
      titleClass,
    };
  },
});
</script>

<style lang="scss">
@use "../../../styles/mixins/bem.scss" as *;
@include b("app-logo") {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 8px 4px 8px 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  @include e("image") {
    width: 32px;
    height: 32px;
  }

  @include e("title") {
    margin-left: 8px;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    color: #fff;
    opacity: 0;
    transition: all 0.5s;

    @include when("visiable") {
      opacity: 1;
    }
  }
}
</style>
