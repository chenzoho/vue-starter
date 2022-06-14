<template>
  <SubMenuItem v-if="!isMenu" :item="item" />
  <el-sub-menu v-if="isMenu" :index="item.path">
    <template #title>
      <SubMenuContent :item="item" />
    </template>
    <template v-for="childrenItem in item?.children || []" :key="childrenItem.path">
      <SubMenu :item="childrenItem" />
    </template>
  </el-sub-menu>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import SubMenuItem from "./item.vue";
import SubMenuContent from "./content.vue";

import { itemProps } from "./props";

export default defineComponent({
  name: "SubMenu",
  components: { SubMenuItem, SubMenuContent },
  props: itemProps,
  setup(props) {
    const isMenu = computed(() => props.item?.children?.length && props.item?.children?.length > 0);

    return {
      isMenu,
    };
  },
});
</script>
