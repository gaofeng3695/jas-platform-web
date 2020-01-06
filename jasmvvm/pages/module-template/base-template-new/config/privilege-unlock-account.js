// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
  ifHideSearch: false,
  privilegeCode: [],
  searchPath: '/jdbc/commonData/priLoginLock/getPage.do',
  topBtns: [],
  rowBtns: [{
    name: '解锁',
    icon: 'fa fa-eye',
    method: 'unload'

  }],
  searchFields: [
    "loginName"
  ],
  tableFields: [
    'service',
    'status',
    'lockDatetime',
    'endDatetime',
  ],
  fieldsConfig: {

    loginName: {
      name: '用户名',
      type: 'input',
      isRequired: true
    },
    status: {
      name: '状态',
      type: 'input',
      isRequired: true
    },
    lockDatetime: {
      name: '锁定时间',
      type: 'input',
      isRequired: false
    },
    endDatetime: {
      name: '失效时间',
      type: 'input',
      isRequired: true,
    },
  },
  methods: {
    unload: function (rows) {
      var that = this;
      var url = jasTools.base.rootPath + '/serviceMvc/loginLock/unLock.do';
        //console.log(window.vm.$refs.table.oids);
        jasTools.ajax.get(url, {
          'oid': rows[0].oid
        }, function (data) {
          that.$refs.table.loading = false;
          top.Vue.prototype.$message({
            type: 'success',
            message: '解锁成功'
          });
          that.$refs.table.refresh();
        }, function () {
          that.$refs.table.loading = false;
          that.$refs.table.refresh();
        });

    },

  }
};