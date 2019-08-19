
// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  ifHideSearch:false,

  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  searchPath: '/jdbc/commonData/project/getPage.do',
  deletePath: '/jdbc/commonData/project/delete.do',
  detailPath: '/jdbc/commonData/project/get.do',
  savePath: '/jdbc/commonData/project/save.do',
  updatePath: '/jdbc/commonData/project/update.do',
 
  searchFields: [
    'name',
    'code',
  ],
  tableFields: [
    'name',
    'engineeringname',
    'code',
    'mediumtypeCodeName',
    'constructname',
    'remarks',
    'ordernum'
  ],
  addFields: [{
    title: '项目信息',
    fields: [
      "engineeringoid",
      "name",
      "code",
      'mediumtype',
      'construct',
      'ordernum'
    ]
  }],
  detailFields: [{
    title: '项目信息',
    fields: [
      "engineeringname",
      "name",
      "code",
      "mediumtypeCodeName",
      "constructname",
      "ordernum"
    ]
  }, {
    title: '其他信息',
    fields: [
      'remarks'
    ]
  }],
  fieldsConfig: {
    engineeringoid: {
      type: 'select',
      name: '工程名称',
      optionUrl: 'jdbc/commonData/engineering/getEngineeringOfUser.do',
      isRequired: true,
      disabled: true,
    },
    engineeringname: {
      name: '工程名称',
    },
    name: {
      name: '项目名称',
      type: 'input',
      isRequired: true
    },
    code: {
      name: '项目编码',
      type: 'input',
      isRequired: true
    },
    construct: {
      type: 'cascader',
      name: '建设单位',
      optionUrl: '/jasframework/privilege/unit/getUnitTree.do?isroot=true',
      props:{
        value:'id',
        label:'text',
      },
      disabled: true
    },
    constructname: {
      name: '建设单位',
    },
    mediumtypeCodeName: {
      name: '介质'
    },
    mediumtype: {
      type: 'select',
      name: '介质',
      domainName: 'project_mediumtype'
    },
    remarks: {
      name: "备注",
      type: "textarea"
    },
    ordernum: {
      name: '序号',
      type: 'input'
    }
  },
  methods: {
    approve: function () {
      console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/module-template/base-template-new/dialogs/add.html?pageCode=' + 'madian-stake';
      top.jasTools.dialog.show({
        width: '800px',
        height: '80%',
        title: '审核',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    }
  }  
};