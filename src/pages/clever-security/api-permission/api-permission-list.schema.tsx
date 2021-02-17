import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";
import { enum2object, EnumArray } from "@/utils/enum";

const apiExistMapper: EnumArray = [
  { label: "不存在", value: "0" },
  { label: "存在", value: "1" },
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
      title: "数据域详情 - ${permissionId}",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "permissionId", label: "权限id", type: "static" },
          { name: "className", label: "controller类名称", type: "static" },
          { name: "methodName", label: "controller类的方法名称", type: "static" },
          { name: "methodParams", label: "controller类的方法参数签名", type: "static" },
          { name: "apiPath", label: "API接口地址", type: "static" },
          { name: "apiExist", label: "API接口是否存在", type: "mapping", map: enum2object(apiExistMapper) },
          { name: "description", label: "说明", type: "static" },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" }
        ]
      }
    }
  };
}

/** 删除对话框 */
function deleteDialog() {
  return {
    type: "button",
    label: "删除",
    level: "danger",
    size: "xs",
    actionType: "ajax",
    api: {
      method: "delete",
      url: apiPath.ApiPermissionController.delApiPermission,
      data: { id: "${id}" },
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要删除ApiPermission: ${permissionId}?",
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
        url: apiPath.ApiPermissionController.pageQuery,
      },
      defaultParams: { pageNo: 1, pageSize: 10 },
      pageField: "pageNo",
      perPageField: "pageSize",
      // --------------------------------------------------------------- 查询条件表单配置
      // 条件过滤表单
      filterTogglable: true,
      filter: {
        title: "查询条件",
        className: classnames(FormClassName.input12x, FormClassName.input12x),
        trimValues: true,
        submitOnChange: false,
        // submitText: "查询",
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "关键字搜索", name: "name", placeholder: "类名,方法名,参数签名,api地址", clearable: true },
          { type: "select", label: "是否存在", name: "apiExist", options: apiExistMapper, clearable: true },
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
        { name: "permissionId", label: "权限id", sortable: false },
        { name: "apiPath", label: "API接口地址", sortable: true },
        { name: "apiExist", label: "API接口是否存在", sortable: true, type: "mapping", map: enum2object(apiExistMapper) },
        { name: "description", label: "说明", sortable: false },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 120, toggled: true, buttons: [detailsDialog(), deleteDialog()] },
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
