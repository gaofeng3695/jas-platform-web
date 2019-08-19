var zNodes = [{
    id: "node0501",
    name: "风险管理",
    icon: 'fa fa-warning',
    children: [{
      id: "node050101",
      name: "风险管理",
      attributes:{
        URL:'jasmvvm/pages/module-template/base-template/base-template.html?pageCode=person'
      }
    }]
  },
  {
    id: "node0502",
    icon: 'fa fa-blind',
    name: "巡线管理",
    children: [{
        id: "node050201",
        name: "监控管理",

        // icon: 'fa fa-bars',
        children: [{
            id: "node05020101",
            name: "实时监控"
          },
          {
            id: "node05020102",
            name: "历史回放"
          },
          {
            id: "node05020103",
            name: "超时越界"
          },
          {
            id: "node05020601",
            name: "巡线情况"
          }
        ]
      },
      {
        id: "node050202",
        name: "基础数据管理",
        // icon: 'fa fa-bars',
        children: [{
            id: "node05020203",
            name: "人员管理",
            attributes:{
              URL:'jasmvvm/pages/module-template/base-template/base-template.html?pageCode=person'
            }
          },
          {
            id: "node05020201",
            name: "设备管理"
          },
          {
            id: "node05020204",
            name: "任务分配"
          }
        ]
      }
      /* ,
            { id:"node050206",name: "报表管理",children: [

              {id:"node05020602",name: "巡线日报二"}
            ]} */
    ]
  },
  {
    id: "node1502",
    name: "隐患排查管理",
    icon: 'fa fa-fire-extinguisher',
    children: [{
        id: "node150201",
        name: "巡线不畅及安全间距不足"
      },
      {
        id: "node150202",
        name: "敏感区段"
      },
      {
        id: "node150203",
        name: "伴行管线\电网"
      },
      {
        id: "node150204",
        name: "防汛抗台专项"
      }
    ]
  },
  {
    id: "node1503",
    name: "联防联动信息管理",
    icon: 'fa fa-share-alt',
    children: [{
        id: "node150301",
        name: "管线信息员"
      },
      {
        id: "node150302",
        name: "属地公安"
      },
      {
        id: "node150303",
        name: "关联单位"
      }
    ]
  },
  {
    id: "node1504",
    name: "安全管理",
    icon: 'fa fa-umbrella',
    children: [{
        id: "node150401",
        name: "巡线便道维护"
      },
      {
        id: "node15040201",
        name: "基层宣传活动"
      }
    ]
  },
  {
    id: "node24",
    name: "电话管理",
    icon: 'fa fa-phone',
    children: [{
      id: "node25",
      name: "电话管理"
    }]
  },
  {
    id: "node1505",
    name: "抢维修承包商管理",
    icon: 'fa fa-wrench',
    children: [{
        id: "node150501",
        name: "承包商管理",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-center/doc-center.html'
        }
      },
      {
        id: "node150502",
        name: "人员信息",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-favorite/doc-favorite.html'
        }
      },
      {
        id: "node150503",
        name: "出勤记录",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-classify/doc-classify.html'
        }
      },
      {
        id: "node150504",
        name: "受训情况",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-privilege/doc-privilege.html'
        }
      },
      {
        id: "node150505",
        name: "奖罚历史",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-verify/doc-verify.html'
        }
      },
      {
        id: "node150506",
        name: "装备台账",
        attributes:{
          URL:'jasmvvm/pages/module-jasdoc/doc-record/doc-record.html'
        }
      }
    ]
  }
];