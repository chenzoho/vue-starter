/** 通用返回结果 */
export interface OperationResult<T = unknown> {
  /** 状态码 */
  status: number;
  /** 消息 */
  msg: string;
  /** 结果 */
  result?: T;
  /** 是否成功 */
  isSuccess: boolean;
}
