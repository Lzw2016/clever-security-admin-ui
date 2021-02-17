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
};

export { apiPath }
