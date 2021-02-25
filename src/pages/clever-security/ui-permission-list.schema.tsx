import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";
import { enabled } from "@/pages/clever-security/enum-data";
import { enum2object } from "@/utils/enum";

/** ui权限详情 */
function uiDetail() {
  return {
    type: "button",
    label: "详情",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "ui权限详情",
      closeOnEsc: true,
      actions: [{ type: "button", label: "关闭", level: "primary", actionType: "close" }],
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        controls: [
          { name: "uiName", label: "UI组件名", type: "static" },
          { name: "title", label: "标题", type: "static" },
          { name: "enabled", label: "是否启用", type: "static-mapping", map: enum2object(enabled) },
          { name: "createAt", label: "创建时间", type: "static" },
          { name: "updateAt", label: "更新时间", type: "static" },
          { name: "description", label: "描述", type: "static" },
        ]
      }
    }
  };
}

/** 新增菜单 */
function addUiPermission() {
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
          url: apiPath.RoleController.addRole,
          data: {
            domainId: "$domainId",
            name: "$name",
            description: "$description",
          },
        },
        trimValues: true,
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true, required: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", name: "name", label: "角色名", placeholder: "请输入角色名", required: true },
          {
            type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
            validations: { maxLength: 500 }, validationErrors: {},
          },
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
        url: apiPath.UiPermissionController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          domainId: "$domainId",
          uiName: "$uiName",
        },
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
          { type: "text", label: "ui组件名称", name: "uiName", placeholder: "支持模糊搜索", clearable: true },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "uiName", label: "ui组件名称", sortable: false },
        { name: "title", label: "标题", sortable: false },
        { name: "enabled", label: "启用授权", type: "mapping", map: enum2object(enabled) },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        { type: "operation", label: "操作", width: 35, toggled: true, buttons: [uiDetail()] },
      ],
      // --------------------------------------------------------------- 表格工具栏配置
      headerToolbar: [
        { align: "left", type: 'button', level: 'primary', size: "sm", ...addUiPermission() },
        { align: "right", type: "columns-toggler" },
      ],
      footerToolbar: [
        { align: "right", type: "pagination" },
        { align: "right", type: "switch-per-page" },
        { align: "right", type: "statistics" },
      ],
    }
  ],
};

export { schema }
