import type { App } from "vue";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

/**
 * 初始化VXETable组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupTable(app: App<Element>): void {
  app.use(VXETable);
}
