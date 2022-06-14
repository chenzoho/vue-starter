// 全局自定义过滤器
import type { App } from "vue";
import * as filters from "@/filters";

/**
 * 初始化全局过滤器
 *
 * @export
 * @param {App<Element>} app  App<Element>
 * @link https://v3.cn.vuejs.org/guide/migration/filters.html
 */
export function setupFilter(app: App<Element>): void {
  app.config.globalProperties.$filters = {};
  Object.keys(filters).forEach((key) => {
    // console.log(key, filters[key]);
    // app.filter(key, filters[key]);
    app.config.globalProperties.$filters[key] = filters[key];
  });
}
