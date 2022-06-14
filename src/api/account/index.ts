import { api } from "@/config/api";
import { OperationResult } from "types/axios";

/**
 * 账号密码登录
 *
 * @export
 * @param {Account.LoginVo} data
 * @returns {Promise<OperationResult>}
 */
export async function login(data: Account.LoginVo): Promise<OperationResult> {
  return await api.post("account/login", data);
}
