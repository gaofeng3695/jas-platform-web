/**
 *  目录
 *
 * -- 通用业务组件
 * ---- jas-file-list 附件展示列表
 * ---- jas-file-upload 附件上传表单项
 *
 *
 * @dx created on 2019/1/21
 */


/** 通用业务组件--begin ****************************************************************************************************************************************************************************************************************************************************************************************************/

Vue.component('jas-search-for-list', {
  model: {
    prop: 'form',
    event: 'input'
  },
  props: {
    fields: {
      type: Array,
    },
    fieldsConfig: {
      type: Object,
    },
    form: {
      type: Object,
    },
  },
  data: function () {
    return {
      tip: '请输入',
      qtty: 0,
      btnSize: {
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0,
      },
      fatherSelectList: [],
      childSelectList: [],
      isClosed: false,
    }
  },
  template: [
    '<el-form class="jas-search-for-list" :model="form" label-width="120px">',
    '		<el-row v-show="!isClosed">',
    '	    <template v-for="item in fields">',
    '	    	<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">',
    '	    		<el-form-item :label="item.name"  :prop="item.field" :rules="fieldsConfig[item.field] && fieldsConfig[item.field].rules" style="margin-bottom: 15px ">',
    '	    			<template v-if="fieldsConfig[item.field].type == \'select\'">',
    '	    				<el-select :ref="item.field" v-model="form[item.field]" clearable :placeholder="\'请选择\'+item.name" size="small" @visible-change="visibleChange($event,item.field)"  @change="fatherSelectChanged($event,item.field)">',
    // '	    					<el-option v-for="option in fieldsConfig[item.field].options" :key="option.key" :label="option.value" :value="option.key"></el-option>',
    '							<el-option v-for="option in fieldsConfig[item.field].options" :key="option.key" :label="fieldsConfig[item.field].props?option[fieldsConfig[item.field].props.label]:option.value" :value="fieldsConfig[item.field].props?option[fieldsConfig[item.field].props.value]:option.key"></el-option>',
    '	    				</el-select>',
    '	    			</template>',
    '	    			<template v-if="fieldsConfig[item.field].type == \'input\'">',
    '	    				<el-input v-model="form[item.field]" :placeholder="\'请输入\'+item.name" size="small" clearable></el-input>',
    '	    			</template>',
    '	    			<template v-if="fieldsConfig[item.field].type == \'number\'">',
    '							<el-input-number v-model="form[item.field]" :precision="fieldsConfig[item.field].precision" :step="1" :max="fieldsConfig[item.field].max" controls-position="right" clearable :placeholder="\'请输入\'+item.name" size="small"></el-input-number>',
    '	    			</template>',
    '	    			<template v-if="fieldsConfig[item.field].type == \'number\'">',
    '							<el-input-number v-model="form[item.field]" :precision="fieldsConfig[item.field].precision" :step="1" :max="fieldsConfig[item.field].max" controls-position="right" clearable :placeholder="\'请输入\'+item.name" size="small"></el-input-number>',
    '	    			</template>',
    '	    			<template v-if="fieldsConfig[item.field].type == \'date\'">',
    '	    				<el-date-picker clearable value-format="yyyy-MM-dd HH:mm:ss" type="date" :placeholder="\'请选择\'+item.name" v-model="form[item.field]" size="small" style="width: 100%;"></el-date-picker>',
    '	    			</template>',
    '	    			<template v-if="fieldsConfig[item.field].type == \'daterange\'">',
    '	    				<el-date-picker clearable value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"  v-model="form[item.field]" size="small" style="width: 100%;"></el-date-picker>',
    '	    			</template>',
    '	    		</el-form-item>',
    '	    	</el-col>',
    '	    </template>',
    '			<el-col :xs="24" :sm="btnSize.sm" :md="btnSize.md" :lg="btnSize.lg" :xl="btnSize.xl">',
    '					<el-form-item style="float:right;margin-bottom: 0px;">',
    '							<el-button size="small" type="primary" @click="search">查询</el-button>',
    '							<el-button size="small" @click="reset">重置</el-button>',
    // '							<el-button size="small" type="text" @click="isClosed=!isClosed" >收起</el-button>',
    '					</el-form-item>',
    '			</el-col>',
    '		</el-row>',
    // '		<el-row v-show="isClosed">',
    // '			<div style="float:left;">搜索栏</div>',
    // '			<div style="float:right;">',
    // '				<el-button size="small" type="text" @click="isClosed=!isClosed" style="padding:0;">展开</el-button>',
    // '			</div>',
    // '		</el-row>',

    '</el-form>',

  ].join(''),
  mounted: function () {
    this.setFieldsPattern();
    this.resetFieldsConfig(this.fields, this.fieldsConfig);
  },
  watch: {
    fields: function () {
      this.setFieldsPattern();
      this.resetFieldsConfig(this.fields, this.fieldsConfig);
    }
  },
  methods: {
    setFieldsPattern: function () {
      var nFields = this.fields.length;
      this.btnSize.sm = 24 - (12 * nFields) % 24;
      this.btnSize.md = 24 - (8 * nFields) % 24;
      this.btnSize.lg = 24 - (6 * nFields) % 24;
      this.btnSize.xl = 24 - (6 * nFields) % 24;
    },
    search: function () {
      this.formatForm();
      this.$emit('search', this.fields);
    },
    formatForm: function () {
      var that = this;
      this.fields.forEach(function (item) {
        var itemconfig = that.fieldsConfig[item.field];
        if (itemconfig.type === 'daterange' && itemconfig.queryFields) {
          if (that.form[item.field] && that.form[item.field].length > 0) {
            that.form[itemconfig.queryFields[0]] = that.form[item.field][0];
            that.form[itemconfig.queryFields[1]] = that.form[item.field][1];
          } else {
            that.form[itemconfig.queryFields[0]] = null;
            that.form[itemconfig.queryFields[1]] = null;
          }
        }
      });
    },
    reset: function () {
      var obj = this.form;
      this.fields.forEach(function (item) {
        obj[item.field] = '';
      });
      this.triggerFatherSelectsChange();
      this.searchOnce();
    },
    triggerFatherSelectsChange: function (fatherSelectList) {
      var that = this;
      var SelectList = fatherSelectList || that.fatherSelectList;
      setTimeout(function () {
        SelectList.forEach(function (item) {
          that.$refs[item][0].$emit('change', true)
        });
      }, 0);
    },
    resetFieldsConfig: function (fields, fieldsConfig) {
      var that = this;
      var rulesObj = {};
      var fieldArr = [];
      var fieldNameArr = [];
      fields.forEach(function (item) {
        fieldArr.push(item.field);
        fieldNameArr.push(item.name);
      });
      this.fieldArr = fieldArr;
      for (var field in fieldsConfig) {
        var fieldIndex = fieldArr.indexOf(field);
        if (fieldIndex > -1 && fieldsConfig.hasOwnProperty(field)) {
          var config = fieldsConfig[field];
          /* 初始化赋值 */
          if (!config.options) {
            that.$set(config, 'options', []);
            that.$set(config, 'rules', []);
          }
          if (config.type === 'select' && config.childSelect && config.childSelect.length > 0) {
            that.childSelectList.push.apply(that.childSelectList, config.childSelect);
            that.fatherSelectList.push(field);
          }

          /* 请求阈值 */
          if (config.domainName) {
            (function (field, config) {
              that.requestDomainFromDomainTable(config.domainName, function (options) {
                config.options = options;
              });
            })(field, config)
          }
          if (config.optionUrl) {
            (function (field, config) {
              jasTools.ajax.post(jasTools.base.rootPath + "/" + config.optionUrl, {}, function (data) {
                config.options = data.rows;
              });
            })(field, config)
          }
        }
      }

      that.fatherSelectList = that.fatherSelectList.filter(function (field) {
        return that.childSelectList.indexOf(field) === -1;
      });

    },
    visibleChange: function (isShowOptions, currentField) {
      if (!isShowOptions) return;
      var fieldArr = [];
      var fieldNameArr = [];
      var fieldsConfig = this.fieldsConfig;

      this.fields.forEach(function (item) {
        fieldArr.push(item.field);
        fieldNameArr.push(item.name);
      });
      for (var field in fieldsConfig) {
        var fieldIndex = fieldArr.indexOf(field);
        if (fieldIndex > -1 && fieldsConfig.hasOwnProperty(field)) {
          if (fieldsConfig[field].childSelect && fieldsConfig[field].childSelect.indexOf(currentField) > -1) {
            if (!this.form[field]) {
              top.Vue.prototype.$message({
                message: '请先选择' + fieldNameArr[fieldIndex],
                type: 'warning'
              });
            }
          }
        }
      }
    },
    fatherSelectChanged: function (isInit, fatherField) {
      if (isInit != true) {
        isInit = false;
      }
      var that = this;
      var fieldConfig = this.fieldsConfig[fatherField];
      var form = this.form;
      var setChildOptionsAndValue = function (childField, options) { // 入参下拉选项
        that.fieldsConfig[childField].options = options;
        //form[childField] = ''
        !isInit && (form[childField] = '');
        // if (options.length === 1) { //只有一个选项就自动复制
        // 	form[childField] = options[0].key;
        that.$refs[childField][0].$emit('change', isInit);
        //}

      };

      var getAndSet = function (fatherField, fatherValue, childField, requestUrl) {
        if (fatherValue) { //进行子级的查找 后台请求
          var obj = {
            "rows": 100,
            "page": 1,
          };
          var fieldConfig = that.fieldsConfig[childField];
          if (fieldConfig.requestParams) {
            obj = jasTools.base.extend(obj, fieldConfig.requestParams);
          }
          obj[fatherField] = fatherValue;
          jasTools.ajax.post(jasTools.base.rootPath + "/" + requestUrl, obj, function (data) {
            setChildOptionsAndValue(childField, data.rows)
          });
        } else {
          setChildOptionsAndValue(childField, []);
        }
      };

      fieldConfig.childSelect && fieldConfig.childSelect.forEach(function (childField, index) {
        if (that.fieldArr.indexOf(childField) < 0 || !fieldConfig.childUrl || fieldConfig.childUrl.length === 0) return;
        var url = fieldConfig.childUrl[index] || fieldConfig.childUrl[0];
        getAndSet(fatherField, form[fatherField], childField, url);
      });

      this.searchOnce();
    },
    searchOnce: function () {
      var that = this;
      if (this.timerSearch) return;
      this.timerSearch = setTimeout(function () {
        that.search();
        that.timerSearch = null;
      }, 100);
    },
    requestDomainFromDomainTable: function (domainName, cb) {
      var that = this;
      var url = jasTools.base.rootPath + "/jasframework/sysdoman/getDoman.do";
      jasTools.ajax.get(url, {
        "domainName": domainName
      }, function (data) {
        var aDomain = data.map(function (item) {
          return {
            key: item.codeId,
            value: item.codeName,
          }
        });
        cb && cb(aDomain);
      });
    },
    requestDomainFromBizTable: function (url, obj, cb) {
      var that = this;
      var url = jasTools.base.rootPath + url;
      jasTools.ajax.post(url, obj, function (data) {
        cb && cb(data.rows);
      }, function () {
        cb && cb([]);
      });
    },
  },

});


/** 通用业务组件--end ****************************************************************************************************************************************************************************************************************************************************************************************************/