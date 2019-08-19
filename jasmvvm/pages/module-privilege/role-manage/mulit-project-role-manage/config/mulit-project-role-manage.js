
// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  searchPath: '/jdbc/commonData/role/getPage.do',
  deletePath: '/jdbc/commonData/role/delete.do',
  detailPath: '/jdbc/commonData/role/get.do',
  savePath: '/jdbc/commonData/role/save.do',
  updatePath: '/jdbc/commonData/role/update.do',
  searchFields: [
    'roleName'
  ],
  tableFields: [
    'roleName',
    'dataFilterRegulationName',
    'description'
  ],
  addFields: [{
    title: '角色信息',
    fields: [
      "roleName",
      //"roleType",
      //"unitId",
      'dataFilterCode',
      //'projectOid'
    ]
  }],
  detailFields: [{
    title: '角色信息',
    fields: [
      "roleName",
     // "roleType",
      //"unitId",
      'dataFilterRegulationName',
     // 'projectOid'
    ]
  }, {
    title: '其他信息',
    fields: [
      'description'
    ]
  }],
  fieldsConfig: {
   
    roleName: {
      name: '角色名称',
      type: 'input',
      isRequired: true
    },
    dataFilterCode: {
      type: 'select',
      name: '数据权限过滤规则',
      domainName:'dataFilterRegulation'
    },
    dataFilterRegulationName: {
      name: '数据权限过滤规则',
    },
    description: {
      name: "描述",
      type: "textarea"
    }
  },
};