import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";
import { enabled } from "@/pages/clever-security/enum-data";

/** 新增角色 */
function addRole() {
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

/** 删除角色 */
function removeRole() {
  return {
    label: "删除",
    type: "button",
    size: "xs",
    level: "danger",
    actionType: "ajax",
    api: {
      method: "delete",
      url: `${apiPath.RoleController.delRole}?domainId=$domainId&id=$id`,
      adaptor: (payload: any) => ({ ...payload, data: {} }),
    },
    confirmText: "确认要删除该角色: ${name}?",
  };
}

/** 修改角色 */
function updateRole() {
  return {
    type: "button",
    label: "编辑",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "修改角色",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "put",
          url: apiPath.RoleController.updateRole,
          data: {
            domainId: "$domainId",
            id: "$id",
            name: "$name",
            enabled: "$enabled",
            description: "$description",
          },
        },
        controls: [
          { type: "text", name: "id", label: "ID", disabled: true },
          { type: "text", name: "domainName", label: "域名称", disabled: true },
          { type: "text", name: "name", label: "角色名称", },
          { type: "select", name: "enabled", label: "是否启用", options: enabled },
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
        url: apiPath.RoleController.pageQuery,
        data: {
          pageNo: "$pageNo",
          pageSize: "$pageSize",
          domainId: "$domainId",
          id: "$id",
          name: "$name",
          enabled: "$enabled",
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
        className: classnames(FormClassName.label4x, FormClassName.input14x),
        trimValues: true,
        submitOnChange: false,
        controls: [
          {
            type: "select", label: "域名称", name: "domainId", placeholder: "请选择", clearable: true,
            source: { method: "get", url: apiPath.DomainController.all }, labelField: "name", valueField: "id",
          },
          { type: "text", label: "角色名称", name: "name", placeholder: "支持模糊匹配", clearable: true },
          { type: "select", label: "是否启用", name: "enabled", options: enabled, clearable: true },
          { label: "查询", level: "primary", type: "submit" },
          { label: "重置", type: "reset" },
        ],
      },
      // --------------------------------------------------------------- 表格列配置
      primaryField: "id",
      columns: [
        { name: "index", label: "序号", width: 50, type: "tpl", tpl: "<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>" },
        { name: "domainName", label: "域名称", type: "text" },
        { name: "name", label: "角色名称", type: "text" },
        { name: "enabled", label: "是否启用", type: "switch", trueValue: 1, falseValue: 0 },
        { name: "createAt", label: "创建时间", sortable: true },
        { type: "operation", label: "操作", width: 80, toggled: true, buttons: [updateRole(), removeRole()] },
      ],
      // --------------------------------------------------------------- 表格工具栏配置
      headerToolbar: [
        { align: "left", type: 'button', level: 'primary', size: "sm", ...addRole() },
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
