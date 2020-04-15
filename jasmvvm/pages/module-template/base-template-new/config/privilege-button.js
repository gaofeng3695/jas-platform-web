
// 输入框支持类型 ：'select','multiSelect','cascader','input','number','date',

// 下拉选阈值接口需要特定的返回格式
var pageConfig = {
    ifHideSearch:false,

    privilegeCode: ['bt_add', 'bt_select', 'bt_update', 'bt_delete'],
    searchPath: '/jdbc/commonData/priFunctionPrivilegeButton/getPage.do',
    deletePath: '/jdbc/commonData/priFunctionPrivilegeButton/delete.do',
    detailPath: '/jdbc/commonData/priFunctionPrivilegeButton/get.do',
    savePath: '/jdbc/commonData/priFunctionPrivilegeButton/save.do',
    updatePath: '/jdbc/commonData/priFunctionPrivilegeButton/update.do',
    dialogconfig: {
        addWidth: '780px', // 表单dialog宽
        addHeight: '50%', // 表单dialog高
        detailWidth: '780px', // 详情dialog
        detailHeight: '40%'
    },
    topBtns:[{
        name: '新增', // 必填
        icon: 'fa fa-plus',
        isDefaultMethod:'true',
        privilegeCode:'bt_add'
    }],
    rowBtns:[
        {
            name: '查看',
            icon: 'fa fa-eye',
            isDefaultMethod: true,
            privilegeCode: 'bt_select',
            isShow: function (rows) {
                return rows.length === 1;
            }
        },{
            name: '编辑',
            icon: 'fa fa-pencil-square-o',
            privilegeCode: 'bt_update',
            isDefaultMethod: true,
            isShow: function (rows) {
                return rows.length === 1;
            }
        },{
            name: '删除',
            icon: 'fa fa-trash',
            privilegeCode: 'bt_delete',
            isDefaultMethod: true,
            isShow: function (rows) {
                return rows.length === 1;
            }
        }
    ],
    searchFields: [
        'name',
        'code'
    ],
    tableFields: [
        'name',
        'code',
        'description'
    ],
    addFields: [{
        title: '基本信息',
        fields: [
            'name',
            'code',
            'description'
        ]
    }],
    detailFields: [{
        title: '基本信息',
        fields: [
            'name',
            'code',
            'description'
        ]
    }],
    fieldsConfig: {
        name: {
            name: '名称',
            type: 'input',
            sortable: false,
            isRequired: true
        },
        code: {
            name: '编码',
            type: 'input',
            sortable: false,
            isRequired: true
        },
        description: {
            name: '描述',
            type: 'textarea',
            sortable: false,
            isRequired: false
        }
    },
    methods: {

    }
};