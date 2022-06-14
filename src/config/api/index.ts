import { App } from "vue";

import Api from "./api";

const api = new Api();
/**
 * 初始化Api组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupApi(app: App<Element>): void {
  app.config.globalProperties.$api = api;
  app.provide("$api", api);
}

export { api };
