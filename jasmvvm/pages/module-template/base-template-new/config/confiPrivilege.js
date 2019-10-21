// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  ifHideSearch: false,
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  searchPath: '/jdbc/commonData/processRule/getPage.do',
  deletePath: '/jdbc/commonData/processRule/delete.do',
  detailPath: '/jdbc/commonData/processRule/get.do',
  savePath: '/jdbc/commonData/processRule/save.do',
  updatePath: '/jdbc/commonData/processRule/update.do',
  rowBtns: [{
    name: '详情',
    isTip: true,
    icon: 'fa fa-eye',
    privilegeCode: 'bt_select',
    isDefaultMethod: true,
  }, {
    name: '编辑',
    isTip: true,
    icon: 'fa fa-edit',
    privilegeCode: 'bt_update',
    isDefaultMethod: true,
  }, {
    name: '删除',
    icon: 'fa fa-delete',
    privilegeCode: 'bt_delete',
    isDefaultMethod: true,
  }],
  addParams: {
    businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
    processType: "beforeAdvice"
  },
  searchParams: {
    businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
    processType: "beforeAdvice"
  },
  searchFields: [

  ],
  tableFields: [
    'service',
    'method',
    'conditionExpression',
    'description',
  ],
  addFields: [{
    title: '基本信息',
    fields: [
      'service',
      'method',
      'conditionExpression',
      'description',
    ]
  }],
  detailFields: [{
    title: '基本信息',
    fields: [
      'service',
      'method',
      'conditionExpression',
      'description',
    ]
  }],
  fieldsConfig: {

    service: {
      name: '服务',
      type: 'input',
      isRequired: true
    },
    method: {
      name: '方法',
      type: 'input',
      isRequired: true
    },
    conditionExpression: {
      name: '条件表达式',
      type: 'input',
      isRequired: true
    },
    description: {
      name: '描述',
      type: 'textarea',
      isRequired: true,
      // rules:{
      //   required: true, message: '请输入活动名称', trigger: 'blur'
      // }
    },
  },
  methods: {

  }
};