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
  topBtns: [{
    name: '新增', // 必填
    icon: 'fa fa-plus', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    isDefaultMethod: 'true', //选填，是否采用默认方法,需要搭配privilegeCode使用，仅在rowBtns生效
    privilegeCode: 'bt_add', //选填，表明按钮的权限，仅在rowBtns生效
  }, {
    name: '排序', // 必填
    icon: 'fa fa-sort', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'sortItem'
  }, {
    name: '发布', // 必填
    icon: 'el-icon-upload', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'publish'
  }],
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
    processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice'
  },
  searchParams: {
    businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
    processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeQueryAdvice'
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
      isRequired: false
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
    sortItem: function () {
      var that = this;
      var url = jasTools.base.rootPath + '/jasmvvm/pages/module-template/common-dialogs/sort-list.html';
      url = jasTools.base.setParamsToUrl(url, {
        businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
        processType: jasTools.base.getParamsInUrl(location.href).processType || 'beforeAdvice',
        modelId: 'cn.jasgroup.framework.process.entity.ProcessBusinessRef',
        displayField: 'name',
        rowIndexField: 'orderNum',
      });
      top.jasTools.dialog.show({
        height: '70%',
        width: '600px',
        title: '排序',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    publish: function () {
      var that = this;
      var url = jasTools.base.rootPath + "/serviceMvc/processRule/publish.do";
      jasTools.ajax.get(url, {
        businessId: jasTools.base.getParamsInUrl(location.href).currentNodeId,
        processType: jasTools.base.getParamsInUrl(location.href).processType,
        processRefreshStrategyName: jasTools.base.getParamsInUrl(location.href).processRefreshStrategyName
      }, function (data) {
				(top.jasTools || jasTools).dialog.close();
        window.top.Vue.prototype.$message({
          message: '发布成功',
          type: 'success'
        })
      });
    }
  }
};