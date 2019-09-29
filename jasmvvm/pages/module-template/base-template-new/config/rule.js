var pageConfig = {
  privilegeCode: ['bt_delete'],
  ifAttachment: false,
  ifHideSearch: false,

  topBtns: [{
    name: '增加',
    icon: 'fa fa-plus',
    method: 'addItem'
  }],
  rowBtns:[{
    name: '测试',
    icon: 'fa fa-flask',
    method: 'testRule',
    isShow: function (rows) {
      if (rows.length == 1){
        return true;
      }
      return false;
    }
  },{
    name: '查看',
    icon: 'fa fa-eye',
    method: 'detailItem',
    isShow: function (rows) {
      if (rows.length == 1){
        return true;
      }
      return false;
    }
  },{
    name: '编辑',
    icon: 'fa fa-pencil-square-o',
    method: 'updateItem',
    isShow: function (rows) {
      if (rows.length == 1){
        return rows[0].ruleType == '2';
      }  
      return false;
    }
  },{
    name: '删除',
    icon: 'fa fa-trash',
    method: 'updateItem',
    // privilegeCode: 'bt_delete',
    // isDefaultMethod: true,
    isShow: function (rows) {
      if (rows.length == 1){
        return rows[0].ruleType == '2';
      }
      return false;
    }
  }],
  searchPath: '/jdbc/commonData/rule/getPage.do',
  detailPath: '/jdbc/commonData/rule/get.do',
  savePath: '/jdbc/commonData/rule/save.do',
  updatePath: '/jdbc/commonData/rule/update.do',
  deletePath: '/jdbc/commonData/rule/delete.do',
  searchFields: [
    'ruleName',
    'ruleFormulaType'
  ],
  tableFields: [
    'oid',
    'ruleName',
    'ruleCode',
    'ruleFormulaTypeName',
    'expression',
    //'ruleTypeName',
    'description'
  ],
  addFields: [{
    title: '规则信息',
    fields: [
      'ruleName',
      'ruleCode',
      'ruleFormulaType'
    ]
  }],
  // , {
  //   title: '规则表达式',
  //   fields: [
  //     'expression',
  //     'description'
  //   ]
  // }
  detailFields:[{
    title: '规则信息',
    fields: [
      'ruleName',
      'ruleCode',
      'ruleFormulaTypeName'
    ]
  },{
    title: '规则表达式',
    fields: [
      'expression',
      'description'
    ]
  }],
  fieldsConfig: {
    oid: {
      name: 'oid',
      tablehidden: true,
    },
    ruleName: {
      type: 'input',
      name: '规则名称',
      sortable: false,
      // width: '160px',
      isRequired: true,
      rules:[{ max: 50, message: '长度不能超过50个字符', trigger: 'blur' }]
    },
    ruleCode: {
      type: 'input',
      name: '规则编码',
      sortable: false,
      // width: '160px',
      isRequired: true,
      rules:[{ max: 50, message: '长度不能超过50个字符', trigger: 'blur' }]
    },
    ruleFormulaType: {
      type: 'select',
      name: '类别',
      sortable: false,
      // width: '160px',
      isRequired: true,
      domainName: 'rule_formula_type'
    },
    ruleFormulaTypeName: {
      type: 'input',
      name: '类别',
      sortable: false,
      // width: '160px',
    },
    expression: {
      type: 'textarea',
      name: '规则表达式',
      sortable: false,
      width: '380px',
      isRequired: true,
    },
    ruleType: {
      type: 'select',
      name: '规则类别',
      sortable: false,
      // width: '160px',
      isRequired: true,
      domainName: 'rule_type'
    },
    ruleTypeName: {
      name: '规则类别'
    },
    description: {
      type: "textarea",
      name: "说明",
      maxLength: 200,
      isRequired: false
    },
    paramName: {
      type: 'input',
      name: '参数',
      sortable: false,
      width: '160px',
      isRequired: true,
      rules:[{ max: 20, message: '长度不能超过20个字符', trigger: 'blur' }]
    },
    paramDescription: {
      type: 'input',
      name: '参数描述',
      sortable: false,
      width: '160px',
      isRequired: true,
      rules:[{ max: 100, message: '长度不能超过100个字符', trigger: 'blur' }]
    },
    remarks: {
      type: "textarea",
      name: "备注",
      maxLength: 200,
      isRequired: false,
      width: '350px'
    },
    paramType: {
      type: 'select',
      name: '参数类别',
      sortable: false,
      // width: '160px',
      isRequired: true,
      domainName: 'param_type'
    },
    dataType: {
      type: 'select',
      name: '数据类别',
      sortable: false,
      // width: '160px',
      isRequired: true,
      domainName: 'data_type'
    },
    paramTypeName:{
      type:'input',
      name:'参数类别'
    },
    dataTypeName:{
      type:'input',
      name:'数据类别'
    }
  },
  methods: {
    addItem: function (rows) {
      //console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/add-rule.html?pageCode=rule';
      var title = '新增';
      top.jasTools.dialog.show({
        height: '74%',
        width: '800px',
        title: title,
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    updateItem: function (rows) {
      //console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      // if (rows.length != 1) {
      //   window.top.Vue.prototype.$alert('请选择一条数据！', '提示', {
      //     type: 'warning',
      //     showConfirmButton: false,
      //   });
      //   return;
      // }
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/add-rule.html?pageCode=rule&oid='+rows[0].oid;
      var title  = '编辑'; 
      top.jasTools.dialog.show({
        height: '74%',
        width: '800px',
        title: title,
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    detailItem:function(rows){
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/detail-rule.html?pageCode=rule&oid='+rows[0].oid;
      
      top.jasTools.dialog.show({
        height: '64%',
        width: '800px',
        title: '查看',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    testRule:function(rows){
      //console.log(this.$refs.table.rows[0])
      var that = this;
      var url = jasTools.base.rootPath +
        '/jasmvvm/pages/group-risk-test/base-template-new/dialogs/test-rule.html?pageCode=rule&oid='+rows[0].oid;
      
      top.jasTools.dialog.show({
        height: '66%',
        width: '800px',
        title: '规则测试',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
    deleteItem: function (rows) {
      var that = this;
      if(rows[0].ruleType == 1){
        top.Vue.prototype.$message({
          type: 'warning',
          message: '内置规则，不能删除！'
        });
        return;
      }
			window.top.Vue.prototype.$confirm('您确定要删除本条数据吗？', '提示', {
				type: 'warning',
				callback: function (action) {
					if (action === 'confirm') {
            if (that.deletePath) {
              var url = jasTools.base.rootPath + that.deletePath;
              jasTools.ajax.post(url, {
                oid: rows[0].oid
              }, function (data) {
                top.Vue.prototype.$message({
                  type: 'success',
                  message: '删除成功'
                });
                that.$refs.table.refresh();
              });
            } else {
              that.$emit('deleterow', rows[0]);
            }
					}
				}
			});
		}
  }
};