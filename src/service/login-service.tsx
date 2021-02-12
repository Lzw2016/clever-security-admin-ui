import { message } from "antd";
import Cookies from "js-cookie";
import { request } from "@/utils/request";
import { logger } from "@/utils/logger";
import { LayoutConfig, LayoutType, routerHistory } from "@/utils/router";
import { UserSecurityContext } from "@/utils/security";

const log = logger.getLogger("src/utils/login-service.ts");

/**
 * 菜单数据转换成路由配置
 */
const menuToRoute = (menu: MenuInfo): RouterConfig => {
  const { name, icon, path, pagePath, hideMenu, hideChildrenMenu, extConfig, children } = menu;
  let ext = {};
  if (extConfig) {
    try {
      ext = JSON.parse(extConfig);
    } catch (err) {
      console.error("菜单扩展配置解析失败 -> ", menu);
      ext = {};
    }
  }
  const route: RouterConfig = { name, icon, path, pagePath, hideMenu: hideMenu !== 0, hideChildrenMenu: hideChildrenMenu !== 0, ...ext };
  if (children) {
    route.routes = [];
    children.forEach(child => route.routes?.push(menuToRoute(child)));
  }
  return route;
}

/**
 * 获取当前登录用户信息
 */
const getCurrentUser = async (currentUserApi: string): Promise<void> => {
  if (!currentUserApi) return;
  const securityContext = await request.get(currentUserApi);
  log.info("getCurrentUser -> ", securityContext);
  const { userInfo, roles = [], permissions = [] } = securityContext;
  const { extInfo = {}, ...restProps } = userInfo;
  window.currentUser = { ...restProps, ...extInfo };
  window.securityContext = new UserSecurityContext(userInfo, roles, permissions);
};

/**
 * 加载服务端菜单数据
 */
const getMenus = async (routerConfigs: LayoutConfig[], menuApi: string): Promise<LayoutConfig[] | undefined> => {
  if (!menuApi) return;
  const menus = await request.get(menuApi);
  const newRoutes = menus.map((menu: any) => menuToRoute(menu));
  let updated: boolean = false;
  routerConfigs.forEach(layoutConfig => {
    if (updated || layoutConfig.layout === LayoutType.Blank) return;
    updated = true;
    layoutConfig.routes = newRoutes;
  });
  if (!updated) return;
  return routerConfigs;
}

/**
 * 用户登录
 */
const userLogin = (loginData: any, loginApi: string, currentUserApi: string, defaultPath: string, onStart?: () => void, onFinally?: () => void): void => {
  if (!loginApi) {
    message.warn("未配置layoutSettings.loginApi").then();
    return;
  }
  if (onStart instanceof Function) onStart();
  request.post(loginApi, loginData)
    .then(({ success, userInfo, message: msg }) => {
      if (!success || !userInfo) {
        message.error(msg || "用户名/密码错误").then();
        return;
      }
      message.success(msg || "登录成功").then();
      getCurrentUser(currentUserApi).then(() => {
        window.appComponent.refreshMenu(() => {
          if (defaultPath) routerHistory.push({ path: defaultPath });
        }).then();
      });
    }).finally(onFinally);
};

/**
 * 退出登录
 */
const userLogout = (logoutApi: string, loginPath: string): void => {
  window.currentUser = undefined;
  window.securityContext = undefined;
  const finallyFuc = () => {
    Cookies.remove("authorization");
    if (loginPath) routerHistory.push({ path: loginPath });
  };
  if (logoutApi) {
    request.get(logoutApi).finally(finallyFuc);
  } else {
    finallyFuc();
  }
}

export { getCurrentUser, getMenus, userLogin, userLogout }
