import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestOptions } from "#/axios";

export abstract class AxiosTransform {
  /**请求处理钩子 */
  RequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
  /**请求失败钩子 */
  RequestInjectHook?: (error: Error) => void;
  /**响应处理钩子 */
  ResponseHook?: (res: AxiosResponse<any>, options: RequestOptions) => any;
  /**响应失败钩子 */
  ResponseInjectHook?: (error: Error) => void;
}
