import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName, GeneralClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { login } from "@/pages/clever-security/enum-data";

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "登录详情 - ${uid}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "service",
        body: {
          type: "tabs",
          mode: "radio",
          tabs: [
            {
              title: "登录日志详情",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label5x),
                wrapWithPanel: false,
                controls: [
                  { name: "domainName", label: "域名", type: "static" },
                  { name: "loginTime", label: "登录时间", type: "static" },
                  { name: "loginIp", label: "登录IP", type: "static" },
                  { name: "loginType", label: "登录方式", type: "static-mapping", map: enum2object(login.type) },
                  { name: "loginState", label: "登录状态", type: "static-mapping", map: enum2object(login.state) },
                  { name: "createAt", label: "创建时间", type: "static" },
                  { name: "description", label: "说明", type: "static" },
                ]
              }
            },
            {
              title: "登录数据",
              className: "p-none",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label5x),
                wrapWithPanel: false,
                controls: [
                  { name: "requestData", type: "editor", label: false, language: "json", disabled: true, className: GeneralClassName.MB_None },
                ],
              }
            },
            {
              title: "用户信息",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label5x),
                wrapWithPanel: false,
                controls: [
                  { type: "static", name: "loginName", label: "登录名" },
                  { type: "static", name: "nickname", label: "昵称" },
                  { type: "static", name: "telephone", label: "手机号" },
                  { type: "static", name: "email", label: "邮箱" },
                ],
              }
            }
          ]
        }
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
          { type: "text", label: "登录IP", name: "loginIp", placeholder: "支持模糊匹配", clearable: true },
          { type: "select", label: "登录方式", name: "loginType", clearable: true, options: login.type },
          { type: "select", label: "登录渠道", name: "loginChannel", clearable: true, options: login.channel },
          { type: "html", html: "<br />" },
          { type: "select", label: "登录状态", name: "loginState", clearable: true, options: login.state },
          { type: "date", label: "登录时间", name: "loginTimeStart", placeholder: "登录时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "loginTimeEnd" },
          { type: "date", label: "登录时间", name: "loginTimeEnd", placeholder: "登录时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "loginTimeStart" },
          { type: "html", html: "&nbsp;&nbsp;&nbsp;" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "domainName", label: "域名称", type: "text" },
        { name: "loginTime", label: "登录时间", type: "text", sortable: true },
        { name: "loginIp", label: "登录IP", type: "text" },
        { name: "loginType", label: "登录方式", type: "mapping", map: enum2object(login.type) },
        { name: "loginChannel", label: "登录渠道", type: "mapping", map: enum2object(login.channel) },
        { name: "loginState", label: "登录状态", type: "mapping", map: enum2object(login.state) },
        { name: "createAt", label: "创建时间", sortable: true },
        { type: "operation", label: "操作", width: 35, toggled: true, buttons: [detailsDialog()] },
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
