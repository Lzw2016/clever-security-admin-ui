import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { apiPermission, enabled, isHideMenu, menuPermission, permission, role, user } from "../enum-data";
import styles from "./domain-detail.schema.less";

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

/** 数据域信息叶签 */
function domainTab() {
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

const userTabOperations = {
  /** 新增用户对话框 */
  addUser: () => {
    return {
      label: "新增用户",
      className: "mr-1",
      icon: "fa fa-plus",
      actionType: "dialog",
      dialog: {
        title: "新增(注册)用户",
        body: ""
      }
    };
  },

  /** 绑定用户对话框 */
  bindUser: () => {
    return {
      label: "绑定用户",
      className: "mr-1",
      icon: "fa fa-plus",
      actionType: "dialog",
      dialog: {
        title: "选择用户绑定到当前域",
        body: ""
      }
    };
  },

  /** 解绑用户对话框 */
  batchUnbindUser: () => {
    return {
      label: "解绑用户",
      icon: "fa fa-times",
      actionType: "ajax",
      // api: {
      //   method: "delete",
      //   url: `${serverHost}/!/amis-api/curd-page@mockDelete?orderId=$orderId`,
      // },
      confirmText: "确定解除选中用户与当前域的绑定?",
    };
  },

  /** 详情对话框 */
  userDetailsDialog: () => {
    return {
      type: "button",
      label: "查看",
      level: "info",
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
  },

  /** 解绑用户对话框 */
  unbindUser: () => {
    return {
      label: "解绑",
      type: "button",
      level: 'danger',
      size: "xs",
      actionType: "ajax",
      // api: {
      //   method: "delete",
      //   url: `${apiPath.UserDomainController.delUserDomain}?domainId=$location.query.domainId&uid=$uid`,
      //   adaptor: (payload: any) => ({ ...payload, data: {} }),
      // },
      confirmText: "确定解除用户与当前域的绑定? 昵称: ${nickname}",
    }
  },
};

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
        { type: "operation", label: "操作", width: 80, buttons: [userTabOperations.userDetailsDialog(), userTabOperations.unbindUser()] },
      ],
      bulkActions: [
        { align: "left", type: 'button', level: 'danger', size: "sm", ...userTabOperations.batchUnbindUser() },
      ],
      headerToolbar: [
        { align: "left", type: 'button', level: 'primary', size: "sm", ...userTabOperations.addUser() },
        { align: "left", type: 'button', level: 'primary', size: "sm", ...userTabOperations.bindUser() },
      ],
      extProps: { multiple: true, keepItemSelectionOnPageChange: false },
    }),
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 角色管理

const roleTabOperations = {
  /** 新增角色 */
  addRole: () => {
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
              enabled: "$enabled",
              description: "$description",
            },
          },
          trimValues: true,
          data: { enabled: 1 },
          controls: [
            { type: "text", name: "name", label: "角色名", placeholder: "请输入角色名", required: true },
            {
              type: "radios", name: "enabled", label: "是否启用", options: role.enabled, columnsCount: role.enabled.length,
              inputClassName: "w-40", required: true,
            },
            {
              type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 3, maxRows: 6,
              validations: { maxLength: 500 },
            },
          ]
        }
      }
    };
  },

  /** 修改角色 */
  updateRole: () => {
    return {
      type: "button",
      label: "编辑",
      level: "info",
      size: "xs",
      actionType: "dialog",
      dialog: {
        title: "修改角色 - ${name}",
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
            { type: "text", name: "id", label: "角色ID", disabled: true },
            { type: "text", name: "name", label: "角色名", placeholder: "请输入角色名", required: true },
            {
              type: "radios", name: "enabled", label: "是否启用", options: role.enabled, columnsCount: role.enabled.length,
              inputClassName: "w-40", required: true,
            },
            {
              type: "textarea", name: "description", label: "说明", placeholder: "请输入",
              minRows: 3, maxRows: 6, validations: { maxLength: 500 },
            },
          ]
        }
      }
    };
  },

  /** 角色绑定权限 */
  roleBindPermissionDialog: () => {
    return {
      type: "button",
      label: "授权",
      level: "info",
      size: "xs",
      actionType: "dialog",
      dialog: {
        title: "角色授权 - ${name}",
        body: {},
      },
    };
  },

  /** 删除角色 */
  removeRole: () => {
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
  },
};

/** 角色管理 */
function roleTab() {
  return {
    title: "角色管理",
    body: crudTemplate({
      api: {
        method: "get",
        url: apiPath.RoleController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          orderField: "$orderField",
          sort: "$sort",
          orderBy: "$orderBy",
          orderDir: "$orderDir",
          domainId: "$location.query.domainId",
          id: "$id",
          name: "$name",
          enabled: "$enabled",
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
          { type: "text", label: "角色名称", name: "name", placeholder: "支持模糊匹配", clearable: true },
          { type: "select", label: "是否启用", name: "enabled", options: enabled, clearable: true },
          { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
          { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "name", label: "角色名称", type: "text", sortable: true },
        { name: "enabled", label: "是否启用", sortable: true, width: 80, type: "mapping", map: enum2object(user.enabled) },
        { name: "description", label: "说明", sortable: true },
        { name: "createAt", label: "创建时间", sortable: true, width: 120 },
        { name: "updateAt", label: "更新时间", sortable: true, width: 120 },
        {
          type: "operation", label: "操作", width: 120,
          buttons: [roleTabOperations.updateRole(), roleTabOperations.roleBindPermissionDialog(), roleTabOperations.removeRole()]
        },
      ],
      bulkActions: [
        // { align: "left", type: 'button', level: 'danger', size: "sm", ...roleTabOperations.batchDisableRole() },
      ],
      headerToolbar: [
        { align: "left", type: 'button', level: 'primary', size: "sm", ...roleTabOperations.addRole() },
      ],
      extProps: { multiple: true, keepItemSelectionOnPageChange: false },
    }),
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- 菜单管理

const menuTabOperations = {
  /** 新增菜单 */
  addMenu: () => {
    return [
      { type: "text", name: "parent.name", label: "上级菜单", placeholder: "空", labelClassName: styles.addMenuLabel, disabled: true },
      { type: "text", name: "name", label: "菜单名称", placeholder: "请输入菜单名称", labelClassName: styles.addMenuLabel, required: true },
      { type: "text", name: "icon", label: "菜单图标", placeholder: "请输入菜单图标", labelClassName: styles.addMenuLabel },
      { type: "text", name: "path", label: "菜单路径", placeholder: "请输入菜单路径", labelClassName: styles.addMenuLabel, required: true },
      { type: "text", name: "pagePath", label: "页面路径", placeholder: "请输入页面路径", labelClassName: styles.addMenuLabel },
      {
        type: "radios", name: "hideMenu", label: "隐藏菜单", placeholder: "隐藏菜单", labelClassName: styles.addMenuLabel, required: true,
        options: menuPermission.hideMenu, columnsCount: menuPermission.hideMenu.length, inputClassName: "w-40", value: "0",
      },
      {
        type: "radios", name: "hideChildrenMenu", label: "隐藏子菜单", placeholder: "隐藏子菜单", labelClassName: styles.addMenuLabel, required: true,
        options: menuPermission.hideChildrenMenu, columnsCount: menuPermission.hideChildrenMenu.length, inputClassName: "w-40", value: "0",
      },
      {
        type: "radios", name: "enabled", label: "是否启用", placeholder: "是否启用", labelClassName: styles.addMenuLabel, required: true,
        options: permission.enabled, columnsCount: permission.enabled.length, inputClassName: "w-40", value: "1",
      },
      // {
      //   type: "editor", name: "extConfig", label: "扩展配置", placeholder: "请输入", language: "json",
      //   mode: "normal", labelClassName: classnames(styles.addMenuLabel, "text-right", "pr-5"),
      // },
      { type: "number", name: "sort", label: "菜单排序", placeholder: "请输入菜单排序(由小到大)", labelClassName: styles.addMenuLabel, required: true, value: 0 },
      {
        type: "textarea", name: "description", label: "说明", placeholder: "请输入说明", labelClassName: styles.addMenuLabel,
        minRows: 3, maxRows: 6, validations: { maxLength: 500 },
      },
    ];
  },

  /** 更新菜单 */
  updateMenu: () => {
    return [
      { type: "text", name: "name", label: "菜单名称", placeholder: "请输入菜单名称", labelClassName: styles.addMenuLabel, required: true },
      { type: "text", name: "icon", label: "菜单图标", placeholder: "请输入菜单图标", labelClassName: styles.addMenuLabel },
      { type: "text", name: "path", label: "菜单路径", placeholder: "请输入菜单路径", labelClassName: styles.addMenuLabel, required: true },
      { type: "text", name: "pagePath", label: "页面路径", placeholder: "请输入页面路径", labelClassName: styles.addMenuLabel },
      {
        type: "radios", name: "hideMenu", label: "隐藏菜单", placeholder: "隐藏菜单", labelClassName: styles.addMenuLabel, required: true,
        options: menuPermission.hideMenu, columnsCount: menuPermission.hideMenu.length, inputClassName: "w-40", value: "0",
      },
      {
        type: "radios", name: "hideChildrenMenu", label: "隐藏子菜单", placeholder: "隐藏子菜单", labelClassName: styles.addMenuLabel, required: true,
        options: menuPermission.hideChildrenMenu, columnsCount: menuPermission.hideChildrenMenu.length, inputClassName: "w-40", value: "0",
      },
      {
        type: "radios", name: "enabled", label: "是否启用", placeholder: "是否启用", labelClassName: styles.addMenuLabel, required: true,
        options: permission.enabled, columnsCount: permission.enabled.length, inputClassName: "w-40", value: "1",
      },
      // {
      //   type: "editor", name: "extConfig", label: "扩展配置", placeholder: "请输入", language: "json",
      //   mode: "normal", labelClassName: classnames(styles.addMenuLabel, "text-right", "pr-5"),
      // },
      { type: "number", name: "sort", label: "菜单排序", placeholder: "请输入菜单排序(由小到大)", labelClassName: styles.addMenuLabel, required: true, value: 0 },
      {
        type: "textarea", name: "description", label: "说明", placeholder: "请输入说明", labelClassName: styles.addMenuLabel,
        minRows: 3, maxRows: 6, validations: { maxLength: 500 },
      },
    ];
  },

  /** menu权限详情 */
  menuDetail: () => {
    return {
      type: "button",
      label: "查看",
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
  },
};

function menuTab() {
  return {
    title: "菜单管理",
    body: {
      type: "page",
      title: "",
      asideClassName: classnames(styles.menuTabAside),
      bodyClassName: classnames(styles.menuTabBody),
      aside: {
        name: "menuTreeForm",
        type: "form",
        target: "menuDetailForm",
        wrapWithPanel: false,
        submitOnChange: true,
        // debug: true,
        controls: [
          {
            type: "tree", name: "selectedMenu", label: false, initiallyOpen: true, showIcon: true,
            rootCreateTip: "新增一级菜单", labelField: "name", valueField: "id", optionLabel: "菜单",
            joinValues: false, extractValue: false, source: {
              method: "get",
              url: apiPath.MenuPermissionController.menuTree,
              data: { domainId: "$location.query.domainId" },
              adaptor: (payload: any) => {
                const { data, ...other } = payload;
                return { ...other, data: { options: data } };
              },
            },
            creatable: true, addControls: menuTabOperations.addMenu(), addApi: {
              method: "post",
              url: apiPath.MenuPermissionController.addMenuPermission,
              data: { "&": "$$", domainId: "$location.query.domainId", parentId: "${parent.id}" },
              adaptor: (payload: any) => ({ ...payload, data: {} }),
            },
            editable: true, editControls: menuTabOperations.updateMenu(), editApi: {
              method: "put",
              url: apiPath.MenuPermissionController.updateMenuPermission,
              data: { "&": "$$", id: "${id}" },
              adaptor: (payload: any) => ({ ...payload, data: {} }),
            },
            removable: true, deleteConfirmText: "确定删掉当前菜单(包含子菜单)?", deleteApi: {
              method: "delete",
              url: `${apiPath.MenuPermissionController.delMenuPermission}?id=$id`,
              adaptor: (payload: any) => ({ ...payload, data: {} }),
            },
          },
        ]
      },
      body: [
        {
          name: "menuDetailForm",
          type: "form",
          mode: "horizontal",
          className: classnames(FormClassName.label7x),
          wrapWithPanel: false,
          // debug: true,
          controls: [
            { type: "tpl", tpl: "<h3>菜单详情 - ${selectedMenu.name}</h3>" },
            { type: "divider" },
            {
              type: "fieldSet",
              title: "菜单信息",
              hiddenOn: "!this.selectedMenu",
              controls: [
                { type: "static", name: "selectedMenu.name", label: "菜单名称" },
                { type: "static", name: "selectedMenu.icon", label: "菜单图标" },
                { type: "static", name: "selectedMenu.path", label: "菜单路径" },
                { type: "static", name: "selectedMenu.pagePath", label: "页面路径" },
                { type: "static-mapping", name: "selectedMenu.hideMenu", label: "隐藏当前菜单", map: enum2object(menuPermission.hideMenu) },
                { type: "static-mapping", name: "selectedMenu.hideChildrenMenu", label: "隐藏子菜单", map: enum2object(menuPermission.hideChildrenMenu) },
                { type: "static", name: "selectedMenu.sort", label: "菜单排序" },
                { type: "static", name: "selectedMenu.description", label: "说明" },
                { type: "static", name: "selectedMenu.createAt", label: "创建时间" },
                { type: "static", name: "selectedMenu.updateAt", label: "更新时间" },
              ],
            },
            { type: "divider", lineStyle: "dashed", hiddenOn: "!this.selectedMenu", },
            {
              type: "fieldSet",
              title: "菜单扩展配置",
              collapsable: true,
              collapsed: true,
              hiddenOn: "!this.selectedMenu",
              controls: [
                { type: "editor", name: "selectedMenu.extConfig", label: false, language: "json", disabled: true },
              ],
            },
            { type: "divider", lineStyle: "dashed", hiddenOn: "!this.selectedMenu", },
            {
              type: "fieldSet",
              title: "权限信息",
              collapsable: true,
              collapsed: true,
              hiddenOn: "!this.selectedMenu",
              controls: [
                { type: "static", name: "selectedMenu.strFlag", label: "权限字符串" },
                { type: "static-mapping", name: "selectedMenu.permissionType", label: "权限类型", map: enum2object(permission.permissionType) },
                { type: "static-mapping", name: "selectedMenu.enabled", label: "是否启用", map: enum2object(permission.enabled) },
              ],
            },
          ],
        },
      ],
    },
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- UI权限管理

const uiTabOperations = {
  /** ui权限详情 */
  uiDetail: () => {
    return {
      type: "button",
      label: "查看",
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
  },
};

function uiTab() {
  return {
    title: "UI权限管理",
    body: crudTemplate({
      api: {
        method: "get",
        url: apiPath.MenuPermissionController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          orderField: "$orderField",
          sort: "$sort",
          orderBy: "$orderBy",
          orderDir: "$orderDir",
          domainId: "$location.query.domainId",
          uiName: "$uiName",
        },
      },
      filter: {
        title: "",
        className: classnames(FormClassName.label4x, FormClassName.input12x, "mb-4"),
        wrapWithPanel: false,
        trimValues: true,
        submitOnChange: false,
        controls: [
          { type: "text", label: "ui名称", name: "uiName", placeholder: "支持模糊搜索", clearable: true },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "uiName", label: "ui名称", sortable: false },
        { name: "title", label: "标题", sortable: false },
        { name: "enabled", label: "启用授权", type: "mapping", map: enum2object(enabled) },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 35, buttons: [uiTabOperations.uiDetail()] },
      ],
      bulkActions: [
        // { align: "left", type: 'button', level: 'danger', size: "sm", ...roleTabOperations.batchDisableRole() },
      ],
      headerToolbar: [
        // { align: "left", type: 'button', level: 'primary', size: "sm", ...roleTabOperations.addRole() },
      ],
      extProps: { multiple: true, keepItemSelectionOnPageChange: false },
    }),
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- API权限管理

const apiTabOperations = {
  /** API权限详情 */
  apiDetailDialog: () => {
    return {
      type: "button",
      label: "查看",
      level: "info",
      size: "xs",
      actionType: "dialog",
      dialog: {
        title: "API权限详情 - ${title}",
        size: "md",
        closeOnEsc: true,
        actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
        body: {
          type: "tabs",
          mode: "radio",
          tabs: [
            {
              title: "权限信息",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label6x),
                wrapWithPanel: false,
                controls: [
                  { name: "strFlag", label: "权限字符串", type: "static" },
                  { name: "title", label: "API标题", type: "static" },
                  // { name: "permissionType", label: "权限类型", type: "static-mapping", map: enum2object(apiPermission.permissionType) },
                  { name: "apiPath", label: "API接口地址", type: "static" },
                  { name: "enabled", label: "是否启用授权", type: "static-mapping", map: enum2object(permission.enabled) },
                  { name: "description", label: "权限说明", type: "static" },
                  { name: "createAt", label: "创建时间", type: "static" },
                  { name: "updateAt", label: "更新时间", type: "static" },
                ]
              },
            },
            {
              title: "Controller信息",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label9x),
                wrapWithPanel: false,
                controls: [
                  { name: "apiPath", label: "API接口地址", type: "static" },
                  { name: "className", label: "Controller类名称", type: "static" },
                  { name: "methodName", label: "Controller函数名称", type: "static" },
                  { name: "methodParams", label: "Controller函数参数", type: "static" },
                  { name: "apiExist", label: "接口是否存在", type: "static-mapping", map: enum2object(apiPermission.apiExist) },
                ]
              },
            },
          ],
        },
      }
    };
  },

  /** 更新API权限 */
  updateApi: () => {
    return {
      type: "button",
      label: "编辑",
      level: "info",
      size: "xs",
      actionType: "dialog",
      dialog: {
        title: "编辑API权限 - ${title}",
        body: {
          type: "form",
          className: classnames(FormClassName.flex_label6x),
          trimValues: true,
          api: {
            // method: "put",
            // url: apiPath.RoleController.addRole,
            data: {
              domainId: "$location.query.domainId",
              strFlag: "$strFlag",
              title: "$title",
              enabled: "$enabled",
              description: "$description",
            },
          },
          controls: [
            { type: "text", name: "strFlag", label: "权限字符串", placeholder: "请输入权限字符串", required: true },
            { type: "text", name: "title", label: "API标题", placeholder: "请输入API标题", required: true },
            {
              type: "radios", name: "enabled", label: "启用授权", options: permission.enabled, columnsCount: permission.enabled.length,
              inputClassName: "w-40", required: true,
            },
            {
              type: "textarea", name: "description", label: "权限说明", placeholder: "请输入权限说明",
              minRows: 3, maxRows: 6, validations: { maxLength: 500 },
            },
          ]
        }
      },
    };
  },

  /** 删除API权限 */
  delApi: () => {
    return {
      label: "删除",
      type: "button",
      level: 'danger',
      size: "xs",
      actionType: "ajax",
      // api: {
      //   method: "delete",
      //   url: `${apiPath.UserDomainController.delUserDomain}?domainId=$location.query.domainId&uid=$uid`,
      //   adaptor: (payload: any) => ({ ...payload, data: {} }),
      // },
      confirmText: "确定删除API权限数据: ${title}?",
    }
  },

  /** 禁用API权限 */
  batchDisableApi: () => {
    return {
      label: "取消授权",
      className: "mr-1",
      icon: "fa fa-times",
      actionType: "ajax",
      // api: {
      //   method: "delete",
      //   url: `${serverHost}/!/amis-api/curd-page@mockDelete?orderId=$orderId`,
      // },
      confirmText: "确定批量取消选中API权限授权?",
    };
  },

  /** 删除API权限 */
  batchDelApi: () => {
    return {
      label: "批量删除",
      className: "mr-1",
      icon: "fa fa-times",
      actionType: "ajax",
      // api: {
      //   method: "delete",
      //   url: `${serverHost}/!/amis-api/curd-page@mockDelete?orderId=$orderId`,
      // },
      confirmText: "确定批量删除选中API权限?",
    };
  },
};

function apiTab() {
  return {
    title: "API权限",
    body: crudTemplate({
      api: {
        method: "get",
        url: apiPath.ApiPermissionController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          orderField: "$orderField",
          sort: "$sort",
          orderBy: "$orderBy",
          orderDir: "$orderDir",
          domainId: "$location.query.domainId",
          title: "$title",
          className: "$className",
          methodName: "$methodName",
          apiPath: "$apiPath",
          apiExist: "$apiExist",
          enabled: "$enabled",
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
          { type: "text", label: "API标题", name: "title", placeholder: "API标题(支持模糊匹配)", clearable: true },
          { type: "text", label: "API类名称", name: "className", placeholder: "API类名称(支持模糊匹配)", clearable: true },
          { type: "text", label: "函数名称", name: "methodName", placeholder: "函数名称(支持模糊匹配)", clearable: true },
          { type: "text", label: "接口地址", name: "apiPath", placeholder: "API接口地址(支持模糊匹配)", clearable: true },
          { type: "html", html: "<br />" },
          { type: "select", label: "是否存在", name: "apiExist", options: apiPermission.apiExist, clearable: true },
          { type: "select", label: "启用授权", name: "enabled", options: permission.enabled, clearable: true },
          { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
          { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "title", label: "API标题", sortable: true },
        { name: "apiPath", label: "API地址", sortable: true },
        // { name: "className", label: "类型名称", sortable: true, type: "tpl", tpl: "${className|split:.|last}" },
        { name: "methodName", label: "Controller函数名称", sortable: true },
        // { name: "methodName", label: "API入口函数", type: "tpl", tpl: "${className}#${methodName}" },
        // { name: "methodParams", label: "函数参数", sortable: true },
        { name: "enabled", label: "是否启用授权", sortable: true, type: "mapping", map: enum2object(permission.enabled) },
        { name: "apiExist", label: "是否存在", sortable: true, type: "mapping", map: enum2object(apiPermission.apiExist) },
        // { name: "description", label: "说明", sortable: true },
        // { name: "createAt", label: "创建时间", sortable: true },
        // { name: "updateAt", label: "更新时间", sortable: true },
        {
          type: "operation", label: "操作", width: 120,
          buttons: [apiTabOperations.apiDetailDialog(), apiTabOperations.updateApi(), apiTabOperations.delApi()]
        },
      ],
      bulkActions: [
        { align: "left", type: 'button', level: 'danger', size: "sm", ...apiTabOperations.batchDelApi() },
        { align: "left", type: 'button', level: 'danger', size: "sm", ...apiTabOperations.batchDisableApi() },
      ],
      headerToolbar: [],
      extProps: { multiple: true, keepItemSelectionOnPageChange: false },
    }),
  };
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------- schema

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
        // 数据域信息
        domainTab(),
        // 用户管理
        userTab(),
        // 角色管理
        roleTab(),
        // 菜单管理
        menuTab(),
        // UI权限管理
        uiTab(),
        // API权限管理
        apiTab(),
      ]
    },
  ],
};

export { schema, initGlobalData, shouldPageUpdate, getTabTitle }
