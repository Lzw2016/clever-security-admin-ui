import { EnumArray } from "@/utils/enum";

const serverAccessToken: {
  /** Token是否禁用，0:启用；1:禁用 */
  disable: EnumArray;
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
} = {
  scanCodeState: [
    { label: "已创建(待扫描)", value: "0" },
    { label: "已扫描(待确认)", value: "1" },
    { label: "已确认(待登录)", value: "2" },
    { label: "登录成功", value: "3" },
    { label: "已失效", value: "4" },
  ],
};

const validateCode: {
  /** 验证码类型 */
  type: EnumArray;
  /** 验证码发送渠道，0:不需要发送，1:短信，2:email */
  sendChannel: EnumArray;
} = {
  type: [
    { label: "登录验证码", value: "1" },
    { label: "找回密码验证码", value: "2" },
    { label: "重置密码(修改密码)验证码", value: "3" },
    { label: "登录名注册验证码", value: "4" },
    { label: "短信注册图片验证码", value: "5" },
    { label: "短信注册短信验证码", value: "6" },
    { label: "邮箱注册图片验证码", value: "7" },
    { label: "邮箱注册邮箱验证码", value: "8" },
    { label: "短信换绑图片验证码", value: "9" },
    { label: "短信换绑短信验证码", value: "10" },
    { label: "邮箱换绑图片验证码", value: "11" },
    { label: "邮箱换绑邮箱验证码", value: "12" },
  ],
  sendChannel: [
    { label: "不需要发送", value: "0" },
    { label: "短信", value: "1" },
    { label: "Email", value: "2" },
  ],
};

const user: {
  /** 是否启用，0:禁用，1:启用 */
  enabled: EnumArray;
  /** 用户注册渠道，0:管理员，1:PC-Web，2:H5，3:IOS-APP，4:Android-APP，5:微信小程序 */
  registerChannel: EnumArray;
  /** 用户来源，0:系统注册，1:外部导入(同步) */
  fromSource: EnumArray;
} = {
  enabled: [
    { label: "禁用", value: "0" },
    { label: "启用", value: "1" },
  ],
  registerChannel: [
    { label: "管理员创建", value: "0" },
    { label: "PC-Web", value: "1" },
    { label: "H5", value: "2" },
    { label: "IOS-APP", value: "3" },
    { label: "Android-APP", value: "4" },
    { label: "微信小程序", value: "5" },
  ],
  fromSource: [
    { label: "系统注册", value: "0" },
    { label: "外部导入", value: "1" },
  ],
};

const role: {
  /** 是否启用，0:禁用，1:启用 */
  enabled: EnumArray;
} = {
  enabled: [
    { label: "禁用", value: "0" },
    { label: "启用", value: "1" },
  ],
};

const permission: {
  /** 权限类型，1:API权限，2:菜单权限，3:页面UI权限 */
  permissionType: EnumArray;
  /** 是否启用，0:禁用，1:启用 */
  enabled: EnumArray;
} = {
  permissionType: [
    { label: "API权限", value: "1" },
    { label: "菜单权限", value: "2" },
    { label: "页面UI权限", value: "3" },
  ],
  enabled: [
    { label: "禁用", value: "0" },
    { label: "启用", value: "1" },
  ],
};

const apiPermission: {
  /** API接口是否存在，0：不存在；1：存在 */
  apiExist: EnumArray;
} = {
  apiExist: [
    { label: "不存在", value: "0" },
    { label: "存在", value: "1" },
  ],
};

const menuPermission: {
  /** 隐藏当前菜单和子菜单，0:不隐藏(显示)，1:隐藏 */
  hideMenu: EnumArray;
  /** 隐藏子菜单，0:不隐藏(显示)，1:隐藏 */
  hideChildrenMenu: EnumArray;
} = {
  hideMenu: [
    { label: "显示", value: "0" },
    { label: "隐藏", value: "1" },
  ],
  hideChildrenMenu: [
    { label: "显示", value: "0" },
    { label: "隐藏", value: "1" },
  ],
};

// ------------------------------------------------------------
const exist: EnumArray = [
  { label: "不存在", value: "0" },
  { label: "存在", value: "1" },
];

const enabled: EnumArray = [
  { label: "禁用", value: "0" },
  { label: "启用", value: "1" },
];

const isHideMenu: EnumArray = [
  { label: "显示", value: 0 },
  { label: "隐藏", value: 1 },
];

const login: {
  /** 登录管道 */
  channel: EnumArray;
  /** 登录类型 */
  type: EnumArray;
  /** 登录状态 */
  state: EnumArray;
} = {
  channel: [
    { label: "PC-Admin", value: 0 },
    { label: "PC-Web", value: 1 },
    { label: "H5", value: 2 },
    { label: "IOS-APP", value: 3 },
    { label: "Android-APP", value: 4 },
    { label: "微信小程序", value: 5 },
  ],
  type: [
    { label: "用户名密码", value: 1 },
    { label: "手机号验证码", value: 2 },
    { label: "邮箱验证码", value: 3 },
    { label: "刷新token", value: 4 },
    { label: "微信小程序", value: 5 },
    { label: "扫码登录", value: 6 },
  ],
  state: [
    { label: "登录成功", value: 1 },
    { label: "登录失败", value: 0 }
  ]
}
const register: {
  /** 登录管道 */
  result: EnumArray;
} = {
  result: [
    { label: "注册失败", value: 0 },
    { label: "注册成功且创建用户", value: 1 },
    { label: "注册成功仅关联到域", value: 2 }
  ]
}

export {
  serverAccessToken,
  jwtToken,
  scanCodeLogin,
  validateCode,
  user,
  role,
  permission,
  apiPermission,
  menuPermission,

  exist,
  enabled,
  isHideMenu,
  login,
  register
}
