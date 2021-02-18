import { apiPath } from "@/api/clever-security-api";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";
import { enum2object } from "@/utils/enum";
import { scanCodeLogin } from "./enum-data";

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
        // { name: "tokenId", label: "登录生成的JWT-Token-ID", sortable: true },
        { name: "invalidReason", label: "二维码失效原因", sortable: true, type: "tpl", tpl: "${invalidReason|truncate:10}" },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        // { type: "operation", label: "操作", width: 80, toggled: true, buttons: [detailsDialog(), disableDialog()] },
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
