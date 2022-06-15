import type { Menu, Permission } from "#/permission";
import type { RouteRecordRaw } from "vue-router";

interface PermissionState {
  isDynamicAddedRoute: boolean;
  /** 权限集合 */
  list: Permission[];
  menus: Menu[];
  routers: RouteRecordRaw[];
}
