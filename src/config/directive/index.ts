// 全局自定义指令
import type { App } from "vue";

/**
 * 初始化全局指令
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupDirective(app: App<Element>): void {
  const modules = import.meta.globEager("../../directives/**/*.ts");

  for (const path in modules) {
    app.directive(modules[path].name, modules[path]);
  }
  // for (const path in modules) {
  //   modules[path]().then((mod) => {
  //     app.directive(mod.name, mod);
  //   });
  // }
}
