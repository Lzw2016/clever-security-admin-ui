import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { enabled, exist, ishideMenu } from "../enum-data";
import styles from "./domain-detail.schema.less";

const amisPageName = "domainId";

let globalData: AmisPageGlobalData | undefined;

const initGlobalData: AmisPage["initGlobalData"] = initGlobalData => {
  globalData = initGlobalData;
}

const shouldPageUpdate: AmisPage["shouldPageUpdate"] = nextGlobalData => {
  const { location: { query } } = nextGlobalData;
  let flag = true;
  if (globalData?.location?.query && query && globalData?.location?.query.domainId === query.domainId) {
    flag = false;
  }
  globalData = nextGlobalData;
  return flag;
}

const getTabTitle: AmisPage["getTabTitle"] = (defaultName, currentMenu, location, match) => {
  if (location.query?.name) return `${defaultName}-${location.query.name}`;
  return defaultName;
}

/** 新增用户对话框(未完成) */
function addUser() {
  return {
    label: "新增",
    icon: "fa fa-plus",
    actionType: "dialog",
    dialog: {
      title: "新增数据域",
      body: ""
    }
  };
}

/** 解绑用户对话框 */
function untieUser() {
  return {
    label: "解绑",
    type: "button",
    size: "xs",
    actionType: "ajax",
    api: {
      method: "delete",
      url: `${apiPath.UserDomainController.delUserDomain}?domainId=$location.query.domainId&uid=$uid`,
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要解绑该用户: ${nickname}?",
  }
}

/** 删除角色 */
function removeRole() {
  return {
    label: "删除",
    type: "button",
    size: "xs",
    level: "danger",
    actionType: "ajax",
    api: {
      method: "delete",
      url: `${apiPath.RoleController.delRole}?domainId=$location.query.domainId&id=$id`,
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要删除该角色: ${name}?",
  };
}

/** 新增角色 */
function addRole() {
  return {
    label: "新增",
    icon: "fa fa-plus",
    actionType: "dialog",
    dialog: {
      title: "新增数据域",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "post",
          url: apiPath.RoleController.addRole,
          data: {
            domainId: "$location.query.domainId",
            name: "$name",
            description: "$description",
          },
        },
        trimValues: true,
        controls: [
          { type: "text", name: "name", label: "角色名", placeholder: "请输入角色名", required: true },
          {
            type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
            validations: { maxLength: 500 }, validationErrors: {},
          },
        ]
      }
    }
  };
}

/** 修改角色 */
function updateRole() {
  return {
    type: "button",
    label: "编辑",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "修改角色",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "put",
          url: apiPath.RoleController.updateRole,
          data: {
            domainId: "$location.query.domainId",
            id: "$id",
            name: "$name",
            enabled: "$enabled",
            description: "$description",
          },
        },
        controls: [
          { type: "text", name: "id", label: "ID", disabled: true },
          { type: "text", name: "name", label: "角色名称", },
          { type: "select", name: "enabled", label: "是否启用", options: enabled },
          {
            type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
            validations: { maxLength: 500 }, validationErrors: {},
          },
        ]
      }
    }
  };
}

/** api权限详情 */
function apiDetail() {
  return {
    type: "button",
    label: "详情",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "api权限详情",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "className", label: "controller类名称", type: "static" },
          { name: "methodName", label: "controller类的方法名称", type: "static" },
          { name: "methodParams", label: "controller类的方法参数签名", type: "static" },
          { name: "apiPath", label: "API接口地址", type: "static" },
          { name: "apiExist", label: "API接口是否存在", type: "static-mapping", map: enum2object(exist) },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" },
          { type: "static", name: "description", label: "说明" },
        ]
      }
    }
  };
}

/** ui权限详情 */
function uiDetail() {
  return {
    type: "button",
    label: "详情",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "ui权限详情",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "uiName", label: "UI组件名", type: "static" },
          { name: "title", label: "标题", type: "static" },
          { name: "enabled", label: "是否启用", type: "static-mapping", map: enum2object(enabled) },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" },
          { name: "description", label: "描述", type: "static" },
        ]
      }
    }
  };
}

/** menu权限详情 */
function menuDetail() {
  return {
    type: "button",
    label: "详情",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "菜单权限详情",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "name", label: "菜单名称", type: "text" },
          { name: "icon", label: "菜单图标", type: "text" },
          { name: "path", label: "菜单路径", type: "text" },
          { name: "pagePath", label: "页面路径", type: "text" },
          { name: "hideMenu", label: "隐藏当前菜单和子菜单", type: "mapping", map: enum2object(ishideMenu) },
          { name: "hideChildrenMenu", label: "隐藏子菜单", type: "mapping", map: enum2object(ishideMenu) },
          { name: "extConfig", label: "菜单扩展配置", type: "text" },
          { name: "menuSort", label: "菜单排序", type: "text" },
          { name: "title", label: "标题", type: "text" },
          { name: "enabled", label: "启用授权", type: "mapping", map: enum2object(enabled) },
          { name: "createAt", label: "创建时间", type: "text" },
          { name: "updateAt", label: "更新时间", type: "text" },
          { name: "description", label: "说明", type: "text" },
        ]
      }
    }
  };
}

const schema = {
  type: "page",
  name: "page",
  title: "",
  toolbar: [],
  body: [
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
            className: classnames(FormClassName.label5x),
            wrapWithPanel: false,
            controls: [
              { type: "static", name: "location.query.domainId", label: "域ID" },
              { type: "static", name: "location.query.name", label: "域名称" },
              { type: "static", name: "location.query.redisNameSpace", label: "Redis前缀" },
              { type: "static", name: "location.query.description", label: "说明" },
              { type: "static", name: "location.query.createAt", label: "创建时间" },
              { type: "static", name: "location.query.updateAt", label: "更新时间" },
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
              { type: "operation", label: "操作", width: 35, toggled: true, buttons: [untieUser()] },
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            headerToolbar: [
              { align: "left", type: 'button', level: 'primary', size: "sm", ...addUser() },
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
                id: "$id",
                name: "$name",
                enabled: "$enabled",
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
                { type: "text", label: "角色名称", name: "name", placeholder: "支持模糊匹配", clearable: true },
                { type: "select", label: "是否启用", name: "enabled", options: enabled, clearable: true },
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
              { type: "operation", label: "操作", width: 80, toggled: true, buttons: [updateRole(), removeRole()] },
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            headerToolbar: [
              { align: "left", type: 'button', level: 'primary', size: "sm", ...addRole() },
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
                title: "API权限",
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
                    { name: "methodName", label: "方法名", sortable: false },
                    { name: "apiPath", label: "API接口地址", sortable: true },
                    { name: "apiExist", label: "API接口是否存在", sortable: true, type: "mapping", map: enum2object(exist) },
                    { name: "description", label: "说明", sortable: false },
                    { name: "createAt", label: "创建时间", sortable: true },
                    { name: "updateAt", label: "更新时间", sortable: true },
                    { type: "operation", label: "操作", width: 35, toggled: true, buttons: [apiDetail()] },
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
                title: "UI权限",
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
                    { type: "operation", label: "操作", width: 35, toggled: true, buttons: [uiDetail()] },
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
                    { type: "operation", label: "操作", width: 35, toggled: true, buttons: [menuDetail()] },
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

export { schema, amisPageName, initGlobalData, shouldPageUpdate, getTabTitle }
