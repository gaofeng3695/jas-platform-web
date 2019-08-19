
// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  searchPath: '/jdbc/commonData/engineering/getPage.do',
  deletePath: '/jdbc/commonData/engineering/delete.do',
  detailPath: '/jdbc/commonData/engineering/get.do',
  savePath: '/jdbc/commonData/engineering/save.do',
  updatePath: '/jdbc/commonData/engineering/update.do',
  searchFields: [
    'name',
    'code'
  ],
  searchParams:{
    fatherId : jasTools.base.getParamsInUrl(location.href).fatherId || 123
  },
  addParams:{
    fatherId : jasTools.base.getParamsInUrl(location.href).fatherId || 123123
  },  
  tableFields: [
    'oid',
    'name',
    'code',
    'constructname',
    'companyname',
    'remarks',
    'ordernum'
  ],
  addFields: [{
    title: '工程数据',
    fields: [
      "name",
      "code",
      "construct",
      "companyname",
      "ordernum"
    ]
  }],
  detailFields: [{
    title: '工程数据',
    fields: [
      "name",
      "code",
      "constructname",
      "companyname",
      "ordernum"
    ]
  }, {
    title: '其他信息',
    fields: [
      'remarks'
    ]
  }],
  fieldsConfig: {
    oid: {
      name: 'oid',
      tablehidden: true
    },
    name: {
      name: '工程名称',
      type: 'input',
      isRequired: true
    },
    code: {
      name: '工程编码',
      type: 'input',
      isRequired: true
    },
    construct: {
      type: 'cascader',
      name: '建设单位',
      disabled: true,
      optionUrl: '/jasframework/privilege/unit/getUnitTree.do?isroot=true',
      props:{
        value:'id',
        label:'text',
      },
    },
    constructname: {
      name: '建设单位',
    },
    companyname: {
      type: 'input',
      name: '企业名称',
      isRequired: true
    },
    remarks: {
      name: "备注",
      type: "textarea"
    },
    ordernum: {
      name: '序号',
      type: 'input'
    },
  },
};