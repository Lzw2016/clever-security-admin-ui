import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { enabled, exist, isHideMenu, user } from "../enum-data";

let globalData: AmisPageGlobalData | undefined;

/** 初始化全局数据 */
const initGlobalData: AmisPage["initGlobalData"] = initGlobalData => {
  globalData = initGlobalData;
}

/** 是否需要更新页面 */
const shouldPageUpdate: AmisPage["shouldPageUpdate"] = nextGlobalData => {
  const { location: { query } } = nextGlobalData;
  let flag = true;
  if (globalData?.location?.query && query && globalData?.location?.query.domainId === query.domainId) {
    flag = false;
  }
  globalData = nextGlobalData;
  return flag;
}

/** 获取多标签页显示页签名 */
const getTabTitle: AmisPage["getTabTitle"] = (defaultName, currentMenu, location, match) => {
  if (location.query?.name) return `${defaultName}-${location.query.name}`;
  return defaultName;
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
          { name: "hideMenu", label: "隐藏当前菜单和子菜单", type: "mapping", map: enum2object(isHideMenu) },
          { name: "hideChildrenMenu", label: "隐藏子菜单", type: "mapping", map: enum2object(isHideMenu) },
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

// -------------------------------------------------------------------------------------------------------------------------------------------------------

interface CrudTemplateParam {
  api: any;
  filter: any;
  primaryField: any;
  columns: any[];
  bulkActions: any[];
  headerToolbar: any[];
  extProps: any;
}

/** CRUD模版代码 */
function crudTemplate({ api, filter, primaryField, columns, bulkActions, headerToolbar, extProps }: CrudTemplateParam) {
  return {
    type: "crud",
    // --------------------------------------------------------------- 常规配置
    perPageAvailable: [10, 20, 50, 100],
    syncLocation: false,
    // labelTpl: "${id}",
    draggable: false,
    hideQuickSaveBtn: false,
    autoJumpToTopOnPagerChange: false,
    affixHeader: false,
    syncResponse2Query: true,
    // --------------------------------------------------------------- 请求数据配置
    api: api,
    defaultParams: { pageNo: 1, pageSize: 10 },
    pageField: "pageNo",
    perPageField: "pageSize",
    // --------------------------------------------------------------- 查询条件表单配置
    // 条件过滤表单
    filterTogglable: true,
    filter: filter,
    // --------------------------------------------------------------- 表格列配置
    primaryField: primaryField,
    columns: [...columns],
    // --------------------------------------------------------------- 表格工具栏配置
    bulkActions: [
      ...bulkActions
    ],
    headerToolbar: [
      ...headerToolbar,
      { align: "left", type: "bulkActions" },
      { align: "right", type: "columns-toggler" },
    ],
    footerToolbar: [
      { align: "right", type: "pagination" },
      { align: "right", type: "switch-per-page" },
      { align: "right", type: "statistics" },
    ],
    ...extProps,
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 数据域信息

/** 数据域信息 */
function domainDetail() {
  return {
    title: "数据域信息",
    body: {
      type: "form",
      mode: "horizontal",
      className: classnames(FormClassName.label5x),
      wrapWithPanel: false,
      initApi: {
        method: "get",
        url: `${apiPath.DomainController.domainDetail}?id=$location.query.domainId`,
      },
      controls: [
        { type: "static", name: "id", label: "域ID" },
        { type: "static", name: "name", label: "域名称" },
        { type: "static", name: "redisNameSpace", label: "Redis前缀" },
        { type: "static", name: "description", label: "说明" },
        { type: "static", name: "createAt", label: "创建时间" },
        { type: "static", name: "updateAt", label: "更新时间" },
      ],
    }
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 用户管理

/** 新增用户对话框 */
function addUser() {
  return {
    label: "新增用户",
    className: "mr-1",
    // icon: "fa fa-plus",
    actionType: "dialog",
    dialog: {
      title: "新增(注册)用户",
      body: ""
    }
  };
}

/** 绑定用户对话框 */
function bindUser() {
  return {
    label: "绑定用户",
    className: "mr-1",
    // icon: "fa fa-plus",
    actionType: "dialog",
    dialog: {
      title: "选择用户绑定到当前域",
      body: ""
    }
  };
}

/** 解绑用户对话框 */
function batchUnbindUser() {
  return {
    label: "解绑用户",
    // icon: "fa fa-times",
    actionType: "ajax",
    // api: {
    //   method: "delete",
    //   url: `${serverHost}/!/amis-api/curd-page@mockDelete?orderId=$orderId`,
    // },
    confirmText: "确定解除选中用户与当前域的绑定?",
  };
}

/** 详情对话框 */
function userDetailsDialog() {
  return {
    type: "button",
    label: "查看",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "用户详情 - ${nickname}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        // mode: "inline",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "uid", label: "用户ID", type: "static" },
          // { name: "avatar", label: "用户头像", type: "static-image", thumbMode: "cover" },
          { name: "nickname", label: "用户昵称", type: "static" },
          { name: "loginName", label: "登录名称", type: "static" },
          { name: "telephone", label: "手机号", type: "static" },
          { name: "email", label: "Email", type: "static" },
          { name: "enabled", label: "是否启用", type: "mapping", map: enum2object(user.enabled) },
          { name: "expiredTime", label: "过期时间", type: "static" },
          { name: "registerChannel", label: "注册渠道", type: "mapping", map: enum2object(user.registerChannel) },
          { name: "fromSource", label: "用户来源", type: "mapping", map: enum2object(user.fromSource) },
          { name: "description", label: "说明", type: "static" },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" }
        ]
      }
    }
  };
}

/** 解绑用户对话框 */
function unbindUser() {
  return {
    label: "解绑",
    type: "button",
    size: "xs",
    actionType: "ajax",
    // api: {
    //   method: "delete",
    //   url: `${apiPath.UserDomainController.delUserDomain}?domainId=$location.query.domainId&uid=$uid`,
    //   adaptor: (payload: any) => ({ ...payload, data: {} }),
    // },
    confirmText: "确定解除用户与当前域的绑定? 昵称: ${nickname}",
  }
}

/** 用户管理叶签 */
function userTab() {
  return {
    title: "用户管理",
    body: crudTemplate({
      api: {
        method: "get",
        url: apiPath.UserController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          orderField: "$orderField",
          sort: "$sort",
          orderBy: "$orderBy",
          orderDir: "$orderDir",
          domainId: "$location.query.domainId",
          userSearchKey: "$userSearchKey",
          enabled: "$enabled",
          registerChannel: "$registerChannel",
          fromSource: "$fromSource",
          expiredTimeStart: "$expiredTimeStart",
          expiredTimeEnd: "$expiredTimeEnd",
          createAtStart: "$createAtStart",
          createAtEnd: "$createAtEnd",
        },
      },
      filter: {
        title: "",
        className: classnames(FormClassName.label4x, FormClassName.input12x, "mb-4"),
        wrapWithPanel: false,
        trimValues: true,
        submitOnChange: false,
        controls: [
          { type: "text", label: "用户信息", name: "userSearchKey", placeholder: "登录名、手机号、邮箱、昵称", clearable: true },
          { type: "select", label: "是否启用", name: "enabled", placeholder: "请选择", clearable: true, options: user.enabled },
          { type: "select", label: "注册渠道", name: "registerChannel", placeholder: "请选择", clearable: true, options: user.registerChannel },
          { type: "select", label: "用户来源", name: "fromSource", placeholder: "请选择", clearable: true, options: user.fromSource },
          { type: "html", html: "<br />" },
          { type: "date", label: "过期时间", name: "expiredTimeStart", placeholder: "过期时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$expiredTimeEnd" },
          { type: "date", label: "过期时间", name: "expiredTimeEnd", placeholder: "过期时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$expiredTimeStart" },
          { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
          { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      primaryField: "uid",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        // { name: "avatar", label: "用户头像" },
        { name: "nickname", label: "昵称", sortable: true },
        { name: "loginName", label: "登录名", sortable: true },
        { name: "telephone", label: "手机号", sortable: true },
        { name: "email", label: "邮箱", sortable: true },
        { name: "enabled", label: "是否启用", sortable: true, type: "mapping", map: enum2object(user.enabled) },
        { name: "expiredTime", label: "过期时间", sortable: true },
        { name: "registerChannel", label: "注册渠道", sortable: true, type: "mapping", map: enum2object(user.registerChannel) },
        { name: "fromSource", label: "用户来源", sortable: true, type: "mapping", map: enum2object(user.fromSource) },
        { name: "createAt", label: "创建时间", sortable: true },
        // { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 80, toggled: true, buttons: [userDetailsDialog(), unbindUser()] },
      ],
      bulkActions: [
        { align: "left", type: 'button', level: '', size: "sm", ...batchUnbindUser() },
      ],
      headerToolbar: [
        { align: "left", type: 'button', level: '', size: "sm", ...addUser() },
        { align: "left", type: 'button', level: '', size: "sm", ...bindUser() },
        // primary danger
      ],
      extProps: { multiple: true, keepItemSelectionOnPageChange: false },
    }),
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 角色管理

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 菜单管理

// ------------------------------------------------------------------------------------------------------------------------------------------------------- UI权限管理

// ------------------------------------------------------------------------------------------------------------------------------------------------------- API权限管理

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
        domainDetail(),
        userTab(),

        {
          title: "角色管理",
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
          title: "菜单管理",
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

        {
          title: "UI权限",
          body: {}
        },

        {
          title: "API权限",
          body: {}
        },
      ]
    },
  ],
};

export { schema, initGlobalData, shouldPageUpdate, getTabTitle }
