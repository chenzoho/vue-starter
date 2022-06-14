import type { App } from "vue";
import { createPinia } from "pinia";
import { setUrlConfig } from "@/hooks/settings/index";

const store = createPinia();
/**
 * 初始化store
 *
 * @export
 * @param {App<Element>} app
 */
export function setupStore(app: App<Element>): void {
  app.use(store);
  setUrlConfig();
}

export { store };
// const modules = import.meta.globEager("../../directives/**/*.ts");
