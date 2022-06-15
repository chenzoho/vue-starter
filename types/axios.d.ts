/** 通用请求 */
export interface RequestOptions extends AxiosRequestConfig {
	/**原生请求 */
	native?: boolean;
	/**格式化响应 */
	tansformResponse?: boolean;
	/**是否提示消息 */
	message?: boolean;
	/**是否显示加载 */
	loading?: boolean;
	/**是否附加时间戳 */
	timespan?: boolean;
	/**是否附加token */
	token?: boolean;
}
