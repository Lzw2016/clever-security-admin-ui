import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName, GeneralClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { login, register } from "@/pages/clever-security/enum-data";

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "注册详情",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "service",
        body: {
          type: "tabs",
          mode: "radio",
          tabs: [
            {
              title: "注册日志详情",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label5x),
                wrapWithPanel: false,
                controls: [
                  { name: "domainName", label: "域名称", type: "static" },
                  { name: "registerUid", label: "注册成功的用户id", type: "static" },
                  { name: "registerTime", label: "注册时间", type: "static" },
                  { name: "registerIp", label: "注册IP", type: "static" },
                  { name: "registerChannel", label: "注册渠道", type: "static-mapping", map: enum2object(login.channel) },
                  { name: "registerType", label: "注册类型", type: "static-mapping", map: enum2object(login.type) },
                  { name: "requestResult", label: "注册结果", type: "static-mapping", map: enum2object(register.result) },
                  { name: "failReason", label: "注册失败原因", type: "static" },
                  { name: "createAt", label: "创建时间", type: "static" },
                  { name: "description", label: "说明", type: "static" },
                ]
              }
            },
            {
              title: "注册数据",
              className: "p-none",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label5x),
                wrapWithPanel: false,
                controls: [
                  { name: "requestData", type: "editor", label: false, language: "json", disabled: true, size: "lg", className: GeneralClassName.MB_None },
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
        url: apiPath.UserRegisterLogController.pageQuery,
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
        // submitText: "查询",
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "用户信息", name: "userKeyword", placeholder: "登录名、手机号、邮箱、昵称", clearable: true },
          { type: "text", label: "注册IP", name: "registerIp", placeholder: "支持模糊匹配", clearable: true },
          { type: "select", label: "注册方式", name: "registerType", clearable: true, options: login.type },
          { type: "html", html: "<br />" },
          { type: "select", label: "注册渠道", name: "registerChannel", clearable: true, options: login.channel },
          { type: "select", label: "注册结果", name: "requestResult", clearable: true, options: register.result },
          { type: "date", label: "注册时间", name: "registerTimeStart", placeholder: "注册时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "registerTimeEnd" },
          { type: "date", label: "注册时间", name: "registerTimeEnd", placeholder: "注册时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "registerTimeStart" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "domainName", label: "域名称", type: "text" },
        { name: "telephone", label: "手机号", type: "text" },
        { name: "registerIp", label: "注册IP" },
        { name: "registerType", label: "注册方式", type: "mapping", map: enum2object(login.type) },
        { name: "registerChannel", label: "注册渠道", type: "mapping", map: enum2object(login.channel) },
        { name: "requestResult", label: "注册结果", type: "mapping", map: enum2object(register.result) },
        { name: "registerTime", label: "注册时间", type: "text", sortable: true },
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
