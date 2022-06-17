import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { AppState } from "./types";

export const useAppStore = defineStore({
	id: "app",
	state: (): AppState => ({
		loading: false,
		apiConfig: {
			baseUrl: import.meta.env.VITE_APP_Prefix,
			prefix: import.meta.env.VITE_APP_Prefix
		}
	}),
	getters: {},
	actions: {
		/**更新加载器 */
		updateLoading(loading: boolean) {
			this.loading = loading;
		}
	}
});

/** 外部调用AppSrote */
export function useAppOutsideStore(): Store {
	return useAppStore(store);
}
