import { EnumArray } from "@/utils/enum";

const serverAccessToken: { [name: string]: EnumArray } = {
  /** Token是否禁用，0:启用；1:禁用 */
  disable: [
    { label: "启用", value: "0" },
    { label: "禁用", value: "1" },
  ],
};

export { serverAccessToken }
