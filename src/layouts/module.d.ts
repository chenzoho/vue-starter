// import { PermissionTypeEnum } from "./enum";

/** 菜单标签 */
export interface MenuTag {
  /** 类型 */
  type?: "primary" | "error" | "warn" | "success";
  /** 消息 */
  content?: string;
  /** 是否固定 */
  dot?: boolean;
}

/** KeepAlive缓存 */
export interface KeepAliveList {
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
}
