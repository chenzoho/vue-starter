<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocation } from "vue-router";
import { compile } from "path-to-regexp";

export default defineComponent({
  name: "BreadCrumb",
  data() {
    return {
      levelList: [],
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: "/home", meta: { title: "桌面" } }].concat(matched);
      }
      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    isDashboard(route: RouteLocation) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name;
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = compile(path);
      return toPath(params);
    },
    handleLink(item: RouteLocation) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
});
</script>
