import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { IMetaSetting } from "./types";

export const useMetaStore = defineStore({
	id: "meta",
	state: (): IMetaSetting => ({
		title: "vtd admin",
		logo: "/assets/logo.png",
		icon: "/assets/favicon.ico",
		shortTitle: "vtd",
		description: "vtd admin",
		keywords: "vtd admin vue vue3 ts tsc typescript"
	}),
	actions: {
		/**
		 * 更新元数据信息
		 * @param {Partial<IMetaSetting>} partial
		 */
		update(partial: Partial<IMetaSetting>): void {
			this.$patch(partial);
		}
	}
});

/** 外部调用MetaSrote */
export function useMetaStoreWithOut(): Store {
	return useMetaStore(store);
}
