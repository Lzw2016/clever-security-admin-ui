import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { jwtToken, scanCodeLogin } from "./enum-data";

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "扫码登录详情",
      size: "md",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "service",
        api: { method: "get", url: apiPath.ScanCodeLoginController.detailScanCodeLogin, data: { id: "${id}" } },
        body: {
          type: "tabs",
          mode: "radio",
          tabs: [
            {
              title: "扫描二维码信息",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label12x),
                wrapWithPanel: false,
                controls: [
                  { type: "static", name: "domain.name", label: "域名称" },
                  { type: "static", name: "scanCodeLogin.scanCode", label: "二维码内容" },
                  { type: "static-mapping", name: "scanCodeLogin.scanCodeState", label: "二维码状态", map: enum2object(scanCodeLogin.scanCodeState) },
                  { type: "static", name: "scanCodeLogin.expiredTime", label: "扫描二维码过期时间" },
                  { type: "static", name: "scanCodeLogin.bindTokenId", label: "绑定的JWT Token ID" },
                  { type: "static", name: "scanCodeLogin.bindTokenTime", label: "扫描时间" },
                  { type: "static", name: "scanCodeLogin.confirmExpiredTime", label: "确认登录过期时间" },
                  { type: "static", name: "scanCodeLogin.confirmTime", label: "确认登录时间" },
                  { type: "static", name: "scanCodeLogin.getTokenExpiredTime", label: "获取登录Token过期时间" },
                  { type: "static", name: "scanCodeLogin.loginTime", label: "获取登录Token时间" },
                  { type: "static", name: "scanCodeLogin.tokenId", label: "登录生成的JWT Token ID" },
                  { type: "static", name: "scanCodeLogin.invalidReason", label: "二维码失效原因" },
                  { type: "static", name: "scanCodeLogin.createAt", label: "创建时间" },
                  { type: "static", name: "scanCodeLogin.updateAt", label: "更新时间" },
                ]
              }
            },
            {
              title: "扫码信息",
              hiddenOn: "!bindTokenUser && !bindToken",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label6x),
                wrapWithPanel: false,
                controls: [
                  { type: "static", name: "bindTokenUser.loginName", label: "登录名" },
                  { type: "static", name: "bindTokenUser.telephone", label: "手机号" },
                  { type: "static", name: "bindTokenUser.email", label: "邮箱" },
                  { type: "static", name: "bindTokenUser.nickname", label: "昵称" },
                  { type: "divider" },
                  { type: "static", name: "bindToken.id", label: "JWT Token ID" },
                  { type: "static", name: "bindToken.token", label: "JWT Token", copyable: true, inputClassName: "break-words" },
                  { type: "static-mapping", name: "bindToken.disable", label: "Token状态", map: enum2object(jwtToken.disable) },
                  { type: "static", name: "bindToken.expiredTime", label: "过期时间" },
                  { type: "static", name: "bindToken.createAt", label: "创建时间" },
                ]
              }
            },
            {
              title: "登录信息",
              hiddenOn: "!tokenUser && !token",
              body: {
                type: "form",
                mode: "horizontal",
                className: classnames(FormClassName.flex_label6x),
                wrapWithPanel: false,
                controls: [
                  { type: "static", name: "tokenUser.loginName", label: "登录名" },
                  { type: "static", name: "tokenUser.telephone", label: "手机号" },
                  { type: "static", name: "tokenUser.email", label: "邮箱" },
                  { type: "static", name: "tokenUser.nickname", label: "昵称" },
                  { type: "divider" },
                  { type: "static", name: "token.id", label: "JWT Token ID" },
                  { type: "static", name: "token.token", label: "JWT Token", copyable: true, inputClassName: "break-words" },
                  { type: "static-mapping", name: "token.disable", label: "Token状态", map: enum2object(jwtToken.disable) },
                  { type: "static", name: "token.expiredTime", label: "过期时间" },
                  { type: "static", name: "token.createAt", label: "创建时间" },
                ]
              }
            }
          ]
        }
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
        url: apiPath.ScanCodeLoginController.pageQuery,
      },
      defaultParams: { pageNo: 1, pageSize: 10 },
      pageField: "pageNo",
      perPageField: "pageSize",
      // --------------------------------------------------------------- 查询条件表单配置
      // 条件过滤表单
      filterTogglable: true,
      filter: {
        title: "",
        className: classnames(FormClassName.label5x, FormClassName.input12x),
        trimValues: true,
        submitOnChange: false,
        // submitText: "查询",
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "select", label: "二维码状态", name: "scanCodeState", placeholder: "请选择", clearable: true, options: scanCodeLogin.scanCodeState },
          { type: "text", label: "二维码内容", name: "scanCode", placeholder: "请输入扫描二维码内容", clearable: true },
          { type: "text", label: "JWT Token ID", name: "bindTokenId", placeholder: "绑定的JWT Token ID", clearable: true },
          { type: "html", html: "<br />" },
          { type: "date", label: "过期时间", name: "loginTimeStart", placeholder: "登录时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$loginTimeEnd" },
          { type: "date", label: "过期时间", name: "loginTimeEnd", placeholder: "登录时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$loginTimeStart" },
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
        // { name: "domainId", label: "域ID", sortable: true },
        { name: "domainName", label: "域名称", sortable: false },
        { name: "scanCodeState", label: "二维码状态", sortable: true, type: "mapping", map: enum2object(scanCodeLogin.scanCodeState) },
        // { name: "expiredTime", label: "扫描过期时间", sortable: true },
        { name: "bindTokenId", label: "绑定的TokenID", sortable: true },
        { name: "bindTokenTime", label: "扫描时间", sortable: true },
        // { name: "confirmExpiredTime", label: "确认登录过期时间", sortable: true },
        { name: "confirmTime", label: "确认登录时间", sortable: true },
        // { name: "getTokenExpiredTime", label: "登录过期时间", sortable: true },
        { name: "loginTime", label: "登录时间", sortable: true },
        // { name: "tokenId", label: "登录生成的JWT Token ID", sortable: true },
        { name: "invalidReason", label: "二维码失效原因", sortable: true, type: "tpl", tpl: "${invalidReason|truncate:10}" },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
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
