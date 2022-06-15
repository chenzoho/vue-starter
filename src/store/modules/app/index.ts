import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { AppState } from "./types";
import { FullConfig } from "./setting";
import { UrlConfig } from "./types";

function getLocal(): FullConfig {
	try {
		const json = window.localStorage.getItem("setting") || "";
		if (json) {
			const setting = JSON.parse(json);
			return setting as FullConfig;
		} else {
			const setting = new FullConfig();
			saveLocal(setting);
			return setting;
		}
	} catch (error) {
		const setting = new FullConfig();
		saveLocal(setting);
		return setting;
	}
}

function saveLocal(setting: FullConfig): void {
	if (setting == null) return;
	try {
		const json = JSON.stringify(setting);
		window.localStorage.setItem("setting", json);
	} catch (error) {
		// ignore
	}
}

export const useAppStore = defineStore("app", {
	state: (): AppState => ({
		loading: false,
		setting: getLocal(),
		urlConfig: {
			mode: "",
			baseUrl: "",
			system: "",
			commodity: "",
			customer: "",
			order: "",
			file: "",
			lucene: "",
			supply: "",
			upload: "",
			uploadPart: "",
			mergeChunks: ""
		},
		baseUrl: import.meta.env.VITE_APP_Prefix,
		prefix: import.meta.env.VITE_APP_Prefix
	}),
	getters: {
		getSetting(): FullConfig {
			return this.setting;
		},
		getMenuWidth(): number {
			return this.setting.menuSetting.width;
		},
		getUrlConfig(): UrlConfig {
			return this.urlConfig;
		}
	},
	actions: {
		/**更新加载器 */
		updateLoading(loading: boolean) {
			this.loading = loading;
		},
		/**更新配置 */
		updateSettings(partial: Partial<FullConfig>) {
			this.$patch({ setting: partial });
			saveLocal(this.setting);
		},
		/**更新配置 */
		updateMenuWidth(width: number) {
			this.setting.menuSetting.width = width;
		},

		/**重置配置 */
		reset() {
			const setting = new FullConfig();
			this.$patch({ setting: setting });
			saveLocal(setting);
		},

		// 更新api接口
		async updateUrl(urlConfig: UrlConfig) {
			Object.assign(this.urlConfig, urlConfig);
		}
	}
});

export function useAppOutsideStore(): Store {
	return useAppStore(store);
}
