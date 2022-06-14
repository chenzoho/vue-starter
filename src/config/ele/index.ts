import type { App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

/**
 * 初始化ElementPlus组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupElement(app: App<Element>): void {
  app.use(ElementPlus);
}
