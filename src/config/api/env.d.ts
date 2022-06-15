/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** 接口地址*/
	readonly VITE_BASE_API: string;
	/** 图片地址 */
	readonly VITE_APP_Prefix: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
