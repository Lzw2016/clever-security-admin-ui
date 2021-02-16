import { serverHost } from "@/api/server-api";

const apiPath = {
  DomainController: {
    pageQuery: `${serverHost}/security/admin/api/domain/page_query`,
    addDomain: `${serverHost}/security/admin/api/domain/add`,
    updateDomain: `${serverHost}/security/admin/api/domain/update`,
  },
};

export { apiPath }
