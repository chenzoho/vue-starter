<template>
  <div>
    <PageLayout></PageLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageLayout from "../page/index.vue";

export default defineComponent({
  name: "LayoutContent",
  components: { PageLayout },
  setup() {
    return {};
  },
});
</script>
