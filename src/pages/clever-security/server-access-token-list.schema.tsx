import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";

// /** 新增对话框 */
// function addDialog() {
//   return {
//     label: "新增",
//     icon: "fa fa-plus",
//     actionType: "dialog",
//     dialog: {
//       title: "新增数据域",
//       body: {
//         type: "form",
//         className: classnames(FormClassName.flex_label5x),
//         api: {
//           method: "post",
//           url: apiPath.DomainController.addDomain,
//         },
//         trimValues: true,
//         controls: [
//           {
//             type: "text", name: "name", label: "域名称", placeholder: "请输入域名称",
//             required: true, validations: { minLength: 4, maxLength: 100 }, validationErrors: {},
//           },
//           {
//             type: "text", name: "redisNameSpace", label: "Redis前缀", placeholder: "请输入Redis前缀",
//             required: true, validations: { minLength: 6, maxLength: 60 }, validationErrors: {},
//           },
//           {
//             type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
//             validations: { maxLength: 500 }, validationErrors: {},
//           },
//         ]
//       }
//     }
//   };
// }

// /** 详情对话框 */
// function detailsDialog() {
//   return {
//     type: "button",
//     label: "查看",
//     level: "info",
//     size: "xs",
//     actionType: "dialog",
//     dialog: {
//       title: "数据域详情 - ${name}",
//       closeOnEsc: true,
//       actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
//       body: {
//         type: "form",
//         className: classnames(FormClassName.flex_label5x),
//         controls: [
//           { type: "static", name: "id", label: "域ID" },
//           { type: "static", name: "name", label: "域名称" },
//           { type: "static", name: "redisNameSpace", label: "Redis前缀" },
//           { type: "static", name: "description", label: "说明" },
//           { type: "static", name: "createAt", label: "创建时间" },
//           { type: "static", name: "updateAt", label: "更新时间" },
//         ]
//       }
//     }
//   };
// }

// /** 编辑对话框 */
// function editDialog() {
//   return {
//     type: "button",
//     label: "编辑",
//     level: "info",
//     size: "xs",
//     actionType: "dialog",
//     dialog: {
//       title: "编辑数据域 - ${name}",
//       body: {
//         type: "form",
//         className: classnames(FormClassName.flex_label5x),
//         api: {
//           method: "put",
//           url: apiPath.DomainController.updateDomain,
//         },
//         controls: [
//           { type: "text", name: "id", label: "域ID", disabled: true },
//           { type: "text", name: "redisNameSpace", label: "Redis前缀", disabled: true },
//           { type: "text", name: "name", label: "域名称" },
//           { type: "textarea", name: "description", label: "说明" },
//         ]
//       }
//     }
//   };
// }

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
        url: apiPath.ServerAccessTokenController.pageQuery,
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
          { type: "text", label: "域名称", name: "domainId", placeholder: "支持模糊匹配", clearable: true },
          { type: "text", label: "Token标签", name: "tag", placeholder: "支持模糊匹配", clearable: true },
          { type: "text", label: "Token名称", name: "tokenName", placeholder: "支持模糊匹配", clearable: true },
          // { type: "text", label: "Token值", name: "tokenValue", placeholder: "支持模糊匹配", clearable: true },
          { type: "text", label: "是否禁用", name: "disable", placeholder: "支持模糊匹配", clearable: true },
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
        { name: "id", label: "TokenID", sortable: true },
        { name: "domainId", label: "域ID", sortable: true },
        // { name: "name", label: "域名称", sortable: false },
        { name: "tag", label: "标签", sortable: true },
        { name: "tokenName", label: "Token名称", sortable: true },
        { name: "tokenValue", label: "Token值", sortable: true },
        { name: "expiredTime", label: "过期时间", sortable: true },
        { name: "disable", label: "是否禁用", sortable: true },
        { name: "description", label: "说明", sortable: true, type: "tpl", tpl: "${description|truncate:20}" },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 120, toggled: true, buttons: [/*detailsDialog(), editDialog(), deleteDialog()*/] },
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
