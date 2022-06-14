import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { tagViewState } from "./types";
import { RouteLocation } from "vue-router";

export const useTagViewStore = defineStore({
  id: "tagView",
  state: (): tagViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    getTagView(): RouteLocation[] {
      return this.visitedViews;
    },
  },
  actions: {
    ADD_VISITED_VIEW: (state: tagViewState, view: RouteLocation) => {
      // todo 多级路由支持
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || view.name || "no-name",
        })
      );
    },
    ADD_CACHED_VIEW: (state: tagViewState, view: RouteLocation) => {
      if (state.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEW: (state: tagViewState, view: RouteLocation) => {
      for (const [i, v] of state.visitedViews.entries()) {
        // let qstr = "";
        // if (view.meta && view.meta.multi) {
        //   qstr = qs.stringify(view.query, { indices: false });
        // }
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW: (state: tagViewState, view: RouteLocation) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VISITED_VIEWS: (state: tagViewState, view: RouteLocation) => {
      state.visitedViews = state.visitedViews.filter((v) => {
        console.log(5555, v);
        return v.meta.affix || v.path === view.path;
      });
      console.log(state.visitedViews);
    },
    DEL_OTHERS_CACHED_VIEWS: (state: tagViewState, view: RouteLocation) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, index + 1);
          break;
        }
      }
    },
    DEL_ALL_VISITED_VIEWS: (state: tagViewState) => {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_CACHED_VIEWS: (state: tagViewState) => {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW: (state: tagViewState, view: RouteLocation) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    clear() {
      this.visitedViews = [];
      this.cachedViews = [];
    },
    addView(view: RouteLocation) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: RouteLocation) {
      // commit("ADD_VISITED_VIEW", view);
      this.ADD_VISITED_VIEW(this.$state, view);
    },
    addCachedView(view: RouteLocation) {
      // commit("ADD_CACHED_VIEW", view);
      this.ADD_CACHED_VIEW(this.$state, view);
    },
    delView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        // const res = {
        //   visitedViews: ,
        //   cachedViews: [...this.$state.cachedViews],
        // };
        resolve([...this.$state.visitedViews]);
      });
    },
    delVisitedView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.DEL_VISITED_VIEW(this.$state, view);
        resolve([...this.$state.visitedViews]);
      });
    },
    delCachedView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.DEL_CACHED_VIEW(this.$state, view);
        resolve([...this.$state.cachedViews]);
      });
    },
    delOthersViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.$state.visitedViews],
          cachedViews: [...this.$state.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.DEL_OTHERS_VISITED_VIEWS(this.$state, view);
        resolve([...this.$state.visitedViews]);
      });
    },
    delOthersCachedViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.DEL_OTHERS_CACHED_VIEWS(this.$state, view);
        resolve([...this.$state.cachedViews]);
      });
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve([...this.$state.visitedViews]);
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.DEL_ALL_VISITED_VIEWS(this.$state);
        resolve([...this.$state.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.DEL_ALL_CACHED_VIEWS(this.$state);
        resolve([...this.$state.cachedViews]);
      });
    },
    updateVisitedView(view: RouteLocation) {
      this.UPDATE_VISITED_VIEW(this.$state, view);
    },
  },
});

export function useTagViewStoreWithOut(): Store {
  return useTagViewStore(store);
}
