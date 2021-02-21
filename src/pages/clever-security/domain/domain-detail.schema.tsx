import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import styles from "@/pages/clever-security/user/user-list.schema.less";
import { enabled, exist } from "@/pages/clever-security/enum-data";
import { enum2object } from "@/utils/enum";

const amisPageName = "domainId";

let globalData: AmisPageGlobalData | undefined;

const initGlobalData: AmisPage["initGlobalData"] = initGlobalData => {
  globalData = initGlobalData;
  console.log("####################### globalData -> ", globalData);
}

const shouldPageUpdate: AmisPage["shouldPageUpdate"] = nextGlobalData => {
  const { location: { query } } = nextGlobalData;
  let flag = true;
  if (globalData?.location?.query && query && globalData?.location?.query.domainId === query.domainId) {
    flag = false;
  }
  globalData = nextGlobalData;
  console.log("####################### flag -> ", flag);
  return flag;
}

const pageDidUpdate: AmisPage["pageDidUpdate"] = amisApp => {
  // console.log("pageDidUpdateAAAAAAAAAAAAAAA", amisApp.getComponentByName("page.tabs"));
  // console.log("pageDidUpdateAAAAAAAAAAAAAAA", Object.keys(amisApp.getComponents()[0].reload()) );
  // console.log("pageDidUpdateAAAAAAAAAAAAAAA", Object.keys(amisApp.getComponents()[0].__proto__.__proto__) );
};

const schema = {
  type: "page",
  name: "page",
  title: "",
  toolbar: [],
  body: [
    {
      type: "form",
      name: "form",
      wrapWithPanel: false,
      mode: "inline",
      controls: [
        { type: "static", name: "location.query.domainId", label: "域ID" },
      ]
    },
    {
      type: "tabs",
      mode: "line",
      name: "tabs",
      tabs: [
        {
          title: "数据域信息",
          body: {
            type: "form",
            mode: "horizontal",
            className: classnames(FormClassName.flex_label5x, FormClassName.input20x),
            // initApi: {
            //   method: "get",
            //   url: `${apiPath.DomainController.pageQuery}?id=$location.query.domainId`,
            // },
            api: {
              method: "put",
              url: apiPath.DomainController.updateDomain,
              data: {
                id: "$location.query.domainId",
                name: "$location.query.domainId",
                redisNameSpace: "$location.query.domainId",
                description: "$location.query.domainId",
                createAt: "$location.query.domainId",
                updateAt: "$location.query.domainId"
              },
            },
            controls: [
              { type: "static", name: "location.query.domainId", label: "域ID", disabled: true },
              {
                type: "text", name: "location.query.domainId", label: "域名称", placeholder: "请输入域名称",
                required: true, validations: { minLength: 4, maxLength: 100 }, validationErrors: {},
              },
              { type: "static", name: "location.query.domainId", label: "Redis前缀", disabled: true },
              { type: "textarea", name: "location.query.domainId", label: "说明" },
              { type: "static", name: "location.query.domainId", label: "创建时间", disabled: true },
              { type: "static", name: "location.query.domainId", label: "更新时间", disabled: true },
            ],
            actions: [
              {
                type: "action",
                label: "返回",
                onClick: () => {
                  history.back()
                }
              },
              { type: "submit", level: "primary", label: "提交" },
            ],
          }
        },
        {
          title: "用户数据",
          body: {
            type: "crud",
            name: "user_crud",
            // --------------------------------------------------------------- 常规配置
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            draggable: false,
            hideQuickSaveBtn: false,
            autoJumpToTopOnPagerChange: false,
            affixHeader: false,
            syncResponse2Query: true,
            // --------------------------------------------------------------- 请求数据配置
            api: {
              method: "get",
              url: apiPath.UserController.pageQuery,
              data: {
                pageNo: "$pageNo",
                pageSize: "$pageSize",
                domainId: "$location.query.domainId",
                keyword: "$keyword",
                createAtStart: "$createAtStart",
                createAtEnd: "$createAtEnd",
              },
            },
            defaultParams: { pageNo: 1, pageSize: 10 },
            pageField: "pageNo",
            perPageField: "pageSize",
            // --------------------------------------------------------------- 查询条件表单配置
            // 条件过滤表单
            filterTogglable: true,
            filter: {
              title: "",
              className: classnames(FormClassName.label4x, FormClassName.input14x),
              trimValues: true,
              submitOnChange: false,
              controls: [
                { type: "text", label: "用户信息", name: "keyword", placeholder: "登录名、手机号、邮箱、昵称", clearable: true },
                { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
                { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
                { label: "查询", level: "primary", type: "submit" },
                { label: "重置", type: "reset" },
              ],
            },
            // --------------------------------------------------------------- 表格列配置
            primaryField: "id",
            columns: [
              { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
              { name: "avatar", label: "用户头像", type: "image", thumbMode: "h-full", className: styles.avatar },
              { name: "nickname", label: "昵称", sortable: true },
              { name: "loginName", label: "登录名", sortable: true },
              { name: "telephone", label: "手机号", copyable: true, sortable: true },
              { name: "email", label: "邮箱", copyable: true, sortable: true },
              { name: "enabled", label: "是否启用", type: "switch", trueValue: 1, falseValue: 0 },
              { name: "createAt", label: "创建时间", sortable: true },
              { name: "updateAt", label: "更新时间", sortable: true },
              { type: "operation", label: "操作", width: 35, toggled: true, buttons: [RemoveDialog()] },
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            headerToolbar: [
              { align: "left", type: 'button', level: 'primary', size: "sm", ...addDialog() },
              { align: "right", type: "columns-toggler" },
            ],
            footerToolbar: [
              { align: "right", type: "pagination" },
              { align: "right", type: "switch-per-page" },
              { align: "right", type: "statistics" },
            ],
          },
        },
        {
          title: "角色数据",
          body: {
            type: "crud",
            // --------------------------------------------------------------- 常规配置
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            draggable: false,
            hideQuickSaveBtn: false,
            autoJumpToTopOnPagerChange: false,
            affixHeader: false,
            syncResponse2Query: true,
            // --------------------------------------------------------------- 请求数据配置
            api: {
              method: "get",
              url: apiPath.RoleController.pageQuery,
              data: {
                pageNo: "$pageNo",
                pageSize: "$pageSize",
                domainId: "$location.query.domainId",
                createAtStart: "$createAtStart",
                createAtEnd: "$createAtEnd",
              },
            },
            defaultParams: { pageNo: 1, pageSize: 10 },
            pageField: "pageNo",
            perPageField: "pageSize",
            // --------------------------------------------------------------- 查询条件表单配置
            // 条件过滤表单
            filterTogglable: true,
            filter: {
              title: "",
              className: classnames(FormClassName.label4x, FormClassName.input14x),
              trimValues: true,
              submitOnChange: false,
              controls: [
                { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
                { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
                { label: "查询", level: "primary", type: "submit" },
                { label: "重置", type: "reset" },
              ],
            },
            // --------------------------------------------------------------- 表格列配置
            primaryField: "id",
            columns: [
              { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
              { name: "name", label: "角色名称", type: "text" },
              { name: "enabled", label: "是否启用", type: "switch", trueValue: 1, falseValue: 0 },
              { name: "createAt", label: "创建时间", sortable: true },
              { type: "operation", label: "操作", width: 35, toggled: true, buttons: [RemoveRoleDialog()] },
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            headerToolbar: [
              { align: "left", type: 'button', level: 'primary', size: "sm", ...addDialog() },
              { align: "right", type: "columns-toggler" },
            ],
            footerToolbar: [
              { align: "right", type: "pagination" },
              { align: "right", type: "switch-per-page" },
              { align: "right", type: "statistics" },
            ],
          }
        },
        {
          title: "权限数据",
          body: {
            type: "tabs",
            mode: "radio",
            tabs: [
              {
                title: "api权限",
                body: {
                  type: "crud",
                  // --------------------------------------------------------------- 常规配置
                  perPageAvailable: [10, 20, 50, 100],
                  syncLocation: false,
                  draggable: false,
                  hideQuickSaveBtn: false,
                  autoJumpToTopOnPagerChange: false,
                  affixHeader: false,
                  syncResponse2Query: true,
                  // --------------------------------------------------------------- 请求数据配置
                  api: {
                    method: "get",
                    url: apiPath.ApiPermissionController.pageQuery,
                    data: {
                      pageNo: "$pageNo",
                      pageSize: "$pageSize",
                      domainId: "$location.query.domainId",
                      name: "$name",
                      apiExist: "$apiExist",
                      createAtStart: "$createAtStart",
                      createAtEnd: "$createAtEnd",
                    },
                  },
                  defaultParams: { pageNo: 1, pageSize: 10 },
                  pageField: "pageNo",
                  perPageField: "pageSize",
                  // --------------------------------------------------------------- 查询条件表单配置
                  // 条件过滤表单
                  filterTogglable: true,
                  filter: {
                    title: "",
                    className: classnames(FormClassName.label4x, FormClassName.input12x),
                    trimValues: true,
                    submitOnChange: false,
                    // submitText: "查询",
                    controls: [
                      { type: "text", label: "api信息", name: "name", placeholder: "类名,方法名,参数签名,api地址", clearable: true },
                      { type: "select", label: "是否存在", name: "apiExist", options: exist, clearable: true },
                      { type: "html", html: "<br />" },
                      { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
                      { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
                      { type: "html", html: "&nbsp;&nbsp;&nbsp;&nbsp;" },
                      { label: "查询", level: "primary", type: "submit" },
                      { label: "重置", type: "reset" },
                    ],
                  },
                  // --------------------------------------------------------------- 表格列配置
                  primaryField: "id",
                  columns: [
                    { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
                    { name: "permissionId", label: "权限id", sortable: false },
                    { name: "apiPath", label: "API接口地址", sortable: true },
                    { name: "apiExist", label: "API接口是否存在", sortable: true, type: "mapping", map: enum2object(exist) },
                    { name: "description", label: "说明", sortable: false },
                    { name: "createAt", label: "创建时间", sortable: true },
                    { name: "updateAt", label: "更新时间", sortable: true },
                    { type: "operation", label: "操作", width: 120, toggled: true, buttons: [RemoveDialog()] },
                  ],
                  // --------------------------------------------------------------- 表格工具栏配置
                  headerToolbar: [
                    { align: "right", type: "columns-toggler" },
                  ],
                  footerToolbar: [
                    { align: "right", type: "pagination" },
                    { align: "right", type: "switch-per-page" },
                    { align: "right", type: "statistics" },
                  ],
                },
              },
              {
                title: "ui权限",
                body: {
                  type: "crud",
                  // --------------------------------------------------------------- 常规配置
                  perPageAvailable: [10, 20, 50, 100],
                  syncLocation: false,
                  draggable: false,
                  hideQuickSaveBtn: false,
                  autoJumpToTopOnPagerChange: false,
                  affixHeader: false,
                  syncResponse2Query: true,
                  // --------------------------------------------------------------- 请求数据配置
                  api: {
                    method: "get",
                    url: apiPath.UiPermissionController.pageQuery,
                    data: {
                      pageNo: "$pageNo",
                      pageSize: "$pageSize",
                      domainId: "$location.query.domainId",
                      uiName: "$uiName",
                    },
                  },
                  defaultParams: { pageNo: 1, pageSize: 10 },
                  pageField: "pageNo",
                  perPageField: "pageSize",
                  // --------------------------------------------------------------- 查询条件表单配置
                  // 条件过滤表单
                  filterTogglable: true,
                  filter: {
                    title: "",
                    className: classnames(FormClassName.label4x, FormClassName.input12x),
                    trimValues: true,
                    submitOnChange: false,
                    // submitText: "查询",
                    controls: [
                      { type: "text", label: "ui名称", name: "uiName", placeholder: "支持模糊搜索", clearable: true },
                      { label: "查询", level: "primary", type: "submit" },
                      { label: "重置", type: "reset" },
                    ],
                  },
                  // --------------------------------------------------------------- 表格列配置
                  primaryField: "id",
                  columns: [
                    { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
                    { name: "uiName", label: "ui名称", sortable: false },
                    { name: "title", label: "标题", sortable: false },
                    { name: "enabled", label: "启用授权", type: "mapping", map: enum2object(enabled) },
                    { name: "createAt", label: "创建时间", sortable: true },
                    { name: "updateAt", label: "更新时间", sortable: true },
                    { type: "operation", label: "操作", width: 120, toggled: true, buttons: [RemoveDialog()] },
                  ],
                  // --------------------------------------------------------------- 表格工具栏配置
                  headerToolbar: [
                    { align: "right", type: "columns-toggler" },
                  ],
                  footerToolbar: [
                    { align: "right", type: "pagination" },
                    { align: "right", type: "switch-per-page" },
                    { align: "right", type: "statistics" },
                  ],
                },
              },
              {
                title: "菜单权限",
                body: {
                  type: "crud",
                  // --------------------------------------------------------------- 常规配置
                  perPageAvailable: [10, 20, 50, 100],
                  syncLocation: false,
                  draggable: false,
                  hideQuickSaveBtn: false,
                  autoJumpToTopOnPagerChange: false,
                  affixHeader: false,
                  syncResponse2Query: true,
                  // --------------------------------------------------------------- 请求数据配置
                  api: {
                    method: "get",
                    url: apiPath.MenuPermissionController.pageQuery,
                    data: {
                      pageNo: "$pageNo",
                      pageSize: "$pageSize",
                      domainId: "$location.query.domainId",
                      name: "$name",
                    },
                  },
                  defaultParams: { pageNo: 1, pageSize: 10 },
                  pageField: "pageNo",
                  perPageField: "pageSize",
                  // --------------------------------------------------------------- 查询条件表单配置
                  // 条件过滤表单
                  filterTogglable: true,
                  filter: {
                    title: "",
                    className: classnames(FormClassName.label4x, FormClassName.input12x),
                    trimValues: true,
                    submitOnChange: false,
                    // submitText: "查询",
                    controls: [
                      { type: "text", label: "菜单名称", name: "name", placeholder: "支持模糊搜索", clearable: true },
                      { label: "查询", level: "primary", type: "submit" },
                      { label: "重置", type: "reset" },
                    ],
                  },
                  // --------------------------------------------------------------- 表格列配置
                  primaryField: "id",
                  columns: [
                    { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
                    { name: "name", label: "菜单名称", sortable: false },
                    { name: "path", label: "菜单路径", sortable: false },
                    { name: "title", label: "标题", sortable: false },
                    { name: "enabled", label: "启用授权", type: "mapping", map: enum2object(enabled) },
                    { name: "menuSort", label: "菜单排序", sortable: false },
                    { name: "createAt", label: "创建时间", sortable: true },
                    { name: "updateAt", label: "更新时间", sortable: true },
                    { type: "operation", label: "操作", width: 120, toggled: true, buttons: [RemoveDialog()] },
                  ],
                  // --------------------------------------------------------------- 表格工具栏配置
                  headerToolbar: [
                    { align: "right", type: "columns-toggler" },
                  ],
                  footerToolbar: [
                    { align: "right", type: "pagination" },
                    { align: "right", type: "switch-per-page" },
                    { align: "right", type: "statistics" },
                  ],
                },
              },
            ]
          }
        },
      ]
    },
  ],
};

/** 新增用户对话框 */
function addDialog() {
  return {
    label: "新增",
    icon: "fa fa-plus",
    actionType: "dialog",
    dialog: {
      title: "新增数据域-",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "post",
          url: apiPath.UserController.addUser,
        },
        trimValues: true,
        controls: [
          {
            type: "text", name: "name", label: "域名称", placeholder: "请输入域名称",
            required: true, validations: { minLength: 4, maxLength: 100 }, validationErrors: {},
          },
          {
            type: "text", name: "redisNameSpace", label: "Redis前缀", placeholder: "请输入Redis前缀",
            required: true, validations: { minLength: 6, maxLength: 60 }, validationErrors: {},
          },
          {
            type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
            validations: { maxLength: 500 }, validationErrors: {},
          },
        ]
      }
    }
  };
}

/** 移除用户对话框 */
function RemoveDialog() {
  return {
    label: "解绑",
    type: "action",
    actionType: "dialog",
    dialog: {
      title: "提示",
      body: "确定解绑该用户?"
    }
  }
}

/**
 * 删除角色
 */
function RemoveRoleDialog() {
  return {
    label: "删除",
    type: "button",
    level: "danger",
    actionType: "ajax",
    api: {
      method: "post",
      url: `${apiPath.RoleController.delRole}?id=$id`,
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要删除该角色: ${name}?",
  };
}

export { schema, amisPageName, initGlobalData, shouldPageUpdate, pageDidUpdate }
