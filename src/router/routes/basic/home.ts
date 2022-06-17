import type { RouteRecordRaw } from "vue-router";
import LAYOUT from "@/layouts/default/index.vue";
const homeRoute: RouteRecordRaw = {
	path: "/",
	component: LAYOUT,
	redirect: "/home",
	children: [
		{
			path: "home",
			component: () => import("@/views/Home.vue"),
			name: "Home",
			meta: { authorize: true, title: "桌面", icon: "dashboard", affix: true, enable: true }
		}
	]
};

export default homeRoute;
