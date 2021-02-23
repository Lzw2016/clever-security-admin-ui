import classnames from "classnames";
import { apiPath } from "@/api/clever-security-api";
import { FormClassName } from "@/amis-types";
import { routerHistory } from "@/utils/router";

/** 新增对话框 */
function addDialog() {
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
          url: apiPath.DomainController.addDomain,
        },
        trimValues: true,
        controls: [
          {
            type: "text", name: "name", label: "域名称", placeholder: "请输入域名称",
            required: true, validations: { minLength: 4, maxLength: 100 }, validationErrors: {},
          },
          {
            type: "text", name: "redisNameSpace", label: "Redis前缀", placeholder: "请输入Redis前缀",
            required: true, validations: { minLength: 6, maxLength: 60 }, validationErrors: {},
          },
          {
            type: "textarea", name: "description", label: "说明", placeholder: "请输入", minRows: 2, maxRows: 6,
            validations: { maxLength: 500 }, validationErrors: {},
          },
        ]
      }
    }
  };
}

/** 编辑对话框 */
function editDialog() {
  return {
    type: "button",
    label: "编辑",
    level: "info",
    size: "xs",
    actionType: "dialog",
    dialog: {
      title: "编辑数据域 - ${name}",
      body: {
        type: "form",
        className: classnames(FormClassName.flex_label5x),
        api: {
          method: "put",
          url: apiPath.DomainController.updateDomain,
        },
        controls: [
          { type: "text", name: "id", label: "域ID", disabled: true },
          { type: "text", name: "redisNameSpace", label: "Redis前缀", disabled: true },
          {
            type: "text", name: "name", label: "域名称", placeholder: "请输入域名称",
            required: true, validations: { minLength: 4, maxLength: 100 }, validationErrors: {},
          },
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
        url: apiPath.DomainController.pageQuery,
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
          { type: "text", label: "域名称", name: "name", placeholder: "支持模糊匹配", clearable: true },
          { type: "text", label: "Redis前缀", name: "redisNameSpace", placeholder: "支持模糊匹配", clearable: true },
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
        { name: "id", label: "域ID", sortable: true/*, type: "link", body: "${id}", href: "#/nest-side/security/domain-list/detail?domainId=${id}", */ },
        { name: "name", label: "域名称", sortable: true },
        { name: "redisNameSpace", label: "Redis前缀", sortable: true },
        { name: "description", label: "说明", sortable: true, type: "tpl", tpl: "${description|truncate:20}" },
        { name: "createAt", label: "创建时间", sortable: true },
        { name: "updateAt", label: "更新时间", sortable: true },
        {
          type: "operation", label: "操作", width: 80, toggled: true,
          buttons: [
            editDialog(),
            {
              type: "action",
              label: "详情",
              size: "xs",
              onClick: (_: any, context: any) => {
                console.log(context.data)
                  routerHistory.push({
                    path: "/nest-side/security/domain-list/detail", query: {
                      domainId: context.data.id,
                      name: context.data.name,
                      redisNameSpace: context.data.redisNameSpace,
                      description: context.data.description,
                      createAt: context.data.createAt,
                      updateAt: context.data.updateAt
                    }
                  });
              }
            },
          ]
        },
      ],
      // --------------------------------------------------------------- 表格工具栏配置
      headerToolbar: [
        { align: "left", type: 'button', level: 'primary', size: "sm", ...addDialog() },
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
