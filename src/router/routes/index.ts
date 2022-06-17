import type { RouteRecordRaw } from "vue-router";

const async = import.meta.globEager("./async/**/*.ts");
const asyncModuleList: RouteRecordRaw[] = [];

Object.keys(async).forEach(key => {
	const mod = async[key].default || {};
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	asyncModuleList.push(...modList);
});

// Async routing with permission
export const asyncRoutes = [...asyncModuleList];

const basic = import.meta.globEager("./basic/**/*.ts");
const basicModuleList: RouteRecordRaw[] = [];
Object.keys(basic).forEach(key => {
	const mod = basic[key].default || {};
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	basicModuleList.push(...modList);
});

// Basic routing without permission
export const basicRoutes = [...basicModuleList];
