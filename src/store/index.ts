import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();
/**
 * 初始化store
 *
 * @export
 * @param {App<Element>} app
 */
export function setupStore(app: App<Element>): void {
	app.use(store);
}

export { store };
