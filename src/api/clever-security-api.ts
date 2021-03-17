import { serverHost } from "@/api/server-api";

const apiPath = {
  DomainController: {
    all: `${serverHost}/security/admin/api/domain/all`,
    pageQuery: `${serverHost}/security/admin/api/domain/page_query`,
    domainDetail: `${serverHost}/security/admin/api/domain/detail`,
    addDomain: `${serverHost}/security/admin/api/domain/add`,
    updateDomain: `${serverHost}/security/admin/api/domain/update`,
  },

  ServerAccessTokenController: {
    pageQuery: `${serverHost}/security/admin/api/server_access_token/page_query`,
    addServerAccessToken: `${serverHost}/security/admin/api/server_access_token/add`,
    updateServerAccessToken: `${serverHost}/security/admin/api/server_access_token/update`,
    delServerAccessToken: `${serverHost}/security/admin/api/server_access_token/del`,
  },

  UserController: {
    pageQuery: `${serverHost}/security/admin/api/user/page_query`,
    addUser: `${serverHost}/security/admin/api/user/add`,
    updateUser: `${serverHost}/security/admin/api/user/update`,
    uploadReceiver: `${serverHost}/security/admin/api/user/upload_receiver`,
  },

  UserDomainController: {
    delUserDomain: `${serverHost}/security/admin/api/user_domain/del`,
  },

  RoleController: {
    pageQuery: `${serverHost}/security/admin/api/role/page_query`,
    addRole: `${serverHost}/security/admin/api/role/add`,
    updateRole: `${serverHost}/security/admin/api/role/update`,
    delRole: `${serverHost}/security/admin/api/role/del`,
  },

  ApiPermissionController: {
    pageQuery: `${serverHost}/security/admin/api/api_permission/page_query`,
    addApiPermission: `${serverHost}/security/admin/api/api_permission/add`,
    updateApiPermission: `${serverHost}/security/admin/api/api_permission/update`,
    delApiPermission: `${serverHost}/security/admin/api/api_permission/del`,
  },

  UiPermissionController: {
    menuAndUiTree: `${serverHost}/security/admin/api/ui_permission/menu_and_ui_tree`,
    findUiByMenu: `${serverHost}/security/admin/api/ui_permission/find_ui_by_menu`,
    addUiPermission: `${serverHost}/security/admin/api/ui_permission/add`,
    pageQuery: `${serverHost}/security/admin/api/ui_permission/page_query`,
  },

  MenuPermissionController: {
    menuTree: `${serverHost}/security/admin/api/menu_permission/tree`,
    pageQuery: `${serverHost}/security/admin/api/menu_permission/page_query`,
    addMenuPermission: `${serverHost}/security/admin/api/menu_permission/add`,
    updateMenuPermission: `${serverHost}/security/admin/api/menu_permission/update`,
    delMenuPermission: `${serverHost}/security/admin/api/menu_permission/del`,
  },

  JwtTokenController: {
    pageQuery: `${serverHost}/security/admin/api/jwt_token/page_query`,
    disableJwtToken: `${serverHost}/security/admin/api/jwt_token/disable`,
  },

  UserSecurityContextController: {
    pageQuery: `${serverHost}/security/admin/api/user_security_context/page_query`,
    reloadUserSecurityContext: `${serverHost}/security/admin/api/user_security_context/reload`,
  },

  ValidateCodeController: {
    pageQuery: `${serverHost}/security/admin/api/validate_code/page_query`,
  },

  ScanCodeLoginController: {
    pageQuery: `${serverHost}/security/admin/api/scan_code_login/page_query`,
    detailScanCodeLogin: `${serverHost}/security/admin/api/scan_code_login/detail`,
  },

  UserLoginLogController: {
    pageQuery: `${serverHost}/security/admin/api/user_login_log/page_query`,
  },

  UserRegisterLogController: {
    pageQuery: `${serverHost}/security/admin/api/user_register_log/page_query`,
  },

  LoginFailedCountController: {
    pageQuery: `${serverHost}/security/admin/api/login_failed_count/page_query`,
  },
};

export { apiPath }
