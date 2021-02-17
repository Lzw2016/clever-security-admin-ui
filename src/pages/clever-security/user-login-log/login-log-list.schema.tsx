import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { DialogClassName, FormClassName } from "@/amis-types";
import { enum2object, EnumArray } from "@/utils/enum";

const loginChannelMapper: EnumArray = [
  { label: "PC-Admin", value: 0 },
  { label: "PC-Web", value: 1 },
  { label: "H5", value: 2 },
  { label: "IOS-APP", value: 3 },
  { label: "Android-APP", value: 4 },
  { label: "微信小程序", value: 5 },
];
const loginTypeMapper: EnumArray = [
  { label: "用户名密码", value: 1 },
  { label: "手机号验证码", value: 2 },
  { label: "邮箱验证码", value: 3 },
  { label: "刷新token", value: 4 },
  { label: "微信小程序", value: 5 },
  { label: "扫码登录", value: 6 },
];
const loginStateMapper: EnumArray = [
  { label: "登录成功", value: 1 },
  { label: "登录失败", value: 0 }
];

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "数据域详情 - ${uid}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(DialogClassName.width45x),
        controls: [
          {
            type: "fieldSet",
            title: "登录详情",
            collapsable: true,
            className: classnames(FormClassName.flex_label6x),
            controls: [
              { name: "domainName", label: "域id", type: "static" },
              { name: "loginTime", label: "登录时间", type: "static" },
              { name: "loginIp", label: "登录IP", type: "static" },
              { name: "loginType", label: "登录方式", type: "mapping", map: enum2object(loginTypeMapper) },
              { name: "loginState", label: "登录状态", type: "mapping", map: enum2object(loginStateMapper) },
              { name: "requestData", label: "登录数据", type: "static-json" },
              { name: "description", label: "说明", type: "static" },
              { name: "createAt", label: "创建时间", type: "static" },
            ]
          },
          {
            type: "fieldSet",
            title: "用户数据",
            collapsable: true,
            className: classnames(FormClassName.flex_label5x),
            controls: [
              { type: "static", name: "loginName", label: "登录名" },
              { type: "static", name: "nickname", label: "昵称" },
              { type: "static", name: "telephone", label: "手机号" },
              { type: "static", name: "email", label: "邮箱" },
            ],
          }
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
        url: apiPath.UserLoginLogController.pageQuery,
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
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "IP", name: "loginIp", placeholder: "支持模糊匹配", clearable: true },
          { type: "select", label: "渠道", name: "loginChannel", clearable: true, options: loginChannelMapper },
          { type: "select", label: "方式", name: "loginType", clearable: true, options: loginTypeMapper },
          { type: "select", label: "状态", name: "loginState", clearable: true, options: loginStateMapper },
          { type: "date", label: "登录时间", name: "loginTimeStart", placeholder: "登录时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "loginTimeEnd" },
          { type: "date", label: "登录时间", name: "loginTimeEnd", placeholder: "登录时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "loginTimeStart" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "domainName", label: "所属域", type: "text", sortable: true },
        { name: "loginTime", label: "登录时间", type: "text", sortable: true },
        { name: "loginIp", label: "登录IP", sortable: true },
        { name: "loginType", label: "登录方式", sortable: true, type: "mapping", map: enum2object(loginTypeMapper) },
        { name: "loginState", label: "登录状态", sortable: true, type: "mapping", map: enum2object(loginStateMapper) },
        { name: "createAt", label: "创建时间", sortable: true },
        { type: "operation", label: "操作", width: 120, toggled: true, buttons: [detailsDialog()] },
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
  ],
};

export { schema }
