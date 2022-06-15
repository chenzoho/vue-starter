import { FullConfig } from "./setting";

export interface AppState {
	/** 全局加载器 */
	loading: boolean;
	/** 布局配置 */
	setting: FullConfig;
	baseUrl: string;
	urlConfig: UrlConfig;
	prefix: string;
}

export interface UrlConfig {
	mode: string;
	baseUrl: string;
	system: string;
	commodity: string;
	customer: string;
	order: string;
	file: string;
	lucene: string;
	supply: string;
	upload: string;
	uploadPart: string;
	mergeChunks: string;
}
