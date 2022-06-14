import { MockMethod } from "vite-plugin-mock";

import type { Permission } from "#/permission";
import type { OperationResult } from "#/global";

const dashboard = [
  {
    code: "001",
    pCode: "0",
    type: 1,
    name: "桌面",
    icon: "",
    visible: true,
    disabled: false,
    sort: 1,
    tags: [],
  },
  {
    code: "001001",
    pCode: "001",
    type: 2,
    name: "analysis",
    icon: "",
    visible: true,
    disabled: false,
    sort: 1,
    tags: [],
  },
  {
    code: "001002",
    pCode: "001",
    type: 2,
    name: "workbench",
    icon: "",
    visible: true,
    disabled: false,
    sort: 2,
    tags: [],
  },
  {
    code: "002",
    pCode: "0",
    type: 1,
    name: "个人",
    icon: "",
    visible: true,
    disabled: false,
    sort: 1,
    tags: [],
  },
  {
    code: "002001",
    pCode: "002",
    type: 2,
    name: "Admin",
    icon: "",
    visible: true,
    disabled: false,
    sort: 2,
    tags: [],
  },
] as Array<Permission>;

const result = {
  status: 1,
  msg: "",
  isSuccess: true,
  data: [...dashboard],
} as OperationResult<Array<Permission>>;

const method1 = {
  url: "/api/v1/account/permissions",
  method: "get",
  response: () => {
    return result;
  },
} as MockMethod;

export default [method1];
