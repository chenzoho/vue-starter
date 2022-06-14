/** 用户状态 */
export interface UserState {
  /** 令牌 */
  token: string;
  /** 过期时间 */
  expire: number;
  /** 刷新时间 */
  refresh: number;
  /** 编号 */
  code: "";
  /** 名称 */
  name: string;
  /** 性别 */
  gender: number;
  /** 头像 */
  avatar: string;
}
