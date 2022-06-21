import type { RouteLocationRaw, Router } from "vue-router";

import { unref } from "vue";

import { useRouter } from "vue-router";
import { REDIRECT_NAME, HOME_NAME } from "@/router/constant";

export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: string } : T;
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>;

function handleError(e: Error) {
	console.error(e);
}

/** 切换页面 */
export function useGo(_router?: Router) {
	const { push, replace } = _router || useRouter();
	function go(opt: RouteLocationRawEx = HOME_NAME, isReplace = false) {
		if (!opt) {
			return;
		}
		isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
	}
	return go;
}

/** 刷新页面 */
export const useRedo = (_router?: Router) => {
	const { push, currentRoute } = _router || useRouter();
	const { query, params = {}, name, fullPath } = unref(currentRoute.value);
	function redo(): Promise<boolean> {
		return new Promise(resolve => {
			if (name === REDIRECT_NAME) {
				resolve(false);
				return;
			}
			if (name && Object.keys(params).length > 0) {
				params["_redirect_type"] = "name";
				params["path"] = String(name);
			} else {
				params["_redirect_type"] = "path";
				params["path"] = fullPath;
			}
			push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
		});
	}
	return redo;
};
