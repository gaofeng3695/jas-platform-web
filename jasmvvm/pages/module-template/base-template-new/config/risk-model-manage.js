// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  privilegeCode: ['bt_select', 'bt_update', 'bt_delete'],
  dialogconfig: {
    addWidth: '780px',
    addHeight: '50%',
    detailWidth: '780px',
    detailHeight: '40%'
  },
  ifAttachment: false,
  ifHideSearch: false,

  topBtns: [{
      name: '新增',
      icon: 'fa fa-plus',
      method: 'addItem'
    }
  //   {
  //   name: '模型复制',
  //   icon: 'fa fa-clone',
  //   method: 'riskModelCopy'
  // }
],
  btncolwidth: '220px',
  rowBtns: [ 
    {
      name: '定义模型',
      method: 'definitionRiskModel',
      // type:'primary',
      isShow: function (row) {
        return row.useStatus == '未使用' && row.riskModelType != '1' ;
      }
    }, {
      name: '查看模型',
      method: 'definitionRiskModel',
      // type:'success',
      isShow: function (row) {
        return row.useStatus == '已使用' || row.riskModelType == '1';
      }
    }, {
      name: '详情',
      privilegeCode: 'bt_select',
      method: 'detailItem',
    }, {
      name: '编辑',
      privilegeCode: 'bt_update',
      method: 'addItem',
      isShow: function (row) {
        return row.riskModelType != '1' &&  row.useStatus != '已使用' ;
      }
    }, {
      name: '删除',
      privilegeCode: 'bt_delete',
      isDefaultMethod: true,
      isShow: function (row) {
        return row.riskModelType != '1' && row.useStatus != '已使用' ;
      }
    }

  ],
  // privilegeCode: 'anli-vue-0101',
  searchPath: '/jdbc/commonData/riskModel/getPage.do',
  detailPath: '/jdbc/commonData/riskModel/get.do',
  savePath: '/jdbc/commonData/riskModel/save.do',
  updatePath: '/jdbc/commonData/riskModel/update.do',
  deletePath: '/jdbc/commonData/riskModel/delete.do',
  searchFields: [
    'riskModelName',
    'riskModelCode',
    'riskModelType'
  ],
  tableFields: [
    'riskModelName',
    'riskModelCode',
    'useStatus',
    'modelStatistics',
    'description',
    'createUserName',
    'createDatetime',  
    'oid'
  ],
  addFields: [{
      title: '模型信息',
      fields: [
        'riskModelName',
        'riskModelCode',
      ]
    }
  ],
  detailFields: [{
      title: '模型信息',
      fields: [
        'riskModelName',
        'riskModelCode',
      ]
    },
    {
      title: '其他信息',
      fields: [
        'createUserName',
        'createDatetime',  
        'description',
      ]
    }
  ],
  fieldsConfig: {
    oid: {
      name: 'oid',
      tablehidden: true,
    },
    riskModelName: {
      name: '模型名称',
      type: 'input',
      isRequired: true,
      width: '250px',
    },
    riskModelCode: {
      name: '模型编号',
      type: 'input',
      isRequired: false
    },
    useStatus: {
      name: '使用状态',
      type: 'input',
      isRequired: false,
      tagTypeFn:function(row){ // success/info/warning/danger
        if( row.useStatus == '已使用') return 'success';
        if( row.useStatus == '未使用') return 'warning';
      }
    },
    description: {
      name: '模型描述',
      type: 'textarea',
      maxLength: 180,
      isRequired: false,
      width: '350px'
    },
    riskModelType: {
      type: 'select',
      name: '模型类型',
      domainName: 'risk_model_type',
      isRequired: false
      // width: '200px',
    },
    createDatetime: {
      name: '创建时间',
      type: 'date',
      isRequired: true,
      // width: '160px',
    },
    modifyDatetime: {
      name: '修改时间',
      type: 'date',
      isRequired: true,
      // width: '160px',
    },
    createUserName: {
      name: '创建人',
      type: 'date',
      isRequired: true,
      // width: '160px',
    },
    modelSourceId:{
      name: '模型复制',
      type: 'select',
      optionUrl: '/jdbc/commonData/getRiskModelList/simpleQuery.do',
      props: {
        label: 'VALUE',
        value: 'KEY'
      }
    },
    modelStatistics:{
      name: '统计信息',
      width: '430px'
    }
  },
  methods: {
    detailItem:function(row){
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/detail-risk-model-manage.html?pageCode=risk-model-manage&oid='+row.oid;
      
      top.jasTools.dialog.show({
        height: '50%',
        width: '800px',
        title: '查看',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    addItem: function(row){
      console.log(row);
      //console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      var that = this;
      var url;
      if(typeof(row.oid) == "undefined"){
        url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/add-risk-model-manage.html?pageCode=risk-model-manage';
      }else{
        url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/add-risk-model-manage.html?pageCode=risk-model-manage&oid='+row.oid;
      }
      var title = '新增';
      if(row.oid){
        title = '编辑';
      }  
      top.jasTools.dialog.show({
        height: '54%',
        width: '860px',
        title: title,
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    definitionRiskModel: function (row) {
      console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      var that = this;
      var isUsed = row.useStatus == '已使用' ? 1 : 0;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/option-manage-easyui/option-manage.html?useStatus=' + isUsed + '&pageCode=risk-model-manage&oid=' + row.oid;
      jasTools.mask.show({
        title: '【' + row.riskModelName + '】要素配置',
        src: url,
        cbForClose: function (param) {
          
        }
      });
    },
    riskModelCopy: function(){
      var that = this;
      var url  = jasTools.base.rootPath + '/treeView/cloneTree.do?treeViewCode=modelClone';
      that.$refs.table.loading = true;
      if(window.vm.$refs.table.oids && window.vm.$refs.table.oids.length === 1){
        //console.log(window.vm.$refs.table.oids);
        jasTools.ajax.get(url, {
          'oid': window.vm.$refs.table.oids[0]
        }, function (data) {
          that.$refs.table.loading = false;
          top.Vue.prototype.$message({
            type: 'success',
            message: '模型复制成功'
          });
          that.$refs.table.refresh();
        }, function () {
          that.$refs.table.loading = false;
          that.$refs.table.refresh();
        });
       
      }else{
        
        top.Vue.prototype.$message({
          type: 'warning',
          message: '请选择一个模型复制！'
        });
        that.$refs.table.loading = false;
      }
    },
  }
};