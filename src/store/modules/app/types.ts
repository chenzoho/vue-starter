export interface AppState {
	/** 全局加载器 */
	loading: boolean;
	/** API配置 */
	apiConfig: IApiConfig;
}

/** API配置 */
export interface IApiConfig {
	/** 接口地址 */
	baseUrl: string;
	/** 图片地址 */
	prefix: string;
}

/** 验证码配置 */
export interface ICaptchaConfig {
	/** 秘钥 */
	AppId: string;
}
