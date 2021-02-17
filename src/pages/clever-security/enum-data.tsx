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

export { serverAccessToken, jwtToken }
