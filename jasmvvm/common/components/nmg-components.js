/**
 * table of Contents 目录
 *
 * -- 项目通用组件
 * ---- nmg- 内蒙古城市区域划分
 *
 *
 * @GF created on 2020/01/09
 */

//多选下拉树
Vue.component('nmg-county-cascader', { //value 值 支持逗号分隔 的多选下拉框
  props: {
    value: {},
    options: {
      type: Array,
      default: function () {
//        return _aNMGDist
      }
    },
    item: {
      type: Object, //{field,name}
      default: function () {
        return {
          field: 'oid',
          name: '行政区划',
        }
      }
    },
    props: {
      default: function () {
        return {
          value: 'oid',
          label: 'name',
        }
      }
    }
  },
  data: function () {
    return {
      cLabel: '',
      value_datas:[],
      options_data:[]
    }
  },
  computed: {
    _value: {
      get: function () {
        if (!this.options_data || !this.value || !this.options_data.length) return [];
        return this.getIdArrFromTree(this.options_data, this.value);
      },
      set: function (newValue) {
        this.cLabel = this.$refs.elcasc.currentLabels;
        this.$emit('input', newValue[newValue.length - 1]);
      }
    }
  },
  mounted: function () {
    this.cLabel = this.$refs.elcasc.currentLabels;
  },
  template: [
    '<el-cascader ref="elcasc" :options="options_data" :props="props" v-model="_value" :show-all-levels="true" @visible-change="visibleChange($event,item.field)"',
    '	change-on-select clearable :placeholder="\'请选择\'+item.name"  size="small" @change=handelArea>',
    '</el-cascader>',
  ].join(''),
  created: function () {
	this.requestAreaData();
  },
  methods: {
	 handelArea:function(item){
		this.value_datas = item;
		this.cLabel = this.$refs.elcasc.currentLabels;
	}, 
    visibleChange: function ($event,aa) {
    	console.log(aa)
      this.$emit('visible-change', $event);
    },
    getIdArrFromTree: function (treeData, nodeId, config) {

      var pidArr = [nodeId];
      var getPId = function (dataArr, oid, pid) {
        for (var i = 0; i < dataArr.length; i++) {
          var item = dataArr[i];
          if (item.oid === oid) {
            return pid;
          } else {
            if (item.children && item.children.length > 0) {
              var result = getPId(item.children, oid, item.oid);
              if (result) return result;
            }
          }
        }
      };
      var getPPId = function (dataArr, oid) {
        var pid = getPId(dataArr, oid, '');
        if (pid) {
          pidArr.push(pid);
          getPPId(dataArr, pid);
        } else {
          return pidArr;
        }
      };

      getPPId(treeData, nodeId);
      return pidArr.reverse();
    },
    requestAreaData:function(){
    	var that = this;
    	var param = window.jasTools.base.getParamsInUrl(location.href);
        var menuCode;
        if (param.menuCode) {
        	menuCode = param.menuCode;
    	}
        delete param.menuCode;
    	jasTools.ajax.post(jasTools.base.rootPath + "/nmpsp/area/getCityAndCounty.do", {"functionCode":menuCode}, function (data) {
    		if(data.status===1){
    			that.options_data = data.rows
    		}
		});
    }
  }
});


var _aNMGDist = [ //
  {
    "code": "150100000000",
    "parentOid": "15",
    "name": "呼和浩特市",
    "wbs": "1501",
    "oid": "150100000000",
    "type": "2",
    "children": [{
      "code": "150101000000",
      "parentOid": "150100000000",
      "name": "市辖区",
      "wbs": "150101",
      "oid": "150101000000",
      "type": "3"
    }, {
      "code": "150102000000",
      "parentOid": "150100000000",
      "name": "新城区",
      "wbs": "150102",
      "oid": "150102000000",
      "type": "3"
    }, {
      "code": "150103000000",
      "parentOid": "150100000000",
      "name": "回民区",
      "wbs": "150103",
      "oid": "150103000000",
      "type": "3"
    }, {
      "code": "150104000000",
      "parentOid": "150100000000",
      "name": "玉泉区",
      "wbs": "150104",
      "oid": "150104000000",
      "type": "3"
    }, {
      "code": "150105000000",
      "parentOid": "150100000000",
      "name": "赛罕区",
      "wbs": "150105",
      "oid": "150105000000",
      "type": "3"
    }, {
      "code": "150121000000",
      "parentOid": "150100000000",
      "name": "土默特左旗",
      "wbs": "150121",
      "oid": "150121000000",
      "type": "3"
    }, {
      "code": "150122000000",
      "parentOid": "150100000000",
      "name": "托克托县",
      "wbs": "150122",
      "oid": "150122000000",
      "type": "3"
    }, {
      "code": "150123000000",
      "parentOid": "150100000000",
      "name": "和林格尔县",
      "wbs": "150123",
      "oid": "150123000000",
      "type": "3"
    }, {
      "code": "150124000000",
      "parentOid": "150100000000",
      "name": "清水河县",
      "wbs": "150124",
      "oid": "150124000000",
      "type": "3"
    }, {
      "code": "150125000000",
      "parentOid": "150100000000",
      "name": "武川县",
      "wbs": "150125",
      "oid": "150125000000",
      "type": "3"
    }]
  }, {
    "code": "150200000000",
    "parentOid": "15",
    "name": "包头市",
    "wbs": "1502",
    "oid": "150200000000",
    "type": "2",
    "children": [{
      "code": "150201000000",
      "parentOid": "150200000000",
      "name": "市辖区",
      "wbs": "150201",
      "oid": "150201000000",
      "type": "3"
    }, {
      "code": "150202000000",
      "parentOid": "150200000000",
      "name": "东河区",
      "wbs": "150202",
      "oid": "150202000000",
      "type": "3"
    }, {
      "code": "150203000000",
      "parentOid": "150200000000",
      "name": "昆都仑区",
      "wbs": "150203",
      "oid": "150203000000",
      "type": "3"
    }, {
      "code": "150204000000",
      "parentOid": "150200000000",
      "name": "青山区",
      "wbs": "150204",
      "oid": "150204000000",
      "type": "3"
    }, {
      "code": "150205000000",
      "parentOid": "150200000000",
      "name": "石拐区",
      "wbs": "150205",
      "oid": "150205000000",
      "type": "3"
    }, {
      "code": "150206000000",
      "parentOid": "150200000000",
      "name": "白云鄂博矿区",
      "wbs": "150206",
      "oid": "150206000000",
      "type": "3"
    }, {
      "code": "150207000000",
      "parentOid": "150200000000",
      "name": "九原区",
      "wbs": "150207",
      "oid": "150207000000",
      "type": "3"
    }, {
      "code": "150221000000",
      "parentOid": "150200000000",
      "name": "土默特右旗",
      "wbs": "150221",
      "oid": "150221000000",
      "type": "3"
    }, {
      "code": "150222000000",
      "parentOid": "150200000000",
      "name": "固阳县",
      "wbs": "150222",
      "oid": "150222000000",
      "type": "3"
    }, {
      "code": "150223000000",
      "parentOid": "150200000000",
      "name": "达尔罕茂明安联合旗",
      "wbs": "150223",
      "oid": "150223000000",
      "type": "3"
    }]
  }, {
    "code": "150300000000",
    "parentOid": "15",
    "name": "乌海市",
    "wbs": "1503",
    "oid": "150300000000",
    "type": "2",
    "children": [{
      "code": "150301000000",
      "parentOid": "150300000000",
      "name": "市辖区",
      "wbs": "150301",
      "oid": "150301000000",
      "type": "3"
    }, {
      "code": "150302000000",
      "parentOid": "150300000000",
      "name": "海勃湾区",
      "wbs": "150302",
      "oid": "150302000000",
      "type": "3"
    }, {
      "code": "150303000000",
      "parentOid": "150300000000",
      "name": "海南区",
      "wbs": "150303",
      "oid": "150303000000",
      "type": "3"
    }, {
      "code": "150304000000",
      "parentOid": "150300000000",
      "name": "乌达区",
      "wbs": "150304",
      "oid": "150304000000",
      "type": "3"
    }]
  }, {
    "code": "150400000000",
    "parentOid": "15",
    "name": "赤峰市",
    "wbs": "1504",
    "oid": "150400000000",
    "type": "2",
    "children": [{
      "code": "150401000000",
      "parentOid": "150400000000",
      "name": "市辖区",
      "wbs": "150401",
      "oid": "150401000000",
      "type": "3"
    }, {
      "code": "150402000000",
      "parentOid": "150400000000",
      "name": "红山区",
      "wbs": "150402",
      "oid": "150402000000",
      "type": "3"
    }, {
      "code": "150403000000",
      "parentOid": "150400000000",
      "name": "元宝山区",
      "wbs": "150403",
      "oid": "150403000000",
      "type": "3"
    }, {
      "code": "150404000000",
      "parentOid": "150400000000",
      "name": "松山区",
      "wbs": "150404",
      "oid": "150404000000",
      "type": "3"
    }, {
      "code": "150421000000",
      "parentOid": "150400000000",
      "name": "阿鲁科尔沁旗",
      "wbs": "150421",
      "oid": "150421000000",
      "type": "3"
    }, {
      "code": "150422000000",
      "parentOid": "150400000000",
      "name": "巴林左旗",
      "wbs": "150422",
      "oid": "150422000000",
      "type": "3"
    }, {
      "code": "150423000000",
      "parentOid": "150400000000",
      "name": "巴林右旗",
      "wbs": "150423",
      "oid": "150423000000",
      "type": "3"
    }, {
      "code": "150424000000",
      "parentOid": "150400000000",
      "name": "林西县",
      "wbs": "150424",
      "oid": "150424000000",
      "type": "3"
    }, {
      "code": "150425000000",
      "parentOid": "150400000000",
      "name": "克什克腾旗",
      "wbs": "150425",
      "oid": "150425000000",
      "type": "3"
    }, {
      "code": "150426000000",
      "parentOid": "150400000000",
      "name": "翁牛特旗",
      "wbs": "150426",
      "oid": "150426000000",
      "type": "3"
    }, {
      "code": "150428000000",
      "parentOid": "150400000000",
      "name": "喀喇沁旗",
      "wbs": "150428",
      "oid": "150428000000",
      "type": "3"
    }, {
      "code": "150429000000",
      "parentOid": "150400000000",
      "name": "宁城县",
      "wbs": "150429",
      "oid": "150429000000",
      "type": "3"
    }, {
      "code": "150430000000",
      "parentOid": "150400000000",
      "name": "敖汉旗",
      "wbs": "150430",
      "oid": "150430000000",
      "type": "3"
    }]
  }, {
    "code": "150500000000",
    "parentOid": "15",
    "name": "通辽市",
    "wbs": "1505",
    "oid": "150500000000",
    "type": "2",
    "children": [{
      "code": "150501000000",
      "parentOid": "150500000000",
      "name": "市辖区",
      "wbs": "150501",
      "oid": "150501000000",
      "type": "3"
    }, {
      "code": "150502000000",
      "parentOid": "150500000000",
      "name": "科尔沁区",
      "wbs": "150502",
      "oid": "150502000000",
      "type": "3"
    }, {
      "code": "150521000000",
      "parentOid": "150500000000",
      "name": "科尔沁左翼中旗",
      "wbs": "150521",
      "oid": "150521000000",
      "type": "3"
    }, {
      "code": "150522000000",
      "parentOid": "150500000000",
      "name": "科尔沁左翼后旗",
      "wbs": "150522",
      "oid": "150522000000",
      "type": "3"
    }, {
      "code": "150523000000",
      "parentOid": "150500000000",
      "name": "开鲁县",
      "wbs": "150523",
      "oid": "150523000000",
      "type": "3"
    }, {
      "code": "150524000000",
      "parentOid": "150500000000",
      "name": "库伦旗",
      "wbs": "150524",
      "oid": "150524000000",
      "type": "3"
    }, {
      "code": "150525000000",
      "parentOid": "150500000000",
      "name": "奈曼旗",
      "wbs": "150525",
      "oid": "150525000000",
      "type": "3"
    }, {
      "code": "150526000000",
      "parentOid": "150500000000",
      "name": "扎鲁特旗",
      "wbs": "150526",
      "oid": "150526000000",
      "type": "3"
    }, {
      "code": "150581000000",
      "parentOid": "150500000000",
      "name": "霍林郭勒市",
      "wbs": "150581",
      "oid": "150581000000",
      "type": "3"
    }]
  }, {
    "code": "150600000000",
    "parentOid": "15",
    "name": "鄂尔多斯市",
    "wbs": "1506",
    "oid": "150600000000",
    "type": "2",
    "children": [{
      "code": "150601000000",
      "parentOid": "150600000000",
      "name": "市辖区",
      "wbs": "150601",
      "oid": "150601000000",
      "type": "3"
    }, {
      "code": "150602000000",
      "parentOid": "150600000000",
      "name": "东胜区",
      "wbs": "150602",
      "oid": "150602000000",
      "type": "3"
    }, {
      "code": "150603000000",
      "parentOid": "150600000000",
      "name": "康巴什区",
      "wbs": "150603",
      "oid": "150603000000",
      "type": "3"
    }, {
      "code": "150621000000",
      "parentOid": "150600000000",
      "name": "达拉特旗",
      "wbs": "150621",
      "oid": "150621000000",
      "type": "3"
    }, {
      "code": "150622000000",
      "parentOid": "150600000000",
      "name": "准格尔旗",
      "wbs": "150622",
      "oid": "150622000000",
      "type": "3"
    }, {
      "code": "150623000000",
      "parentOid": "150600000000",
      "name": "鄂托克前旗",
      "wbs": "150623",
      "oid": "150623000000",
      "type": "3"
    }, {
      "code": "150624000000",
      "parentOid": "150600000000",
      "name": "鄂托克旗",
      "wbs": "150624",
      "oid": "150624000000",
      "type": "3"
    }, {
      "code": "150625000000",
      "parentOid": "150600000000",
      "name": "杭锦旗",
      "wbs": "150625",
      "oid": "150625000000",
      "type": "3"
    }, {
      "code": "150626000000",
      "parentOid": "150600000000",
      "name": "乌审旗",
      "wbs": "150626",
      "oid": "150626000000",
      "type": "3"
    }, {
      "code": "150627000000",
      "parentOid": "150600000000",
      "name": "伊金霍洛旗",
      "wbs": "150627",
      "oid": "150627000000",
      "type": "3"
    }]
  }, {
    "code": "150700000000",
    "parentOid": "15",
    "name": "呼伦贝尔市",
    "wbs": "1507",
    "oid": "150700000000",
    "type": "2",
    "children": [{
      "code": "150701000000",
      "parentOid": "150700000000",
      "name": "市辖区",
      "wbs": "150701",
      "oid": "150701000000",
      "type": "3"
    }, {
      "code": "150702000000",
      "parentOid": "150700000000",
      "name": "海拉尔区",
      "wbs": "150702",
      "oid": "150702000000",
      "type": "3"
    }, {
      "code": "150703000000",
      "parentOid": "150700000000",
      "name": "扎赉诺尔区",
      "wbs": "150703",
      "oid": "150703000000",
      "type": "3"
    }, {
      "code": "150721000000",
      "parentOid": "150700000000",
      "name": "阿荣旗",
      "wbs": "150721",
      "oid": "150721000000",
      "type": "3"
    }, {
      "code": "150722000000",
      "parentOid": "150700000000",
      "name": "莫力达瓦达斡尔族自治旗",
      "wbs": "150722",
      "oid": "150722000000",
      "type": "3"
    }, {
      "code": "150723000000",
      "parentOid": "150700000000",
      "name": "鄂伦春自治旗",
      "wbs": "150723",
      "oid": "150723000000",
      "type": "3"
    }, {
      "code": "150724000000",
      "parentOid": "150700000000",
      "name": "鄂温克族自治旗",
      "wbs": "150724",
      "oid": "150724000000",
      "type": "3"
    }, {
      "code": "150725000000",
      "parentOid": "150700000000",
      "name": "陈巴尔虎旗",
      "wbs": "150725",
      "oid": "150725000000",
      "type": "3"
    }, {
      "code": "150726000000",
      "parentOid": "150700000000",
      "name": "新巴尔虎左旗",
      "wbs": "150726",
      "oid": "150726000000",
      "type": "3"
    }, {
      "code": "150727000000",
      "parentOid": "150700000000",
      "name": "新巴尔虎右旗",
      "wbs": "150727",
      "oid": "150727000000",
      "type": "3"
    }, {
      "code": "150781000000",
      "parentOid": "150700000000",
      "name": "满洲里市",
      "wbs": "150781",
      "oid": "150781000000",
      "type": "3"
    }, {
      "code": "150782000000",
      "parentOid": "150700000000",
      "name": "牙克石市",
      "wbs": "150782",
      "oid": "150782000000",
      "type": "3"
    }, {
      "code": "150783000000",
      "parentOid": "150700000000",
      "name": "扎兰屯市",
      "wbs": "150783",
      "oid": "150783000000",
      "type": "3"
    }, {
      "code": "150784000000",
      "parentOid": "150700000000",
      "name": "额尔古纳市",
      "wbs": "150784",
      "oid": "150784000000",
      "type": "3"
    }, {
      "code": "150785000000",
      "parentOid": "150700000000",
      "name": "根河市",
      "wbs": "150785",
      "oid": "150785000000",
      "type": "3"
    }]
  }, {
    "code": "150800000000",
    "parentOid": "15",
    "name": "巴彦淖尔市",
    "wbs": "1508",
    "oid": "150800000000",
    "type": "2",
    "children": [{
      "code": "150801000000",
      "parentOid": "150800000000",
      "name": "市辖区",
      "wbs": "150801",
      "oid": "150801000000",
      "type": "3"
    }, {
      "code": "150802000000",
      "parentOid": "150800000000",
      "name": "临河区",
      "wbs": "150802",
      "oid": "150802000000",
      "type": "3"
    }, {
      "code": "150821000000",
      "parentOid": "150800000000",
      "name": "五原县",
      "wbs": "150821",
      "oid": "150821000000",
      "type": "3"
    }, {
      "code": "150822000000",
      "parentOid": "150800000000",
      "name": "磴口县",
      "wbs": "150822",
      "oid": "150822000000",
      "type": "3"
    }, {
      "code": "150823000000",
      "parentOid": "150800000000",
      "name": "乌拉特前旗",
      "wbs": "150823",
      "oid": "150823000000",
      "type": "3"
    }, {
      "code": "150824000000",
      "parentOid": "150800000000",
      "name": "乌拉特中旗",
      "wbs": "150824",
      "oid": "150824000000",
      "type": "3"
    }, {
      "code": "150825000000",
      "parentOid": "150800000000",
      "name": "乌拉特后旗",
      "wbs": "150825",
      "oid": "150825000000",
      "type": "3"
    }, {
      "code": "150826000000",
      "parentOid": "150800000000",
      "name": "杭锦后旗",
      "wbs": "150826",
      "oid": "150826000000",
      "type": "3"
    }]
  }, {
    "code": "150900000000",
    "parentOid": "15",
    "name": "乌兰察布市",
    "wbs": "1509",
    "oid": "150900000000",
    "type": "2",
    "children": [{
      "code": "150901000000",
      "parentOid": "150900000000",
      "name": "市辖区",
      "wbs": "150901",
      "oid": "150901000000",
      "type": "3"
    }, {
      "code": "150902000000",
      "parentOid": "150900000000",
      "name": "集宁区",
      "wbs": "150902",
      "oid": "150902000000",
      "type": "3"
    }, {
      "code": "150921000000",
      "parentOid": "150900000000",
      "name": "卓资县",
      "wbs": "150921",
      "oid": "150921000000",
      "type": "3"
    }, {
      "code": "150922000000",
      "parentOid": "150900000000",
      "name": "化德县",
      "wbs": "150922",
      "oid": "150922000000",
      "type": "3"
    }, {
      "code": "150923000000",
      "parentOid": "150900000000",
      "name": "商都县",
      "wbs": "150923",
      "oid": "150923000000",
      "type": "3"
    }, {
      "code": "150924000000",
      "parentOid": "150900000000",
      "name": "兴和县",
      "wbs": "150924",
      "oid": "150924000000",
      "type": "3"
    }, {
      "code": "150925000000",
      "parentOid": "150900000000",
      "name": "凉城县",
      "wbs": "150925",
      "oid": "150925000000",
      "type": "3"
    }, {
      "code": "150926000000",
      "parentOid": "150900000000",
      "name": "察哈尔右翼前旗",
      "wbs": "150926",
      "oid": "150926000000",
      "type": "3"
    }, {
      "code": "150927000000",
      "parentOid": "150900000000",
      "name": "察哈尔右翼中旗",
      "wbs": "150927",
      "oid": "150927000000",
      "type": "3"
    }, {
      "code": "150928000000",
      "parentOid": "150900000000",
      "name": "察哈尔右翼后旗",
      "wbs": "150928",
      "oid": "150928000000",
      "type": "3"
    }, {
      "code": "150929000000",
      "parentOid": "150900000000",
      "name": "四子王旗",
      "wbs": "150929",
      "oid": "150929000000",
      "type": "3"
    }, {
      "code": "150981000000",
      "parentOid": "150900000000",
      "name": "丰镇市",
      "wbs": "150981",
      "oid": "150981000000",
      "type": "3"
    }]
  }, {
    "code": "152200000000",
    "parentOid": "15",
    "name": "兴安盟",
    "wbs": "1522",
    "oid": "152200000000",
    "type": "2",
    "children": [{
      "code": "152201000000",
      "parentOid": "152200000000",
      "name": "乌兰浩特市",
      "wbs": "152201",
      "oid": "152201000000",
      "type": "3"
    }, {
      "code": "152202000000",
      "parentOid": "152200000000",
      "name": "阿尔山市",
      "wbs": "152202",
      "oid": "152202000000",
      "type": "3"
    }, {
      "code": "152221000000",
      "parentOid": "152200000000",
      "name": "科尔沁右翼前旗",
      "wbs": "152221",
      "oid": "152221000000",
      "type": "3"
    }, {
      "code": "152222000000",
      "parentOid": "152200000000",
      "name": "科尔沁右翼中旗",
      "wbs": "152222",
      "oid": "152222000000",
      "type": "3"
    }, {
      "code": "152223000000",
      "parentOid": "152200000000",
      "name": "扎赉特旗",
      "wbs": "152223",
      "oid": "152223000000",
      "type": "3"
    }, {
      "code": "152224000000",
      "parentOid": "152200000000",
      "name": "突泉县",
      "wbs": "152224",
      "oid": "152224000000",
      "type": "3"
    }]
  }, {
    "code": "152500000000",
    "parentOid": "15",
    "name": "锡林郭勒盟",
    "wbs": "1525",
    "oid": "152500000000",
    "type": "2",
    "children": [{
      "code": "152501000000",
      "parentOid": "152500000000",
      "name": "二连浩特市",
      "wbs": "152501",
      "oid": "152501000000",
      "type": "3"
    }, {
      "code": "152502000000",
      "parentOid": "152500000000",
      "name": "锡林浩特市",
      "wbs": "152502",
      "oid": "152502000000",
      "type": "3"
    }, {
      "code": "152522000000",
      "parentOid": "152500000000",
      "name": "阿巴嘎旗",
      "wbs": "152522",
      "oid": "152522000000",
      "type": "3"
    }, {
      "code": "152523000000",
      "parentOid": "152500000000",
      "name": "苏尼特左旗",
      "wbs": "152523",
      "oid": "152523000000",
      "type": "3"
    }, {
      "code": "152524000000",
      "parentOid": "152500000000",
      "name": "苏尼特右旗",
      "wbs": "152524",
      "oid": "152524000000",
      "type": "3"
    }, {
      "code": "152525000000",
      "parentOid": "152500000000",
      "name": "东乌珠穆沁旗",
      "wbs": "152525",
      "oid": "152525000000",
      "type": "3"
    }, {
      "code": "152526000000",
      "parentOid": "152500000000",
      "name": "西乌珠穆沁旗",
      "wbs": "152526",
      "oid": "152526000000",
      "type": "3"
    }, {
      "code": "152527000000",
      "parentOid": "152500000000",
      "name": "太仆寺旗",
      "wbs": "152527",
      "oid": "152527000000",
      "type": "3"
    }, {
      "code": "152528000000",
      "parentOid": "152500000000",
      "name": "镶黄旗",
      "wbs": "152528",
      "oid": "152528000000",
      "type": "3"
    }, {
      "code": "152529000000",
      "parentOid": "152500000000",
      "name": "正镶白旗",
      "wbs": "152529",
      "oid": "152529000000",
      "type": "3"
    }, {
      "code": "152530000000",
      "parentOid": "152500000000",
      "name": "正蓝旗",
      "wbs": "152530",
      "oid": "152530000000",
      "type": "3"
    }, {
      "code": "152531000000",
      "parentOid": "152500000000",
      "name": "多伦县",
      "wbs": "152531",
      "oid": "152531000000",
      "type": "3"
    }]
  }, {
    "code": "152900000000",
    "parentOid": "15",
    "name": "阿拉善盟",
    "wbs": "1529",
    "oid": "152900000000",
    "type": "2",
    "children": [{
      "code": "152921000000",
      "parentOid": "152900000000",
      "name": "阿拉善左旗",
      "wbs": "152921",
      "oid": "152921000000",
      "type": "3"
    }, {
      "code": "152922000000",
      "parentOid": "152900000000",
      "name": "阿拉善右旗",
      "wbs": "152922",
      "oid": "152922000000",
      "type": "3"
    }, {
      "code": "152923000000",
      "parentOid": "152900000000",
      "name": "额济纳旗",
      "wbs": "152923",
      "oid": "152923000000",
      "type": "3"
    }]
  }
]