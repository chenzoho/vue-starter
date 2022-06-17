export interface AppState {
	/** 全局加载器 */
	loading: boolean;
	/** API配置 */
	apiConfig: IApiConfig;
	/** 菜单配置 */
	meunConfig: IMenuConfig;
}

/** API配置 */
export interface IApiConfig {
	/** 接口地址 */
	baseUrl: string;
	/** 图片地址 */
	prefix: string;
}

/** 菜单配置 */
export interface IMenuConfig {
	/** 折叠  */
	collapse: boolean;
}

/** 腾讯验证码配置 */
export interface ICaptchaConfig {
	/** 秘钥 */
	AppId: string;
}

/** 高德地图配置 */
export interface IMapConfig {
	/** 秘钥 */
	AppId: string;
}
