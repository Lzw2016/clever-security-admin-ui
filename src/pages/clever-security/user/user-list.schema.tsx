import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";
import { enum2object, EnumArray } from "@/utils/enum";
import styles from "./user-list.schema.less";

const enabledMapper: EnumArray = [
  { label: "禁用", value: "0" },
  { label: "启用", value: "1" },
];
const registerChannelMapper: EnumArray = [
  { label: "管理员", value: "0" },
  { label: "PC-Web", value: "1" },
  { label: "H5", value: "2" },
  { label: "IOS-APP", value: "3" },
  { label: "Android-APP", value: "4" },
  { label: "微信小程序", value: "5" },
];

/** 新增对话框 */
function addDialog() {
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

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "数据域详情 - ${nickname}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "uid", label: "UID", type: "static" },
          { name: "avatar", label: "用户头像", type: "static" },
          { name: "nickname", label: "昵称", type: "static" },
          { name: "loginName", label: "登录名", type: "static" },
          { name: "telephone", label: "手机号", type: "static" },
          { name: "email", label: "email", type: "static" },
          { name: "enabled", label: "是否启用", type: "mapping", map: enum2object(enabledMapper), sortable: false },
          { name: "expiredTime", label: "帐号过期时间", type: "static" },
          { name: "registerChannel", label: "用户注册渠道", type: "mapping", map: enum2object(registerChannelMapper), sortable: false },
          { name: "description", label: "说明", type: "static" },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" }
        ]
      }
    }
  };
}

/** 编辑对话框 */
function editDialog() {
  return {
    type: "button",
    label: "编辑",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "编辑数据域 - ${name}",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "put",
          url: apiPath.UserController.updateUser,
        },
        controls: [
          { name: "avatar", label: "头像", type: "image", value: "${avatar}", receiver: apiPath.UserController.updateUser },
          { name: "nickname", label: "昵称", type: "text" },
          { name: "loginName", label: "登录名", type: "text" },
          { name: "telephone", label: "手机号", type: "text" },
          { name: "email", label: "email", type: "text" },
          { name: "enabled", label: "是否启用", type: "select", options: enabledMapper },
          { name: "expiredTime", label: "帐号过期时间", type: "text" },
          { name: "registerChannel", label: "用户注册渠道", type: "select", options: registerChannelMapper, disabled: true },
          { name: "createAt", label: "创建时间", type: "text", disabled: true },
          { name: "updateAt", label: "更新时间", type: "text", disabled: true },
          { type: "textarea", name: "description", label: "说明" },
        ]
      }
    }
  };
}

const schema = {
  type: "page",
  title: "",
  toolbar: [],
  body: [
    {
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
        url: apiPath.UserController.pageQuery,
      },
      defaultParams: { pageNo: 1, pageSize: 10 },
      pageField: "pageNo",
      perPageField: "pageSize",
      // --------------------------------------------------------------- 查询条件表单配置
      // 条件过滤表单
      filterTogglable: true,
      filter: {
        title: "查询条件",
        className: classnames(FormClassName.label4x, FormClassName.input14x),
        trimValues: true,
        submitOnChange: false,
        // submitText: "查询",
        controls: [
          { type: "text", label: "用户名", name: "loginName", placeholder: "支持模糊匹配", clearable: true },
          { type: "text", label: "手机号", name: "telephone", placeholder: "不支持模糊匹配", clearable: true },
          { type: "text", label: "邮箱", name: "email", placeholder: "不支持模糊匹配", clearable: true },
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
        { name: "uid", label: "UID", sortable: true },
        { name: "avatar", label: "用户头像", type: "image", thumbMode: "h-full", className: styles.avatar },
        { name: "nickname", label: "昵称", sortable: true },
        { name: "loginName", label: "登录名", sortable: true },
        { name: "telephone", label: "手机号", sortable: true },
        { name: "email", label: "email", sortable: true },
        { name: "enabled", label: "是否启用", type: "mapping", map: enum2object(enabledMapper), sortable: false },
        { name: "expiredTime", label: "帐号过期时间", sortable: true },
        { name: "registerChannel", label: "用户注册渠道", type: "mapping", map: enum2object(registerChannelMapper), sortable: false },
        { name: "description", label: "说明", sortable: false },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 120, toggled: true, buttons: [detailsDialog(), editDialog(), /*deleteDialog()*/] },
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
  ],
};

export { schema }