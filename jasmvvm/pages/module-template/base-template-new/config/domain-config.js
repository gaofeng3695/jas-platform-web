var pageConfig = {
  privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
  ifAttachment: false,
  ifHideSearch: false,

  topBtns: [{
    name: '刷新域值缓存', // 必填
    icon: 'fa fa-refresh', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
    method: 'refreshDomain'
  }],
  rowBtns: [{
    name: '查看',
    isDefaultMethod: true,
    privilegeCode: 'bt_select',
  }, {
    name: '编辑',
    isDefaultMethod: true,
    privilegeCode: 'bt_update',
  }, {
    name: '删除',
    isDefaultMethod: true,
    privilegeCode: 'bt_delete',
  }],
  searchPath: '/hibernate/commonData/domain/getPage.do',
  detailPath: '/hibernate/commonData/domain/get.do',
  savePath: '/hibernate/commonData/domain/save.do',
  updatePath: '/hibernate/commonData/domain/update.do',
  deletePath: '/hibernate/commonData/domain/delete.do',
  searchFields: [
    'domainName'
  ],
  tableFields: [
    'oid',
    'domainName',
    'codeId',
    'codeName',
    'parentCodeId',
    'ordinal',
  ],
  addFields: [{
    title: '基础信息',
    fields: [
      'domainName',
      'codeId',
      'codeName',
      'parentCodeId',
      'ordinal',
    ]
  }, {
    title: '其他信息',
    fields: [
      'description',
    ]
  }],

  detailFields: [{
    title: '基础信息',
    fields: [
      'domainName',
      'codeId',
      'codeName',
      'parentCodeId',
      'ordinal',
    ]
  }, {
    title: '其他信息',
    fields: [
      'description',
    ]
  }],
  fieldsConfig: {
    oid: {
      name: 'oid',
      tablehidden: true,
    },
    domainName: {
      type: 'input',
      name: '域名',
      sortable: false,
      isRequired: true,
    },
    codeId: {
      type: 'input',
      name: '域值id',
      sortable: false,
      isRequired: true,
    },
    codeName: {
      type: 'input',
      name: '域值名称',
      sortable: false,
      isRequired: true,
    },
    ordinal: {
      type: 'input',
      name: '排序号',
      sortable: false,
    },
    parentCodeId: {
      type: 'input',
      name: '父域值id',
      sortable: false,
    },
    description: {
      type: 'textarea',
      name: '描述',
      sortable: false,
    },

  },
  methods: {
    refreshDomain: function (rows) {
      //console.log(this) // this指向当前的vue实例，此处可操作vue的实例
      var that = this;
      if(that.refreshDomaining) return;
      that.refreshDomaining = true;
      var url = jasTools.base.rootPath + '/jasframework/sysdoman/refreshCache.do';
      jasTools.ajax.get(url, {}, function (data) {
        console.log(data);
        that.refreshDomaining = false;
        if (data) {
          top.Vue.prototype.$message({
            type: 'success',
            message: '刷新阈值缓存成功'
          });
        } else {
          top.Vue.prototype.$message({
            type: 'error',
            message: '刷新阈值缓存成功'
          });
        }
        // that.detail = data.data || data.rows[0];
      });

    }
  }
};