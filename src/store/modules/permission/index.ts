import { defineStore, Store } from "pinia";
import { store } from "@/store";
import type { PermissionState } from "./types";
import type { Permission } from "#/permission";
import type { RouteRecordRaw } from "vue-router";
import { asyncRoutes, basicRoutes } from "@/router/routes";

import XEUtils from "XE-Utils";

import { api } from "@/config/api";
import { OperationResult } from "#/global";
import { generateRoutes, generateMenus } from "@/utils/permission";

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    list: [],
    menus: [],
    routers: [],
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    /**添加权限 */
    add(permissions: Permission[]) {
      this.list = permissions;
    },
    /**更新权限 */
    update(permissions: Permission[]) {
      this.list = permissions;
    },
    /**重置 */
    reset() {
      this.list = [];
    },
    async generateRoutes(): Promise<Array<RouteRecordRaw>> {
      // 远程获取权限列表
      const result = await api.get<OperationResult<Permission[]>>("account/permissions");
      if (!result) return [];
      if (!result.isSuccess) return [];
      if (!result.data) return [];
      this.list = result.data;

      // 根据权限生成菜单
      const menus = generateMenus(asyncRoutes, result.data);
      // console.log(menus);
      this.menus = XEUtils.toArrayTree(menus, { parentKey: "pCode", key: "code", children: "children", sortKey: "sort" });
      // 根据权限生成路由
      const routes = generateRoutes(asyncRoutes, result.data);
      this.routers = basicRoutes.concat(routes);

      this.isDynamicAddedRoute = true;
      return routes;
    },
  },
});

export function usePermissionStoreWithOut(): Store {
  return usePermissionStore(store);
}
