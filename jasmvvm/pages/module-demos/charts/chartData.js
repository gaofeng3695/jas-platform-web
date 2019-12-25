var Chartdata = [ //
  {
    label: '高后果区',
    config: {
      label: '高后果区',
      type: 'line',
      tooltipfields: ['status', 'range'],
      tooltipfieldName: ['后果等级', '里程'],
      series: [ //
        {
          name: '高后果区',
          values: [ //
            {
              name: '一级',
              value: 0,
              color: '#f44336'
            }, {
              name: '二级',
              value: 1,
              color: '#779aff'
            }, {
              name: '三级',
              value: 2,
              color: '#2fc25b'
            }
          ]
        }
      ]
    }
  }, {
    label: '风险评价',
    config: {
      label: '风险评价',
      type: 'line',
      tooltipfields: ['status', 'range', 'happen', 'result', 'riskval'],
      tooltipfieldName: ['风险等级', '里程', '失效可能性', '失效后果', '风险评分'],
      series: [ //
        {
          name: '风险等级',
          values: [ //
            {
              name: '高',
              value: 0,
              color: '#f44336'
            }, {
              name: '中',
              value: 1,
              color: '#779aff'
            }, {
              name: '低',
              value: 2,
              color: '#2fc25b'
            }
          ]
        }
      ]
    }
  }, {
    label: '埋深',
    config: {
      label: '埋深',
      type: 'polyline',
      series: [ //
        {
          name: '埋深',
          values: [ //
            {
              name: '埋深',
              value: 0,
              color: '#2fc25b'
            }
          ]
        }
      ]
    }
  }, {
    label: '本体缺陷',
    children: [{
        label: '本体缺陷点',
        config: {
          label: '本体缺陷点',
          type: 'dot',
          tooltipfields: ['status', 'mileage', 'no', 'position', 'clock', 'length', 'width', 'depth', 'percent'],
          tooltipfieldName: ['缺陷类型', '里程', '缺陷编号', '部位', '周向位置', '缺陷长度（mm）', '缺陷宽度（mm）', '缺陷深度（mm）', '缺陷百分比（%）'],
          series: [ //
            {
              name: '本体缺陷点',
              values: [ //
                {
                  name: '金属损失',
                  value: 0,
                  color: '#f44336'
                }, {
                  name: '变形',
                  value: 1,
                  color: '#779aff'
                }, {
                  name: '环焊缝异常',
                  value: 2,
                  color: '#2fc25b'
                }, {
                  name: '管体缝异常',
                  value: 2,
                  color: '#2fc25b'
                }, {
                  name: '其他',
                  value: 2,
                  color: '#2fc25b'
                }
              ]
            }
          ]
        }
      }, {
        label: '开挖验证及修复',
        config: {
          label: '开挖验证及修复',
          type: 'dot',
          tooltipfields: ['status', 'mileage'],
          tooltipfieldName: ['类别', '里程'],
          series: [ //
            {
              name: '开挖验证及修复',
              values: [ //
                {
                  name: '开挖验证及修复',
                  value: 0,
                  color: '#f44336'
                }
              ]
            },
          ]
        }
      },


    ],

  },
  {
    label: '腐蚀防护',
    children: [ //
      {
        label: '防腐层整体质量',
        config: {
          label: '防腐层整体质量',
          type: 'line',
          tooltipfields: ['status', 'range'],
          tooltipfieldName: ['防腐层整体质量', '起止里程'],
          series: [ //
            {
              name: '防腐层整体质量',
              values: [ //
                {
                  name: '一级',
                  value: 0,
                  // color: '#f44336'
                }, {
                  name: '二级',
                  value: 1,
                  // color: '#779aff'
                }, {
                  name: '三级',
                  value: 2,
                  // color: '#2fc25b'
                }, {
                  name: '四级',
                  value: 1,
                  // color: '#779aff'
                }
              ]
            }
          ]
        }
      }, {
        label: '防腐层破损点',
        config: {
          label: '防腐层破损点',
          type: 'dot',
          series: [ //
            {
              name: '防腐层破损点',
              values: [ //
                {
                  name: '一级',
                  value: 0,
                  // color: '#f44336'
                }, {
                  name: '二级',
                  value: 1,
                  // color: '#779aff'
                }, {
                  name: '三级',
                  value: 2,
                  // color: '#2fc25b'
                }, {
                  name: '四级',
                  value: 1,
                  // color: '#779aff'
                }
              ]
            }
          ]
        }
      },
      {
        label: '土壤腐蚀',
        config: {
          label: '土壤腐蚀',
          type: 'line',
          tooltipfields: ['status', 'range', 'defend'],
          tooltipfieldName: ['腐蚀强度', '起止里程', '土壤电阻率'],
          series: [ //
            {
              name: '腐蚀强度',
              values: [ //
                {
                  name: '强',
                  value: 0,
                  color: '#f44336'
                }, {
                  name: '中',
                  value: 1,
                  color: '#779aff'
                }, {
                  name: '弱',
                  value: 2,
                  color: '#2fc25b'
                }
              ]
            }
          ]
        }
      },
      {
        label: '杂散电流干扰',
        config: {
          label: '杂散电流干扰',
          type: 'line',
          tooltipfields: ['status', 'range', 'length', 'flowtype', 'fckdeph', 'fckwhere'],
          tooltipfieldName: ['分类', '起止里程', '长度', '电流类型', '干扰程度', '干扰源'],

          series: [ //
            {
              name: '杂散电流干扰',
              values: [ //
                {
                  name: '干扰区',
                  value: 0,
                  color: '#f44336'
                }, {
                  name: '非干扰区',
                  value: 1,
                  color: '#fff'
                }
              ]
            }
          ]
        }
      },
      {
        label: '阴保有效性',
        config: {
          label: '阴保有效性',
          type: 'line',
          tooltipfields: ['status', 'range'],
          tooltipfieldName: ['分类', '起止里程'],
          series: [ //
            {
              name: '阴保有效性',
              values: [ //
                {
                  name: '无效',
                  value: 0,
                  color: '#f44336'
                }, {
                  name: '有效',
                  value: 1,
                  color: '#779aff'
                }
              ]
            }

          ]
        }
      },
    ]
  }, {
    label: '管道保护',
    config: {
      label: '管道保护',
      type: 'dot',
      tooltipfields: ['series', 'mileage', 'reason', 'result', 'date'],
      tooltipfieldName: ['类别', '里程', '事件成因', '事件现象', '时间'],
      series: [ //
        {
          name: '第三方活动',
          values: [ //
            {
              name: '第三方活动',
              value: 0,
              color: '#f44336'
            }
          ]
        }, {
          name: '自然环境变化',
          values: [ //
            {
              name: '自然环境变化',
              value: 0,
              color: '#f44336'
            }
          ]
        }, {
          name: '管道及设施损坏',
          values: [ //
            {
              name: '管道及设施损坏',
              value: 0,
              color: '#f44336'
            }
          ]
        }
      ]
    }
  }, {
    label: '地灾防治',
    config: {
      label: '地灾防治',
      type: 'dot',
      tooltipfields: ['status', 'mileage', 'rsntype', 'dotype', 'rsltype', ],
      tooltipfieldName: ['稳定性现状', '里程', '地灾类型', '防治级别', '治理状态'],
      series: [ //
        {
          name: '地灾敏感点',
          values: [ //
            {
              name: '稳定',
              value: 0,
            }, {
              name: '基本稳定',
              value: 1,
            }, {
              name: '欠稳定',
              value: 2,
            }, {
              name: '不稳定',
              value: 3,
            },
          ]
        }
      ]
    }
  }, {
    label: '管道设施',
    children: [ //
      {
        label: '三桩一牌',
        config: {
          label: '三桩一牌',
          type: 'dot',
          tooltipfields: ['series', 'mileage', 'stickno'],
          tooltipfieldName: ['类别', '里程', '桩号'],
          series: [ //
            {
              name: '三桩一牌',
              values: [ //
                {
                  name: '三桩一牌',
                  value: 0,
                  color: '#f44336'
                }
              ]
            }
          ]
        }
      }, {
        label: '地下障碍物',
        config: {
          label: '地下障碍物',
          type: 'dot',
          tooltipfields: ['series', 'mileage', 'mindist'],
          tooltipfieldName: ['障碍物名称', '里程', '最小距离'],
          series: [{
            name: '地下障碍物',
            values: [ //
              {
                name: '地下障碍物',
                value: 0,
                color: '#f44336'
              }
            ]
          }]
        }

      }
    ]

  }
];


var Treedata = [ //
  {
    label: '蒙西管道',
    children: [{
      label: '互联互通段',
      start: 0,
      end: 38000
    }]
  },
  {
    label: '高压官网',
    children: [{
      label: 'HA线',

    }]
  }, {
    label: '次高压官网',
    children: [{
      label: 'A线',
      children: [{
        label: 'A干线'
      }, {
        label: 'A2干线'
      }, {
        label: 'A3干线'
      }]
    }, {
      label: 'B线',
      children: [{
        label: 'B干线'
      }, {
        label: 'B支线'
      }]
    }]

  }
];