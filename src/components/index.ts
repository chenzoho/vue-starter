import type { App } from "vue";
import { Test } from "./Test";

/**
 * 初始化全局组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupGlobal(app: App<Element>): void {
	app.use(Test);
}
