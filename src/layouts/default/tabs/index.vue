<template>
  <div :class="elClass">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.fullPath"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        @contextmenu.prevent="openMenu(this, tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!tag.meta.affix" @click.prevent.stop="closeSelectedTag(tag)"
          ><el-icon><CloseBold /></el-icon
        ></span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: fixLeft + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <!-- <li v-if="!(selectedTag.meta && selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li> -->
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useNamespace } from "@/hooks/use-namespace";
import router from "@/router";
import { usePermissionStore } from "@/store/modules/permission";
import { useTagViewStore } from "@/store/modules/tagsView";
import path from "path-browserify";
import { computed, defineComponent, nextTick } from "vue";
import { RouteLocation, RouteRecordRaw, useRoute } from "vue-router";
import ScrollPane from "./ScrollPane.vue";
export default defineComponent({
  name: "LayoutTabs",
  components: {
    ScrollPane,
  },
  data() {
    return {
      visible: false,
      top: 0,
      fixLeft: 0,
      affixTags: [],
      selectedTag: {
        path: "",
        fullPath: "",
        query: {},
        hash: "",
        name: "",
        params: {},
        redirectedFrom: undefined,
        meta: {},
        matched: [],
      },
    };
  },
  setup() {
    const tag = useTagViewStore();
    const permission = usePermissionStore();
    const proxy: any = useRoute();
    const ns = useNamespace("layout-tabs");
    const elClass = computed(() => [ns.b()]);
    const visitedViews = computed(() => tag.visitedViews);
    const routes = computed(() => permission.routers);
    function isActive(route: RouteLocation) {
      return route.path === proxy.path;
    }
    return {
      visitedViews,
      elClass,
      routes,
      isActive,
    };
  },
  mounted() {
    this.initTags();
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  methods: {
    filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
      var tags = [] as any[];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      var affixTags = (affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          useTagViewStore().addVisitedView(tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      // if (this.$route.path === "/order/info") {
      //   // 先删除路由再添加路由
      //   useTagViewStore().delView(this.$route);
      //   this.$route.meta.title = "订单详情" + this.$route.query.code;
      // }
      // if (this.$route.path === "/order/delivery/info") {
      //   this.$route.meta.title = "发货单详情" + this.$route.query.code;
      // }
      // if (this.$route.path === "/goods/create" && this.$route.query.spuCode) {
      //   this.$route.meta.title = "编辑商品";
      // }
      if (name) {
        useTagViewStore().addView(this.$route);
      }
      return false;
    },
    openMenu(el: any, route: RouteLocation, e: MouseEvent) {
      const menuMinWidth = 83;
      const offsetLeft = el.$el.getBoundingClientRect().left;
      const offsetWidth = el.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 15;
      if (left > maxLeft) {
        this.fixLeft = maxLeft;
      } else {
        this.fixLeft = left;
      }
      this.top = e.clientY;
      this.visible = true;
      Object.assign(this.selectedTag, route);
    },
    // 刷新
    refreshSelectedTag(view: RouteLocation) {
      useTagViewStore()
        .delCachedView(view)
        .then(() => {
          const { fullPath } = view;
          nextTick(() => {
            router.replace({
              path: "" + fullPath,
            });
          });
          this.visible = false;
        });
    },
    moveToCurrentTag() {
      const tags: any = this.$refs.tag;
      const scroll: any = this.$refs.scrollPane;
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            scroll.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              useTagViewStore().updateVisitedView(this.$route);
            }
            break;
          }
        }
      });
    },
    // 关闭当前选中的标签
    closeSelectedTag(view: RouteLocation) {
      useTagViewStore()
        .delView(view)
        .then((res: any) => {
          if (this.isActive(view)) {
            this.toLastView(res, view);
          }
        });
    },
    // 关闭其他
    closeOthersTags() {
      router.push(this.selectedTag);
      useTagViewStore()
        .delOthersViews(this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
      this.visible = false;
    },
    // 关闭全部
    closeAllTags(view: RouteLocation) {
      useTagViewStore()
        .delAllViews()
        .then((res: any) => {
          if (this.affixTags.some((tag: any) => tag.path === view.path)) {
            return;
          }
          this.toLastView(res, view);
        });
      this.visible = false;
    },
    toLastView(visitedViews: RouteLocation[], view: RouteLocation) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Home") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    closeMenu() {
      this.visible = false;
    },
  },
});
</script>
<style lang="scss">
@use "@/styles/mixins/bem.scss" as *;

@include b("layout-tabs") {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      text-align: center;
      vertical-align: 2px;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &::before {
        display: inline-block;
        vertical-align: -3px;
        transform: scale(0.6);
      }
      &:hover {
        color: #fff;
        background-color: #b4bccc;
      }
    }
  }
}
a {
  text-decoration: none;
}
</style>
<style lang="scss" scoped>
.el-layout-tabs {
  .tags-view-wrapper {
    .tags-view-item {
      position: relative;
      display: inline-block;
      height: 26px;
      padding: 0 8px;
      margin-top: 4px;
      margin-left: 5px;
      font-size: 12px;
      line-height: 26px;
      color: #495060;
      cursor: pointer;
      background: #fff;
      border: 1px solid #d8dce5;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #1890ff;
        background-color: #e8f4ff;
        border-color: #e8f4ff;
        &::before {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 2px;
          content: "";
          background: #1890ff;
          border-radius: 50%;
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    list-style-type: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
