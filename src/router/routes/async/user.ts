import type { RouteRecordRaw } from "vue-router";

import LAYOUT from "@/layouts/default/index.vue";

const userRoute: RouteRecordRaw = {
	path: "/user",
	name: "个人",
	component: LAYOUT,
	redirect: "/user/admin",
	meta: {
		code: "002"
	},
	children: [
		{
			path: "admin",
			name: "Admin",
			component: () => import("@/views/user/admin/index.vue"),
			meta: {
				code: "002001"
			}
		}
	]
};

export default userRoute;
