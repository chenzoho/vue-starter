import mitt from "mitt";
import type { App } from "vue";

const emitter = mitt();

/**
 * 初始化全局事件总线
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupEventBus(app: App<Element>): void {
  app.config.globalProperties.$bus = emitter;
  app.provide("$bus", emitter);
}

export { emitter };
