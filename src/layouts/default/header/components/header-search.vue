<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon="search" @click.stop="showSearch" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="搜索.."
      :style="{
        width: width,
      }"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocation } from "vue-router";

export default defineComponent({
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      options: [] as any,
      searchPool: [],
      show: false,
      fuse: undefined,
      init: false,
      width: "0px",
    };
  },
  computed: {},
  watch: {
    show(value) {
      if (value) {
        this.width = "210px";
        document.body.addEventListener("click", this.close);
      } else {
        this.width = "0px";
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  methods: {
    showSearch() {
      this.show = !this.show;
      const res: any = this.$refs.headerSearchSelect;
      if (this.show) {
        res && res.focus();
      }
    },
    close() {
      const res: any = this.$refs.headerSearchSelect;
      res && res.blur();
      this.show = false;
      this.options = [];
    },
    change(val: RouteLocation) {
      this.$router.push(val.path);
      this.search = "";
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    },
    querySearch(query: any) {
      console.log(query);
      this.options = [];
    },
  },
});
</script>

<style lang="scss">
.header-search {
  .search-icon {
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }

  .header-search-select {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
    vertical-align: middle;
    background: transparent;
    border-radius: 0;
    transition: width 0.2s;

    ::v-deep .el-input__inner {
      padding-right: 0;
      padding-left: 0;
      vertical-align: middle;
      border: 0;
      border-bottom: 1px solid #d9d9d9;
      border-radius: 0;
      box-shadow: none !important;
    }
  }
}
</style>
