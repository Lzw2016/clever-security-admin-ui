import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { validateCode } from "./enum-data";

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "验证码详情 - ${code}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "tabs",
        mode: "radio",
        tabs: [
          {
            title: "验证码信息",
            body: {
              type: "form",
              mode: "horizontal",
              className: classnames(FormClassName.flex_label7x),
              wrapWithPanel: false,
              controls: [
                { type: "static", name: "domainName", label: "域名称" },
                { type: "static", name: "code", label: "验证码" },
                { type: "static", name: "digest", label: "验证码签名" },
                { type: "static-mapping", name: "type", label: "验证码类型", map: enum2object(validateCode.type) },
                { type: "static-mapping", name: "sendChannel", label: "验证码发送渠道", map: enum2object(validateCode.sendChannel) },
                { type: "static", name: "sendTarget", label: "验证码发送目标" },
                { type: "static", name: "expiredTime", label: "验证码过期时间" },
                { type: "static", name: "validateTime", label: "验证码验证时间" },
                { type: "static", name: "createAt", label: "创建时间" },
                { type: "static", name: "updateAt", label: "更新时间" },
              ]
            }
          },
          {
            title: "验证用户信息",
            body: {
              type: "form",
              mode: "horizontal",
              className: classnames(FormClassName.flex_label6x),
              wrapWithPanel: false,
              controls: [
                { type: "static", name: "loginName", label: "用户登录名" },
                { type: "static", name: "telephone", label: "用户手机号" },
                { type: "static", name: "email", label: "用户邮箱" },
                { type: "static", name: "nickname", label: "用户昵称" },
              ]
            }
          }
        ]
      },
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
        url: apiPath.ValidateCodeController.pageQuery,
      },
      defaultParams: { pageNo: 1, pageSize: 10 },
      pageField: "pageNo",
      perPageField: "pageSize",
      // --------------------------------------------------------------- 查询条件表单配置
      // 条件过滤表单
      filterTogglable: true,
      filter: {
        title: "",
        className: classnames(FormClassName.label5x, FormClassName.input14x),
        trimValues: true,
        submitOnChange: false,
        // submitText: "查询",
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "用户信息", name: "userSearchKey", placeholder: "登录名、手机号、邮箱、昵称", clearable: true },
          { type: "select", label: "验证码类型", name: "type", placeholder: "请选择", clearable: true, options: validateCode.type },
          { type: "select", label: "发送渠道", name: "sendChannel", placeholder: "请选择", clearable: true, options: validateCode.sendChannel },
          { type: "html", html: "<br />" },
          { type: "text", label: "发送目标", name: "sendTarget", placeholder: "发送目标手机号或邮箱", clearable: true },
          { type: "date", label: "创建时间", name: "createAtStart", placeholder: "创建时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$createAtEnd" },
          { type: "date", label: "创建时间", name: "createAtEnd", placeholder: "创建时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$createAtStart" },
          { type: "html", html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        // { name: "domainId", label: "域ID", sortable: true },
        { name: "domainName", label: "域名称", sortable: false },
        { name: "loginName", label: "用户登录名", sortable: true },
        // { name: "telephone", label: "用户手机号", sortable: true },
        // { name: "email", label: "用户邮箱", sortable: true },
        { name: "code", label: "验证码", sortable: true },
        { name: "type", label: "验证码类型", sortable: true, type: "mapping", map: enum2object(validateCode.type) },
        { name: "sendChannel", label: "验证码发送渠道", sortable: true, type: "mapping", map: enum2object(validateCode.sendChannel) },
        { name: "sendTarget", label: "验证码发送目标", sortable: true },
        { name: "expiredTime", label: "验证码过期时间", sortable: true },
        { name: "validateTime", label: "验证码验证时间", sortable: true },
        { name: "createAt", label: "创建时间", sortable: true },
        // { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 35, toggled: true, buttons: [detailsDialog()] },
      ],
      // --------------------------------------------------------------- 表格工具栏配置
      headerToolbar: [
        // { align: "left", type: 'button', level: 'primary', size: "sm", ...addDialog() },
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
