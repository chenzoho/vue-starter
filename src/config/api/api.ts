// api方法
import axios from "axios";
import qs from "qs";
import { emitter } from "@/config/bus";

class Api {
  constructor() {
    // 添加请求拦截器
    axios.defaults.baseURL = import.meta.env.VITE_BASE_API;
    axios.interceptors.request.use(
      (config) => {
        const cfg = config as Record<string, string>;
        // application
        cfg.headers["application"] = window.localStorage.getItem("application");
        // unique
        cfg.headers["unique"] = window.localStorage.getItem("unique");
        // jwt
        if (window.localStorage.getItem("token")) {
          cfg.header["Authorization"] = "Bearer " + window.localStorage.getItem("token");
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    axios.interceptors.response.use(
      function (response) {
        const headers = response.config.headers ?? {};

        if (response.data) {
          if (headers.Log) {
            // 验证拦截
            emitter.emit("EVENT_API_SUCCESS", response);
          }
          return response.data;
        } else {
          if (headers.Log) {
            emitter.emit("EVENT_API_ERROR", response);
          }
          throw new Error("数据格式错误");
        }
      },
      function (error) {
        if (error && error.response) {
          // 服务层错误
          switch (error.response.status) {
            case 400:
              error.message = "请求错误";
              break;
            case 401:
              error.message = "未授权";
              emitter.emit("Event_Api_Unauthorized", error);
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`;
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 500:
              error.message = "服务器内部错误";
              break;
            case 501:
              error.message = "服务未实现";
              break;
            case 502:
              error.message = "网关错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "网关超时";
              break;
            case 505:
              error.message = "HTTP版本不受支持";
              break;
            default:
          }
        } else {
          error.message = "请求未响应";
        }
        // console.log(this.$bus)
        emitter.emit("EVENT_API_ERROR", error);

        return Promise.reject(error);
      }
    );
  }

  /**
   *api Get
   *
   * @param {string} url  地址
   * @param {object} [params=null] url参数
   * @returns  Promise
   * @memberof Api
   */
  get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return axios.get(url, {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });
  }
  /**
   *api Post[application/json]
   *
   * @param {''} url  地址
   * @param {{}} [data=null] body参数
   * @param {{}} [params=null] url参数
   * @returns  响应结果
   * @memberof Api
   */
  post<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
    return axios.post(url, data, {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });
  }
  /**
   *api Post[application/x-www-form-urlencoded]
   *
   * @param {''} url  地址
   * @param {{}} [data=null] body参数
   * @param {{}} [params=null] url参数
   * @returns  响应结果
   * @memberof Api
   */
  form<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
    return axios.post(url, qs.stringify(data, { indices: false }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });
  }
  /**
   *api Put
   *
   * @param {''} url  地址
   * @param {FormData} [data=null] body参数
   * @param {{}} [params=null] url参数
   * @param {{}} [type=null]  Content-Type
   * @returns  响应结果
   * @memberof Api
   */
  put<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
    // application/json
    return axios.put(url, data, {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });
  }
  /**
   *api Delete
   *
   * @param {string} url  地址
   * @param {{}} [params=null] url参数
   * @returns  Promise
   * @memberof Api
   */
  delete<T>(url: string, params: unknown): Promise<T> {
    return axios.delete(url, {
      data: params,
    });
  }
}

export default Api;
