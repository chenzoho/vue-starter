import { Menu, Permission } from "#/permission";
import type { RouteRecordRaw } from "vue-router";
import type { FindTerrResult } from "XE-Utils";

import XEUtils from "XE-Utils";

/**
 *  根据权限动态生成路由
 *
 * @param {RouteRecordRaw[]} asyncRoutes
 * @param {Permission[]} permissions
 * @returns {RouteRecordRaw[]}
 */
export const generateRoutes = function (asyncRoutes: RouteRecordRaw[], permissions: Permission[]): RouteRecordRaw[] {
  permissions
    .filter((p) => p.type === 2)
    .forEach((p) => {
      XEUtils.eachTree(asyncRoutes, (e) => {
        if (!e.meta) return false;
        if (e.meta.enable) return true;
        e.meta.title = e.name || e.meta.title;
        // 忽略授权的路由
        if (e.meta.ignorePermission) {
          e.meta.enable = true;
          return true;
        }
        // 需要授权的页面
        if (e.meta.code) {
          if (p.code.startsWith(e.meta.code as string)) {
            e.meta.enable = true;
            return true;
          }
        }
        return false;
      });
    });

  return asyncRoutes;
};

/**
 *  根据权限动态生成菜单
 *
 * @param {RouteRecordRaw[]} asyncRoutes
 * @param {Permission[]} permissions
 * @returns {Menu[]}
 */
export const generateMenus = function (asyncRoutes: RouteRecordRaw[], permissions: Permission[]): Menu[] {
  const arr = [] as Menu[];
  const menus = permissions.filter((e) => e.type === 1);
  asyncRoutes.forEach((item: any) => {
    menus.map((p) => {
      if (item.meta.code === p.code) {
        const menu = {
          path: item.path,
          children: [],
          ...p,
        };
        arr.push(menu);
      }
    });
  });
  const pages = permissions.filter((e) => e.type === 2);

  pages.forEach((p) => {
    const router = XEUtils.findTree(asyncRoutes, (e) => e.meta?.code === p.code);
    if (!router) return;
    let paths = findRootRouter(router, asyncRoutes);
    paths = paths.filter((e) => e !== "/");
    paths.reverse();

    console.log(paths);
    const menu = {
      path: paths.join("/"),
      ...p,
    };
    arr.push(menu);
  });

  return arr;
};

/**
 *  递归查找路由全路径
 *
 * @param {FindTerrResult<RouteRecordRaw>} router
 * @param {RouteRecordRaw[]} asyncRoutes
 * @returns {string[]}
 */
export const findRootRouter = function (router: FindTerrResult<RouteRecordRaw>, asyncRoutes: RouteRecordRaw[]): string[] {
  const paths = [router.item.path];
  if (router.parent) {
    const parent = XEUtils.findTree(asyncRoutes, (e) => e.name === router.parent.name);
    if (!parent) return paths;
    const next = findRootRouter(parent, asyncRoutes);
    return paths.concat(next);
  }
  return paths;
};
