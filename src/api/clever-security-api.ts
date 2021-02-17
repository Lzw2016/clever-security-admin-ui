import { serverHost } from "@/api/server-api";

const apiPath = {
  DomainController: {
    all: `${serverHost}/security/admin/api/domain/all`,
    pageQuery: `${serverHost}/security/admin/api/domain/page_query`,
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

  ApiPermissionController: {
    pageQuery: `${serverHost}/security/admin/api/api_permission/page_query`,
    addApiPermission: `${serverHost}/security/admin/api/api_permission/add`,
    updateApiPermission: `${serverHost}/security/admin/api/api_permission/update`,
    delApiPermission: `${serverHost}/security/admin/api/api_permission/del`,
  },

  JwtTokenController: {
    pageQuery: `${serverHost}/security/admin/api/jwt_token/page_query`,
    disableJwtToken: `${serverHost}/security/admin/api/jwt_token/disable`,
  },
};

export { apiPath }
