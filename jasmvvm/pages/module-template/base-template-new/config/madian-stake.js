// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete', 'bt_position', 'bt_delete', 'bt_position', 'bt_export', 'bt_import'],
  ifAttachment: true,
  ifHideSearch: true,
  excelConfig: {
    type: 1, // 1: 旧版 2：新版
    templateCode: 'median_stake_1', // 导入模板code
    exportTemplateCode: 'median_stake_export', // 导入模板code
    importConfig: {
      importUrl: '',
      exportUrl: '',
    }
  },
  topBtns: [{
    name: '审核',
    icon: 'fa fa-book',
    method: 'approve'
  }, {
    name: '批准',
    icon: 'fa fa-add',
    method: ''
  }],
  // isHideBtnCol:true,
  btncolwidth: '220px',
  rowBtns: [{
    name: '审核',
    icon: 'fa fa-book',
    method: 'approve'
  }, {
    name: '批准',
    icon: 'fa fa-add',
    method: ''
  }],

  // privilegeCode: 'anli-vue-0101',
  searchPath: '/jdbc/commonData/medianStake/getPage.do',
  searchParams:{
    fatherId : jasTools.base.getParamsInUrl(location.href).fatherId || 123
  },
  addParams:{
    fatherId : jasTools.base.getParamsInUrl(location.href).fatherId || 123123
  },
  // deletePath: '/jdbc/commonData/medianStake/delete.do',
  detailPath: '/daq/medianStake/get.do',
  detailPath: '/jdbc/commonData/medianStake/getPage.do',
  savePath: '/jdbc/commonData/medianStake/save.do',
  updatePath: '/jdbc/commonData/medianStake/update.do',
  searchFields: [
    'projectOid',
    'pipelineOid',
    'medianStakeCode',
  ],
  tableFields: [
    'oid',
    'projectName',
    'pipelineName',
    'medianStakeCode',
    'mileage',
    'pointz',
    'pointx',
    'pointy',
    'remarks',
  ],
  addFields: [{
    title: '项目信息',
    fields: [
      'projectOid',
      'pipelineOid',
      'medianStakeCode',
      'mileage',
      'pointz',
      'pointx',
      'pointy',
    ]
  }, {
    title: '其他信息',
    fields: [
      'remarks'
    ]
  }],
  detailFields: [{
    title: '项目信息',
    fields: [
      'projectName',
      'pipelineName',
      'medianStakeCode',
      'mileage',
      'pointz',
      'pointx',
      'pointy',
    ]
  }, {
    title: '其他信息',
    fields: [
      'remarks'
    ]
  }],
  fieldsConfig: {
    projectOid: {
      type: 'select',
      name: '项目名称',
      optionUrl: 'daq/project/getList.do',
      isRequired: true,
      childSelect: ['pipelineOid'],
      childUrl: ['daq/pipeline/getList.do'],
      // disabled: true,
    },
    projectName: {
      name: '项目名称',
      sortable: true,
      width: '160px',
    },
    pipelineOid: {
      type: 'select',
      name: '管线名称',
      // optionUrl: 'daq/pipeline/getList.do',
      // isRequired: true,
      // isInit:true
    },
    pipelineName: {
      name: '管线名称',
      sortable: true,
      width: '160px',
      isRequired: true,
    },
    medianStakeCode: {
      type: 'daterange',
      name: '工程名称',
      queryFields: ['mydatestart', 'mydateend'],
      width: '160px',
    },
    oid: {
      name: 'oid',
      tablehidden: true,
    },
    medianStakeCode: {
      name: '中线桩编号',
      type: 'input',
      isRequired: true,
      width: '160px',

    },
    pointx: {
      name: 'X坐标',
      type: 'number',
      width: '120px',
      sortable: true,
    },
    pointy: {
      name: 'Y坐标',
      type: 'number',
      width: '120px',
      sortable: true,
    },
    pointz: {
      name: '高程',
      type: 'number',
      width: '120px',
      sortable: true,
    },
    mileage: {
      name: '里程(km)',
      type: 'number',
      width: '120px',
      sortable: true,
    },
    remarks: {
      name: "备注",
      type: "textarea",
      maxLength: 180,

    },
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