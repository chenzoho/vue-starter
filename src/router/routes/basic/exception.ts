import type { RouteRecordRaw } from "vue-router";
import LAYOUT from "@/layouts/default/index.vue";

const exceptionRoute: RouteRecordRaw = {
	path: "/:path(.*)*",
	name: "exception",
	component: LAYOUT,
	meta: {
		menu: false,
		tag: false
	},
	children: [
		{
			path: "/:path(.*)*",
			name: "exception",
			component: () => import("@/layouts/default/exception/index.vue"),
			meta: {
				menu: false,
				tag: false
			}
		}
	]
};
export default exceptionRoute;
