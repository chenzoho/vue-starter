/** Record类型 */
declare type Recordable<T = unknown> = Record<string, T>;

/** 可空类型 */
declare type Nullable<T> = T | null;

/** 通用返回结果 */
export interface OperationResult<T = any> {
  /** 状态码 */
  status: number;
  /** 消息 */
  msg: string;
  /** 结果 */
  data?: T;
  /** 是否成功 */
  isSuccess: boolean;
}
