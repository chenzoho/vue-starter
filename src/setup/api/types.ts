import type { AxiosRequestConfig, AxiosResponse } from "axios";

//	自定义请求拦截器
export interface RequestInterceptors<T> {
	// 请求拦截
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorsCatch?: (err: any) => any;
	// 响应拦截
	responseInterceptors?: (config: T) => T;
	responseInterceptorsCatch?: (err: any) => any;
}

// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>;
}

//	canceltoken集合
export interface CancelRequestSource {
	[index: string]: () => void;
}
