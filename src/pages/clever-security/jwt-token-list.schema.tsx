import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { DialogClassName, FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { jwtToken } from "./enum-data";

/** 详情对话框 */
function detailsDialog() {
  return {
    type: "button",
    label: "查看",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "JWT-Token详情 - ${loginName}",
      className: classnames(DialogClassName.width45x),
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "tabs",
        mode: "radio",
        tabs: [
          {
            title: "JWT-Token基础信息",
            body: {
              type: "form",
              mode: "horizontal",
              className: classnames(FormClassName.flex_label6x),
              wrapWithPanel: false,
              controls: [
                { type: "static", name: "id", label: "TokenID" },
                { type: "static", name: "domainName", label: "域名称" },
                { type: "static", name: "token", label: "Token数据", copyable: true, inputClassName: "break-words" },
                { type: "static-mapping", name: "disable", label: "Token状态", map: enum2object(jwtToken.disable) },
                { type: "static", name: "refreshToken", label: "刷新Token", copyable: true },
                { type: "static-mapping", name: "refreshTokenState", label: "刷新Token状态", map: enum2object(jwtToken.refreshTokenState) },
                { type: "static", name: "createAt", label: "创建时间" },
                { type: "static", name: "updateAt", label: "更新时间" },
              ]
            }
          },
          {
            title: "JWT-Token状态信息",
            body: {
              type: "form",
              mode: "horizontal",
              className: classnames(FormClassName.flex_label9x),
              wrapWithPanel: false,
              controls: [
                { type: "static", name: "expiredTime", label: "Token过期时间" },
                { type: "static", name: "disableReason", label: "Token禁用原因" },
                { type: "static", name: "refreshTokenExpiredTime", label: "刷新Token过期时间" },
                { type: "static", name: "refreshTokenUseTime", label: "刷新Token使用时间" },
                { type: "static", name: "refreshCreateTokenId", label: "刷新token创建的 JWT Token ID" },
              ]
            }
          },
          {
            title: "用户信息",
            body: {
              type: "form",
              mode: "horizontal",
              className: classnames(FormClassName.flex_label4x),
              wrapWithPanel: false,
              controls: [
                { type: "static", name: "loginName", label: "登录名" },
                { type: "static", name: "nickname", label: "昵称" },
                { type: "static", name: "telephone", label: "手机号" },
                { type: "static", name: "email", label: "邮箱" },
              ]
            }
          }
        ]
      },
    },
  };
}

/** 禁用Token */
function disableDialog() {
  return {
    type: "button",
    label: "禁用",
    level: "danger",
    size: "xs",
    hiddenOn: "disable === 1",
    actionType: "ajax",
    api: {
      method: "post",
      url: `${apiPath.JwtTokenController.disableJwtToken}?id=$id`,
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要禁用JWT-Token: ${loginName}?",
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
        url: apiPath.JwtTokenController.pageQuery,
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
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "用户信息", name: "userSearchKey", placeholder: "登录名、手机号、邮箱、昵称", clearable: true },
          { type: "select", label: "是否禁用", name: "disable", placeholder: "请选择", clearable: true, options: jwtToken.disable },
          { type: "select", label: "刷新Token", name: "refreshTokenState", placeholder: "请选择", clearable: true, options: jwtToken.refreshTokenState },
          // { type: "text", label: "刷新Token", name: "refreshToken", placeholder: "请输入刷新Token", clearable: true },
          // { type: "text", label: "JWT Token ID", name: "id", placeholder: "请输入JWT Token ID", clearable: true },
          { type: "html", html: "<br />" },
          { type: "date", label: "过期时间", name: "expiredTimeStart", placeholder: "过期时间-开始", format: "YYYY-MM-DD 00:00:00", clearable: true, maxDate: "$expiredTimeEnd" },
          { type: "date", label: "过期时间", name: "expiredTimeEnd", placeholder: "过期时间-结束", format: "YYYY-MM-DD 23:59:59", clearable: true, minDate: "$expiredTimeStart" },
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
        // { name: "id", label: "JwtTokenID", sortable: true },
        // { name: "uid", label: "用户ID", sortable: true },
        { name: "loginName", label: "用户登录名", sortable: true },
        { name: "telephone", label: "用户手机号", sortable: true },
        // { name: "token", label: "JwtToken", sortable: true },
        { name: "expiredTime", label: "Token过期时间", sortable: true },
        { name: "disable", label: "是否禁用", sortable: true, type: "mapping", map: enum2object(jwtToken.disable) },
        { name: "disableReason", label: "禁用原因", sortable: true },
        // { name: "refreshToken", label: "刷新Token", sortable: true },
        // { name: "refreshTokenExpiredTime", label: "刷新Token过期时间", sortable: true },
        { name: "refreshTokenState", label: "刷新Token状态", sortable: true, type: "mapping", map: enum2object(jwtToken.refreshTokenState) },
        // { name: "refreshTokenUseTime", label: "刷新Token使用时间", sortable: true },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 80, toggled: true, buttons: [detailsDialog(), disableDialog()] },
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
