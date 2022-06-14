<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
    <slot />
  </el-scrollbar>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNamespace } from "@/hooks/use-namespace";
import { RouteLocation } from "vue-router";
const tagAndTagSpacing = 4; // tagAndTagSpacing
export default defineComponent({
  name: "ScrollPane",
  setup() {
    const ns = useNamespace("scroll-pane");
    const elClass = computed(() => [ns.b()]);
    return { elClass };
  },
  computed: {
    scrollWrapper() {
      const res: any = this.$refs.scrollContainer;
      return res.$refs.wrap$;
    },
  },
  methods: {
    moveToTarget(currentTag: RouteLocation) {
      const el: any = this.$refs.scrollContainer;
      const $container: any = el.$el;
      const $containerWidth = $container.offsetWidth; //1711
      const $scrollWrapper = this.scrollWrapper;
      const parent: any = this.$parent;
      const tagList: any = parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  :deep(el-scrollbar__bar) {
    bottom: 0;
  }
  :deep(el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
