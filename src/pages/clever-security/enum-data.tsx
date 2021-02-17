import { EnumArray } from "@/utils/enum";

const serverAccessToken: {
  /** Token是否禁用，0:启用；1:禁用 */
  disable: EnumArray;
  [name: string]: EnumArray;
} = {
  disable: [
    { label: "启用", value: "0" },
    { label: "禁用", value: "1" },
  ],
};

const jwtToken: {
  /** JWT-Token是否禁用，0:未禁用；1:已禁用 */
  disable: EnumArray;
  /** 刷新Token状态，0:无效(已使用)；1:有效(未使用) */
  refreshTokenState: EnumArray;
  [name: string]: EnumArray;
} = {
  disable: [
    { label: "启用", value: "0" },
    { label: "禁用", value: "1" },
  ],
  refreshTokenState: [
    { label: "已使用(无效)", value: "0" },
    { label: "未使用(有效)", value: "1" },
  ],
};

const scanCodeLogin: {
  /** 扫描二维码状态，0:已创建(待扫描)，1:已扫描(待确认)，2:已确认(待登录)，3:登录成功，4:已失效 */
  scanCodeState: EnumArray;
  [name: string]: EnumArray;
} = {
  scanCodeState: [
    { label: "已创建(待扫描)", value: "0" },
    { label: "已扫描(待确认)", value: "1" },
    { label: "已确认(待登录)", value: "2" },
    { label: "登录成功", value: "3" },
    { label: "已失效", value: "4" },
  ],
};

export { serverAccessToken, jwtToken, scanCodeLogin }
