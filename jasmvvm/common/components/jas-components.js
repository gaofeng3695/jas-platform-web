/**
 * table of Contents 目录
 *
 * -- 通用基础组件
 * ---- jas-base-module-title 模块分组标题
 * ---- jas-base-group-title 表单分组标题
 * ---- jas-iframe-dialog 弹出框
 * ---- jas-dialog-wrapper 弹出框内容框架
 * ---- jas-base-el-multi-select 多选下拉框
 * ---- jas-base-el-cascader 多选下拉树
 * ---- jas-detail-table 详情表格
 * ---- jas-list-wrapper 搜索和表格框架
 * ---- jas-two-panel-resizer 两栏分割框架
 *
 * -- 通用业务组件
 * ---- jas-file-list 附件展示列表
 * ---- jas-file-upload 附件上传表单项
 * ---- jas-file-upload-new 附件、图片上传表单项
 *
 *
 * @GF created on 2019/1/21
 */

/** 通用基础组件--begin ****************************************************************************************************************************************************************************************************************************************************************************************************/

// 模块分组标题
Vue.component('jas-base-module-title', {
	props: {
		name: {
			default: '模块分组标题',
			type: String
		},
	},
	data: function () {
		return {}
	},
	template: [
		'<div style="height:30px;padding:10px 0 0 10px;box-sizing: border-box;white-space:nowrap;">',
		'  <span style="border-left:3px solid #409EFF;padding:0 2px 0 0;display: inline-block;height: 12px;vertical-align: middle;"></span>',
		'  <span>{{name}}</span>',
		'</div>',
	].join(''),
});

// 表单分组标题
Vue.component('jas-base-group-title', {
	props: {
		name: {
			default: '表单分组',
			type: String
		},
	},
	template: [
		'<div style="margin:0px 0 6px;line-height:32px;padding-top:10px;border-bottom:1px solid #ecf5ff;">',
		'	<span style="padding:0px 4px 0px 4px;height: 22px;line-height:22px;display:inline-block;background: #ecf5ff;border-left: 2px solid rgb(64, 158, 255)">{{name}}</span>',
		'</div>'
	].join(''),
});

// frame弹出框
Vue.component('jas-iframe-dialog', {
	props: {
		refSelf: {
			default: 'jas-iframe-dialog',
			type: String
		},
		width: {
			default: '80%',
			type: String
		},
		height: {
			default: '80%',
			type: String
		},
		iframeUrl: {
			default: '',
			type: String
		},
		visible: {
			default: false,
			type: Boolean
		},
		title: {
			default: '提示',
			type: String
		}

	},
	data: function () {

		return {
			selfvisible: true,
		}
	},
	watch: {
		visible: function () {
			this.selfvisible = this.visible;
		},
		selfvisible: function (newValue) {
			this.$emit('update:visible', newValue);
		},
	},
	methods: {
		close: function () {
			// this.$emit('update:visible', false)
			this.$emit('close');
		},
		setDialogHeiht: function () {
			var dom = this.$el.querySelector('.el-dialog');
			if (this.height.indexOf('%') !== -1) {
				var height = this.height.split('%')[0];
				if (height <= 0 || height >= 100) return {};
				dom.style['margin-top'] = (100 - height) / 2 + 'vh';
				dom.style['height'] = height + 'vh';
			} else if (this.height.indexOf('px') !== -1) {
				var height02 = this.height.split('px')[0];
				var wrap_height = document.documentElement.clientHeight;
				if (height02 < wrap_height) {
					var toper = (wrap_height - height02) / 2;
					dom.style['margin-top'] = toper + 'px';
				}
				dom.style['height'] = this.height;
			}
		}
	},
	mounted: function () {
		this.setDialogHeiht();
	},
	template: [
		'<el-dialog :ref="refSelf" class="jas-iframe-dialog" :close-on-click-modal="false" :title="title" :visible.sync="selfvisible" :width="width" @close="close" :fullscreen="false">',
		'  <iframe class="dialog-iframe" :src="iframeUrl" frameborder="0"></iframe>',
		'</el-dialog>'
	].join(''),
});

// 弹出框内容框架
Vue.component('jas-dialog-wrapper', {
	props: {},
	data: function () {
		return {

		}
	},
	template: [
		'<div class="jas-flex-box is-vertical">',
		'  <div class="is-grown" style="padding: 0 20px;overflow: auto;">',
		'    <div><slot></slot></div>',
		'  </div>',
		'  <div style="text-align: center;padding-top:10px;margin: 0 20px;border-top: 1px solid #e4e7ed;">',
		'    <slot name="footer"></slot>',
		'  </div>',
		'</div>'
	].join(''),
});

// 多选下拉框
Vue.component('jas-base-el-multi-select', { //value 值 支持逗号分隔 的多选下拉框
	props: {
		value: {},
		options: {
			type: Array
		},
		item: {
			type: Object //{field,name}
		}
	},
	computed: {
		_value: {
			get: function () {
				return this.value ? this.value.split(',') : [];
			},
			set: function (newVal) {
				this.$emit('input', newVal.join(','));
			}
		}
	},
	template: [
		'<el-select multiple v-model="_value" clearable :placeholder="\'请选择\'+item.name" size="small" @visible-change="visibleChange($event,item.field)"  @change="fatherSelectChanged($event,item.field)">',
		'	<el-option v-for="option in options" :key="option.key" :label="option.value" :value="option.key"></el-option>',
		'</el-select>',
	].join(''),
	methods: {
		visibleChange: function ($event) {
			this.$emit('visible-change', $event);
		},
		fatherSelectChanged: function ($event) {
			this.$emit('change', $event);
		},
	}
});
// 多选下拉框
Vue.component('jas-base-el-multi-select-box', { //
	props: {
		value: {
			type: Array
		},
		valueKey: {
			default: 'value'
		},
		labelKey: {
			default: 'label'
		},
	},
	data: function () {
		return {
			selectOptns: []
		}
	},
	created: function () {
		console.log(this.valueKey)
	},
	computed: {
		_value: {
			get: function () {
				var that = this;
				return this.value ? this.value.map(function (item) {
					return item[that.valueKey];
				}) : [];
			},
			set: function (newVal) {
				var that = this;
				this.$emit('input', this.value.filter(function (item) {
					return newVal.indexOf(item[that.valueKey]) > -1;
				}));
			}
		}
	},
	template: [
		'<div>',
		'	<el-select size="small" style="width:100%;" :value-key="valueKey" v-model="_value" @click.native="clickselect" multiple placeholder="请选择">',
		'		<el-option v-for="item in value" :key="item[valueKey]" :label="item[labelKey]" :value="item[valueKey]">',
		'		</el-option>',
		'	</el-select>',
		'</div>',
	].join(''),
	methods: {
		clickselect: function (e) {
			var that = this;
			this.$emit('click')
			setTimeout(function () {
				that.$children[0].$refs.popper.$el.style.display = 'none';
			}, 0)
		},
	}
});

//多选下拉树
Vue.component('jas-base-el-cascader', { //value 值 支持逗号分隔 的多选下拉框
	props: {
		value: {},
		options: {
			type: Array,
			default: function () {
				return []
			}
		},
		item: {
			type: Object //{field,name}
		},
		props: {

		}
	},
	computed: {
		_value: {
			get: function () {
				if (!this.options || !this.value || !this.options.length) return [];
				return jasTools.base.getIdArrFromTree(this.options, this.value);
			},
			set: function (newValue) {
				this.$emit('input', newValue[newValue.length - 1]);
			}
		}
	},
	template: [
		'<el-cascader :options="options" :props="props" v-model="_value" :show-all-levels="false" @visible-change="visibleChange($event,item.field)"',
		'	change-on-select clearable :placeholder="\'请选择\'+item.name"  size="small">',
		'</el-cascader>',
	].join(''),
	methods: {
		visibleChange: function ($event) {
			this.$emit('visible-change', $event);
		},
	}
});

// 详情表格
Vue.component('jas-detail-table', {
	props: {
		titles: {
			type: Array,
			required: true
		},
		detail: {

		}
	},
	data: function () {
		return {
			columnNum: 2,
		}
	},
	computed: {
		formatTitle: function () {
			var that = this;
			var newTitle = [];
			if (!this.detail) return [];
			this.titles.forEach(function (item, index, arr) {
				if (index % that.columnNum === 0) {
					var _arr = [];
					for (var i = 0; i < that.columnNum; i++) {
						if (arr[index + i] !== undefined) {
							_arr.push(arr[index + i]);
						}
					}
					newTitle.push(_arr)
				}
			});
			if (this.titles.length === 1) {
				this.columnNum = 1;
			}
			return newTitle;
		}
	},
	template: [
		'<div v-show="detail" class="jas-detail-table">',
		'<table class="table_wrap">',
		'    <template v-for="item in formatTitle">',
		'        <tr>',
		'            <template v-for="subitem in item">',
		'                <th>{{subitem.name}}</th>',
		'                <td :ref="subitem.field" v-html="formatValue(detail[subitem.field],subitem.formatter)"></td>',
		'            </template>',
		'        </tr>',
		'    </template>',
		'</table>',
		'</div>'
	].join(''),
	methods: {
		formatValue: function (value, formatter) {
			if (formatter) {
				return formatter('', '', value, '');
			}
			return value;
		},
		resizeColumn: function () {
			var that = this;

			var width = that.$el.clientWidth;
			if (width < 660) {
				that.columnNum = 1;
			} else if (width < 1400) {
				that.columnNum = 2;
			} else {
				that.columnNum = 3;
			}
		}
	},
	mounted: function () {
		var that = this;
		this.resizeColumn();
		$(window).on('resize', function () {
			that.resizeColumn();

		});
	},
});

// 搜索和表格框架
Vue.component('jas-list-wrapper', {
	props: {
		ifSearch: {
			default: true
		},
	},
	data: function () {
		return {
			isClosed: false,
		}
	},
	computed: {
		searchStyle: function () {
			if (this.isClosed) {
				return {
					height: '0',
					borderBottom: 'none'
				}
			}
			return {
				height: 'auto',
				borderBottom: '1px solid #e4e7ed'
			}
		}
	},
	template: [
		'<div style="padding:  0 15px 15px;box-sizing: border-box;height: 100%;" class="jas-flex-box is-vertical">',
		'	<div ref="searchWrapper" class="searchWrapper" :style="[searchStyle]" style="overflow:hidden;box-sizing:border-box;">',
		'      <div class="subSearchWrapper" style="padding:15px 0 10px;"><slot name="search"></slot></div>',
		'	</div>',
		'	<div class="jas-flex-box is-vertical is-grown">',
		'      <slot name="list"></slot>',
		'	</div>',
		'</div>',
	].join(''),
	created: function () {
		var that = this;
		this.isClosed = !this.ifSearch;
	},
	methods: {

		toggleSearch: function () {

			this.isClosed = !this.isClosed;

			// if (this.$refs.searchWrapper.clientHeight < 10) {
			// 	this.isClosed = false;
			// 	this.$refs.searchWrapper.style.height = 'auto';
			// 	this.$refs.searchWrapper.style.borderBottom = '1px solid #e4e7ed';
			// } else {
			// 	this.isClosed = true;
			// 	this.$refs.searchWrapper.style.borderBottom = 'none';
			// 	this.$refs.searchWrapper.style.height = 0;
			// }
		}
	}
});

// 两栏分割框架
Vue.component('jas-two-panel-resizer', {
	props: {
		layout: { // horizontal
			type: String,
		},
		length: {
			type: String,
		},
		showed: {
			default: true,
			type: Boolean,
		},
	},
	data: function () {
		return {
			panelMoving: false,
			panelShowed: true,
			mainPanelStyle: {},
			closeClass: '',
			openClass: '',
			_length: '',
		}
	},
	computed: {
		closePanelStyle: function () {
			if (this.layout === 'horizontal') {
				return {
					height: this.panelShowed ? this._length : '0%',
					minHeight: '0%',
					maxHeight: '100%',
					overflow: 'auto'
				}
			} else {
				return {
					width: this.panelShowed ? this._length : '0%',
					minWidth: '0%',
					maxWidth: '100%',
					overflow: 'auto'
				}
			}
		},

	},
	watch: {
		panelShowed: function (val) {
			this.$emit('statuschanged', val);
		},
		layout: function () {
			this.setPanelStyle();
		}
	},
	created: function () {
		this._length = this.length;
		this.panelShowed = this.showed;
	},
	mounted: function () {
		this.setPanelStyle();
	},
	template: [
		'<multipane @paneresizestart="panelMoving = true" @paneresize="paneresize" @paneresizestop="paneresizestop" class="foo" :layout="layout">',
		'	<div v-loading="panelMoving" class="resizepanel" :style="closePanelStyle" element-loading-spinner="11" element-loading-background="rgba(0, 0, 0, 0)">',
		'		<slot name="closePanel"></slot>',
		'	</div>',
		'	<multipane-resizer>',
		'		<div class="resizertap" @click="panelShowed=!panelShowed">',
		'			<i v-show="panelShowed" :class="closeClass"></i>',
		'			<i v-show="!panelShowed" :class="openClass"></i>',
		'		</div>',
		'	</multipane-resizer>',
		'	<div v-loading="panelMoving" :style="[{ flexGrow: 1},mainPanelStyle]" element-loading-spinner="11" element-loading-background="rgba(0, 0, 0, 0)">',
		'		<slot name="mainPanel"></slot>',
		'	</div>',
		'</multipane>'
	].join(''),
	methods: {
		paneresize: function () {
			this.$emit('paneresize');
		},
		paneresizestop: function (pane, resizer, size) {
			this.panelMoving = false;
			this._length = size;
		},
		setPanelStyle: function () {
			if (this.layout === 'horizontal') {
				this.mainPanelStyle = {
					overflow:'auto',
					height: 0
				};
				this.closeClass = 'fa fa-angle-up';
				this.openClass = 'fa fa-angle-down';
			} else {
				this.mainPanelStyle = {
					overflow:'auto',
					width: 0
				};
				this.closeClass = 'fa fa-angle-left';
				this.openClass = 'fa fa-angle-right';
			}
		},
	},

});

/** 通用基础组件--end ****************************************************************************************************************************************************************************************************************************************************************************************************/


/** 通用业务组件--begin ****************************************************************************************************************************************************************************************************************************************************************************************************/

Vue.component('jas-file-list', {
	props: {
		bizId: {
			type: String,
			required: true
		},
	},
	data: function () {
		return {
			fileList: [],
			isrequest: true,
		}
	},
	watch: {
		bizId: function () {
			if (this.bizId) {
				this._requestFiles(this.bizId);
			}
		}
	},
	template: [
		'<div class="jas-file-list" v-show="!isrequest">',
		' <div v-show="fileList.length === 0" >无</div>',
		'	<div v-for="file in fileList"  class="el-upload-list__item">',
		'		<a class="el-upload-list__item-name">',
		'			<i class="el-icon-document"></i>{{file.fileName}}',
		'		</a>',
		'		<i class="el-icon-download tipBtn" @click="download(file.oid)" style="right:10px;"></i>',
		'		<i class="el-icon-view tipBtn" @click="preview(file.oid)" style="right:35px;"></i>',
		'	</div>',
		'</div>'
	].join(''),
	created: function () {
		if (this.bizId) {
			this._requestFiles(this.bizId);
		}
	},
	methods: {
		download: function (oid) {
			var that = this;
			jasTools.ajax.downloadByIframe('post', jasTools.base.rootPath + "/attachment/download.do", {
				oid: oid
			});
		},
		_requestFiles: function (oid) {
			var that = this;
			var url = jasTools.base.rootPath + "/attachment/getInfo.do";
			jasTools.ajax.get(url, {
				businessType: 'file',
				businessId: oid
			}, function (data) {
				that.fileList = data.rows;
				that.isrequest = false;
			});
		},
		preview: function (oid) {
			var that = this;
			top.jasTools.dialog.show({
				width: '80%',
				height: '90%',
				title: '预览模板',
				src: jasTools.base.rootPath + '/jasmvvm/pages/module-pdf-viewer/web/viewer.html?oid=' + oid,
			});
		},

	},

});

Vue.component('jas-file-list-new', {
	props: {
		bizId: {
			type: String,
			required: true
		},
		bizType: {
			type: String,
		},
		filePreview: {
			type: Function
		},
		picPreview: {
			type: Function
		},
	},
	data: function () {
		return {
			fileList: [],
			isrequest: true,
		}
	},
	watch: {
		bizId: function () {
			if (this.bizId) {
				this._requestFiles(this.bizId);
			}
		}
	},
	template: [
		'<div>',
		'  <div v-show="fileList.length == 0">暂无附件</div>',
		'<div v-show="fileList.length > 0" style="text-align:right;"><el-button type="text" size="small" @click="downloadAll">下载全部附件</el-button></div>',
		'<ul v-if="fileList.length" class="el-upload-list el-upload-list--text" style="border-top: 1px solid #f1f1f1;">',
		'  <li v-for="item in fileList" tabindex="0" class="el-upload-list__item" style="border-radius:0;margin-top:0px;padding: 12px;border-bottom: 1px solid #f1f1f1;">',
		'    <a class="el-upload-list__item-name"',
		'      style="width: 30%; display: inline-block; margin-right: 0px; vertical-align: top;">',
		'      <i class="el-icon-document"></i>{{item.name}}',
		'    </a>',
		'    <span style="display: inline-block;width: 20%;text-align:center;vertical-align: top;">',
		'      {{Math.ceil(item.size / 1024) + "kb" }}',
		'    </span>',
		'    <span style="display: inline-block;width: 30%;line-height: 1.2;">{{item.fileDescription}}</span>',
		'    <span style="width: 62px; text-align: right; float: right; margin-right: 4px;">',
		'      <i class="el-icon-view" @click="preview(item)" style="font-size: 16px;cursor: pointer;padding:0 4px;"></i>',
		'      <i class="el-icon-download" @click="download(item.oid)" style="font-size: 16px;cursor: pointer;padding:0 4px;"></i>',
		'    </span>',
		'  </li>',
		'</ul>',
		'</div>'
	].join(''),
	created: function () {
		if (this.bizId) {
			this._requestFiles(this.bizId);
		}
	},
	methods: {
		download: function (oid) {
			var that = this;
			jasTools.ajax.downloadByIframe('post', jasTools.base.rootPath + "/attachment/download.do", {
				oid: oid
			});
		},
		downloadAll: function () {
			var that = this;
			var src = jasTools.base.rootPath + "/attachment/downLoadMultiFile.do";
			var fSrc = jasTools.base.setParamsToUrl(src, {
				businessId: this.bizId,
				fileType: 'file',
				zipFileName: '123'
			});
			// console.log(fSrc)
			jasTools.ajax.downloadByIframe('get', fSrc, {
				businessId: this.bizId,
				fileType: 'file',
				zipFileName: '附件',
				token: localStorage.getItem('token')
			});
		},
		_requestFiles: function (oid) {
			var that = this;
			var url = jasTools.base.rootPath + "/attachment/getInfo.do";
			jasTools.ajax.get(url, {
				fileType: 'file',
				businessType: this.bizType,
				businessId: oid
			}, function (data) {
				data.rows.forEach(function (item) {
					var file = {
						name: item.fileName,
						size: item.size,
						oid: item.oid,
						size: item.fileSize,
						fileDescription: item.fileDescription,

					};

					var aName = item.fileName.split('.');
					var sType = aName[aName.length - 1];
					if (['bmp', 'tif', 'jpg', 'png', 'gif'].indexOf(sType) > -1) {
						// if (that.fileType == 'pic') {
						var url = jasTools.base.rootPath + "/attachment/getImageBySize.do";
						file.url = jasTools.base.setParamsToUrl(url, {
							token: localStorage.getItem('token'),
							eventid: file.oid
						})
						// }
					}
					that.fileList.push(file);
				});
				that.fileListlength = that.fileList.length;
			});

		},
		preview: function (file) {
			var that = this;
			var oid = file.oid;
			if (file.url) {
				that.previewPic(file);
				return;
			}
			if (this.filePreview) {
				this.filePreview(oid);
			} else {
				top.jasTools.dialog.show({
					width: '80%',
					height: '90%',
					title: '预览模板',
					src: jasTools.base.rootPath + '/jasmvvm/pages/module-pdf-viewer/web/viewer.html?oid=' + oid,
				});
			}
		},
		previewPic: function (file) {
			if (file.url) {
				if (this.picPreview) {
					this.picPreview(file.url);
				} else {
					top.jasTools.base.viewImg(file.url);
				}
			}
		},

	},

});

Vue.component('jas-pic-list', {
	props: {
		bizId: {
			type: String,
			required: true
		},
		bizType: {
			type: String,
		},
		filePreview: {
			type: Function
		},
		picPreview: {
			type: Function
		},
	},
	data: function () {
		return {
			fileList: [],
			fileType: 'pic',
			isrequest: true,
		}
	},
	watch: {
		bizId: function () {
			if (this.bizId) {
				this._requestFiles(this.bizId);
			}
		}
	},
	template: [
		'<div style="padding-bottom: 10px;">',
		'  <div v-show="fileList.length == 0">暂无图片</div>',
		'  <ul class="el-upload-list el-upload-list--picture-card">',
		'    <li tabindex="0" class="el-upload-list__item" v-for="item in fileList" :key="item.oid">',
		'      <img :src="item.url" alt="" class="el-upload-list__item-thumbnail">',
		'      <div style="color: #fff;background: rgba(0,0,0,0.3);overflow: hidden;text-overflow: ellipsis;width:146px;height: 28px;line-height: 28px;box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0px 10px;">',
		'      	{{item.name}}',
		'      </div>',
		'      <span class="el-upload-list__item-actions">',
		'        <span class="el-upload-list__item-preview" @click="preview(item)"><i class="el-icon-zoom-in"></i></span>',
		'        <span class="el-upload-selfbtn" @click="download(item.oid)"><i class="el-icon-download"></i></span>',
		'      </span>',
		'    </li>',
		'  </ul>',
		'</div>',
	].join(''),
	created: function () {
		if (this.bizId) {
			this._requestFiles(this.bizId);
		}
	},
	methods: {
		preview: function (file) {
			if (file.url) {
				if (this.picPreview) {
					this.picPreview(file.url);
				} else {
					top.jasTools.base.viewImg(file.url);
				}
			}
		},
		download: function (oid) {
			var that = this;
			jasTools.ajax.downloadByIframe('post', jasTools.base.rootPath + "/attachment/download.do", {
				oid: oid
			});
		},
		_requestFiles: function (bizId) {
			var that = this;
			var url = jasTools.base.rootPath + "/attachment/getInfo.do";
			jasTools.ajax.get(url, {
				fileType: that.fileType,
				businessType: this.bizType, //'file'
				businessId: bizId
			}, function (data) {
				var list = data.rows.map(function (item) {
					var file = {
						name: item.fileName,
						size: item.size,
						oid: item.oid,
						size: item.fileSize,
						fileDescription: item.fileDescription,

					};
					if (that.fileType == 'pic') {
						var url = jasTools.base.rootPath + "/attachment/getImageBySize.do";
						file.url = jasTools.base.setParamsToUrl(url, {
							token: localStorage.getItem('token'),
							eventid: file.oid
						})
					}
					// that.fileList.push(file);
					return file
				});

				that.fileList = list;
				that.fileListlength = that.fileList.length;
			});
		},
	},

});

Vue.component('jas-file-upload', {
	props: {
		limit: {
			default: 5,
			type: Number
		},
		fileTypes: {
			default: function () {
				return []
			},
			type: Array
		}
	},
	data: function () {
		return {
			fileList: [],
			uploadurl: '',
		}
	},
	computed: {
		accept: function () {
			return this.fileTypes.length > 0 ? '.' + this.fileTypes.join(',.') : '';
		}
	},
	template: [
		'<el-upload ref="upload" :accept="accept" :limit="limit" :auto-upload="false" :file-list="fileList" ',
		':on-change="changeFiles" :on-success="fileUploaded" :on-remove="removeFile" ',
		':on-exceed="uploaodNumberlimit" :action="uploadurl" style="padding-bottom:10px;">',
		'	<el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>',
		'	<span style="padding-left: 10px;" class="el-upload__tip" slot="tip">{{"最多上传"+ limit +"个附件"}}</span>',
		'</el-upload>',
	].join(''),
	methods: {
		requestFile: function (bizId) {
			var that = this;
			var url = jasTools.base.rootPath + "/attachment/getInfo.do";
			jasTools.ajax.get(url, {
				businessType: 'file',
				businessId: bizId
			}, function (data) {
				data.rows.forEach(function (item) {
					var file = {
						name: item.fileName,
						size: item.size,
						oid: item.oid
					};
					that.fileList.push(file);
				});
				that.fileListlength = that.fileList.length;
			});
		},
		fileUploaded: function (response, file, fileList) {
			var that = this;
			that.indexOfFileToSubmit++;
			if (that.indexOfFileToSubmit >= that.lengthOfFileToSubmit) {
				this.$emit('success', response, file, fileList)
			}
		},
		removeFile: function (file, fileList) {
			if (file.status === 'success' && file.oid) {
				if (this.filesToBeDelete) {
					this.filesToBeDelete.push(file.oid);
				} else {
					this.filesToBeDelete = [file.oid];
				}
			}
		},
		uploadFile: function (oid) {
			var that = this;
			that._deleteFilesToServer(function () {
				that.uploadurl = jasTools.base.rootPath + "/attachment/upload.do?token=" + localStorage.getItem("token") +
					"&businessId=" + oid + "&businessType=file";
				that.$nextTick(function () {
					var afileToSubmit = that.$refs.upload.uploadFiles.filter(function (item) {
						return !item.oid
					});
					that.lengthOfFileToSubmit = afileToSubmit.length;
					that.indexOfFileToSubmit = 0;
					if (afileToSubmit.length > 0) {
						that.$refs.upload.submit();
					} else {
						that.fileUploaded();
					}
				});
			});
		},
		_deleteFilesToServer: function (cb) {
			var that = this;
			if (!that.filesToBeDelete) {
				cb && cb();
				return;
			}
			jasTools.ajax.get(jasTools.base.rootPath + "/attachment/delete.do", {
				oids: that.filesToBeDelete.join(',')
			}, function (data) {
				cb && cb();
			});
		},
		changeFiles: function (file, fileList) {
			var that = this;
			if (file.status === "ready") {
				var aFileName = file.name.split('.');
				var fileTypes = this.fileTypes;
				var type = aFileName[aFileName.length - 1 || 1];
				if (!type || (fileTypes.length > 0 && fileTypes.indexOf(type) === -1)) { // 不是规定格式的文件
					top.Vue.prototype.$message('请上传规定格式的文件');
					var index = fileList.indexOf(file);
					fileList.splice(index, 1);
				}
			}
		},
		uploaodNumberlimit: function () {
			top.Vue.prototype.$message("最多上传" + this.limit + "个附件")
		},
	}

});

Vue.component('jas-file-upload-new', {
	props: {
		businessId: {
			type: String
		},
		filePreview: {
			type: Function
		},
		picPreview: {
			type: Function
		},
		businessType: {
			type: String
		},
		fileType: {
			default: 'file', // pic
			type: String
		},
		maxCount: {
			default: 20,
			type: Number
		},
		maxSize: { //mb
			default: 500,
			type: Number
		},
		maxTotalSize: { //mb
			default: 1000,
			type: Number
		},
		// formData: {},
		fileTypes: {
			default: function () {
				return []
			},
			type: Array
		}
	},
	data: function () {
		return {
			fileList: [],
			uploadurl: '',
			formData: {
				fileDescription: ''

			},
		}
	},
	computed: {
		accept: function () {
			if (this.fileType == 'pic') {
				return '.' + ['bmp', 'tif', 'jpg', 'png', 'gif'].join(',.');
			}
			return this.fileTypes.length > 0 ? '.' + this.fileTypes.join(',.') : '';
		},
		listType: function () {
			return this.fileType == 'pic' ? 'picture-card' : 'text';

		}
	},
	template: [
		'<el-upload  ref="upload" multiple :accept="accept" :data="formData" :limit="maxCount" :auto-upload="false" :file-list="fileList" ',
		':on-change="changeFiles" :before-upload="beforeUpload" :on-success="fileUploaded" :on-error="uploadFailed" :on-remove="removeFile" :on-preview="handlePreview"',
		':on-exceed="uploaodNumberlimit" :action="uploadurl" :list-type="listType" style="padding-bottom:10px;">',
		'<span>',
		'	<i v-if="fileType ==\'pic\'" class="el-icon-plus"></i>',
		'	<el-button v-else size="small" type="primary" plain>选取文件</el-button>',
		'</span>',
		'	<span v-if="fileType !==\'pic\'" style="padding-left: 10px;" class="el-upload__tip" slot="tip">{{"限制文件数量"+ maxCount +"个、单文件大小"+ maxSize +"MB"}}</span>',
		'</el-upload>',
	].join(''),
	created: function () {
		if (this.businessId) {
			this.requestFile(this.businessId, this.businessType);
		}

	},
	methods: {
		insertIcon: function (file) {
			var that = this;
			this.$nextTick(function () {

				$(that.$refs.upload.$el).find('.el-upload-list__item-actions').each(function (i) {
					if ($(this).find('.el-upload-selfbtn').length || file) return;
					var $dom = $('<span class="el-upload-selfbtn"><i class="el-icon-download"></i></span>');
					$dom.on('click', function () {
						var oPic = that.$refs.upload.uploadFiles[i];
						var url = jasTools.base.rootPath + "/attachment/download.do";
						url = jasTools.base.setParamsToUrl(url, {
							token: localStorage.getItem('token'),
							oid: oPic.oid
						})
						$('<a href="' + url + '" / >')[0].click();
					});
					$(this).append($dom);
				});

				$(that.$refs.upload.$el).find('li').each(function (i) {
					var oPic = that.$refs.upload.uploadFiles[i];
					if ($(this).find('img').length) { // 图片
						if ($(this).find('.picName').length) return;
						var $dom = $('<div class="picName" style="color: #fff;background: rgba(0,0,0,0.3);overflow: hidden;text-overflow: ellipsis;width:146px;height: 28px;line-height: 28px;box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0px 10px;">' + oPic.name + '</div>');
						// $dom.val(oPic.name)
						// $dom.on('keydown', function (e) {
						// 	if (e.keyCode == 8) {
						// 		e.stopPropagation && e.stopPropagation();
						// 	}
						// })
						$(this).append($dom);
					} else { // 文件
						if ($(this).find('input').length) return;
						// input
						var size = Math.ceil(oPic.size / 1024) + ' kb';
						var $size = $('<span style="display: inline-block;width: 20%;text-align:center;">' + size + '</span>');
						var $input = $('<input id="' + (oPic.oid || oPic.uid) + '" data-oldval="' + (oPic.fileDescription || '') + '" class="el-input__inner" placeholder="请输入备注" style="width: 30%;height: 28px;line-height: 28px;"></input>');
						$input.on('keydown', function (e) {
							if (e.keyCode == 8) {
								e.stopPropagation && e.stopPropagation();
							}
						}).val(oPic.fileDescription);
						$(this).css({
							padding: '4px'
						})
						$(this).find('.el-upload-list__item-name').css({
							width: '30%',
							display: 'inline-block',
							'margin-right': '0px',
							'vertical-align': 'middle'
						});
						$(this).find('.el-icon-close').css({
							top: '8px'
						});
						$(this).find('.el-upload-list__item-name').after($size);
						$size.after($input);


						//btns
						if (!file) {
							var $dnld = $('<i class="el-icon-download" style="font-size: 16px;cursor: pointer;padding:0 4px;"></i>');
							var $see = $('<i class="el-icon-view" style="font-size: 16px;cursor: pointer;padding:0 4px;"></i>');
							var $btnwrap = $('<span style="display: none;width: 15%;text-align:right;float:right;margin-right:18px;"></span>');
							$btnwrap.append($see).append($dnld);
							$(this).hover(function () {
								$btnwrap.css({
									display: 'inline-block'
								});
							}, function () {
								$btnwrap.css({
									display: 'none'
								});

							});
							$dnld.on('click', function () {
								that.download(oPic.oid)
							});
							$see.on('click', function () {
								// console.log(oPic)
								// return
								if (oPic.url) {
									that.handlePreview(oPic)
								} else {
									that.preview(oPic.oid)
								}
							});
							$input.after($btnwrap);
						}
					}


				});


			});
		},
		updateInfo: function (cb) {
			var that = this;
			var aInfo = that.$refs.upload.uploadFiles.filter(function (item) {
				if (!item.oid) return false;
				var $input = $('#' + item.oid);
				if ($input.length == 0) return false;
				item.newDesc = $input.val();
				if ($input.val() != $input[0].dataset.oldval) return true;
			});
			var nDown = 0;
			var fnDone = function (nDown, nAll) {
				if (nDown == nAll) {
					cb && cb();
				}
			};
			fnDone(nDown, aInfo.length)
			aInfo.forEach(function (item, index, arr) {
				jasTools.ajax.post(jasTools.base.rootPath + "/attachment/updateInfo.do", {
					oid: item.oid,
					fileDescription: item.newDesc,
				}, function () {
					fnDone(++nDown, aInfo.length)
				}, function () {
					that.$emit('fail', {
						errorCode: 2,
						msg: '文件备注更新失败'
					});
				});
			});
		},
		preview: function (oid) {
			var that = this;
			if (this.filePreview) {
				this.filePreview(oid);
			} else {
				top.jasTools.dialog.show({
					width: '80%',
					height: '90%',
					title: '预览模板',
					src: jasTools.base.rootPath + '/jasmvvm/pages/module-pdf-viewer/web/viewer.html?oid=' + oid,
				});
			}
		},
		download: function (oid) {
			var that = this;
			jasTools.ajax.downloadByIframe('post', jasTools.base.rootPath + "/attachment/download.do", {
				oid: oid
			});
		},
		beforeUpload: function (file) {
			var desc = $('#' + file.uid).val();
			this.formData.fileDescription = desc;
			// file.fileDescription = 'asdasd'
		},
		handlePreview: function (file) {
			if (file.url) {
				if (this.picPreview) {
					this.picPreview(file.url);
				} else {
					top.jasTools.base.viewImg(file.url);
				}
			}
		},
		requestFile: function (bizId, businessType) {
			var that = this;
			var url = jasTools.base.rootPath + "/attachment/getInfo.do";
			jasTools.ajax.get(url, {
				fileType: that.fileType,
				businessType: businessType || this.businessType, 
				businessId: bizId || this.businessId
			}, function (data) {
				data.rows.forEach(function (item) {
					var file = {
						name: item.fileName,
						size: item.size,
						oid: item.oid,
						size: item.fileSize,
						fileDescription: item.fileDescription,

					};
					var aName = item.fileName.split('.');
					var sType = aName[aName.length - 1];
					if (['bmp', 'tif', 'jpg', 'png', 'gif'].indexOf(sType) > -1) {
						// if (that.fileType == 'pic') {
						var url = jasTools.base.rootPath + "/attachment/getImageBySize.do";
						file.url = jasTools.base.setParamsToUrl(url, {
							token: localStorage.getItem('token'),
							eventid: file.oid
						})
						// }
					}
					that.fileList.push(file);
				});
				that.fileListlength = that.fileList.length;
				that.insertIcon();
			});
		},
		fileUploaded: function (response, file, fileList) {
			var that = this;
			that.indexOfFileToSubmit++;
			if (that.indexOfFileToSubmit >= that.lengthOfFileToSubmit) {
				that.$emit('success', response, file, fileList)
				return;
			}
			if ((that.failCount + that.indexOfFileToSubmit) >= that.lengthOfFileToSubmit) {
				that.$emit('fail', {
					errorCode: 3,
					msg: that.failCount + '个文件上传失败',
					failList: that.failList
				});
			}
		},
		uploadFailed: function (err, file, fileList) {
			var that = this;
			that.failCount++;
			that.failList.push(file);
			if ((that.failCount + that.indexOfFileToSubmit) >= that.lengthOfFileToSubmit) {
				that.$emit('fail', {
					errorCode: 3,
					msg: that.failCount + '个文件上传失败',
					failList: that.failList
				});
			}
		},
		removeFile: function (file, fileList) {
			if (file.status === 'success' && file.oid) {
				if (this.filesToBeDelete) {
					this.filesToBeDelete.push(file.oid);
				} else {
					this.filesToBeDelete = [file.oid];
				}
			}
		},
		uploadFile: function (oid, bizType) {
			var that = this;
			that._deleteFilesToServer(function () {
				that.updateInfo(function () {
					var src = jasTools.base.rootPath + "/attachment/upload.do";
					that.uploadurl = jasTools.base.setParamsToUrl(src, {
						token: localStorage.getItem("token"),
						businessId: that.businessId || oid,
						businessType: that.businessType || bizType,
						fileType: that.fileType
					});
					that.$nextTick(function () {
						var afileToSubmit = that.$refs.upload.uploadFiles.filter(function (item) {
							return !item.oid
						});
						that.lengthOfFileToSubmit = afileToSubmit.length;
						that.indexOfFileToSubmit = 0;
						that.failList = [];
						that.failCount = 0;
						if (afileToSubmit.length > 0) {
							that.$refs.upload.submit();
						} else {
							that.fileUploaded();
						}
					});
				});
			});
		},
		_deleteFilesToServer: function (cb) {
			var that = this;
			if (!that.filesToBeDelete) {
				cb && cb();
				return;
			}
			jasTools.ajax.get(jasTools.base.rootPath + "/attachment/delete.do", {
				oids: that.filesToBeDelete.join(',')
			}, function (data) {
				cb && cb();
			}, function () {
				alert(111)
				that.$emit('fail', {
					errorCode: 1,
					msg: '删除文件失败'
				});
			});
		},
		changeFiles: function (file, fileList) {
			var that = this;
			if (file.status === "ready") {
				// 判断单个文件大小
				if (file.size > that.maxSize * 1024 * 1024) {
					var index = fileList.indexOf(file);
					fileList.splice(index, 1);
					setTimeout(function () {
						top.Vue.prototype.$message.error('文件大小不得超过' + that.maxSize + 'MB');
					})
					return;
				}

				// 判断待上传文件总大小	
				var total = 0;
				fileList.filter(function (item) {
					if (item.status === "ready") {
						total += item.size
					}
				});
				if (total > that.maxTotalSize * 1024 * 1024) {
					var index = fileList.indexOf(file);
					fileList.splice(index, 1);
					setTimeout(function () {
						top.Vue.prototype.$message.error('待上传文件大小不得超过' + that.maxTotalSize + 'MB');
					})
					return;
				}

				this.insertIcon(file);
				var aFileName = file.name.split('.');
				var fileTypes = this.fileTypes;
				var type = aFileName[aFileName.length - 1 || 1];
				if (!type || (fileTypes.length > 0 && fileTypes.indexOf(type) === -1)) { // 不是规定格式的文件
					top.Vue.prototype.$message('请上传规定格式的文件');
					var index = fileList.indexOf(file);
					fileList.splice(index, 1);
				}
			}
		},
		uploaodNumberlimit: function () {
			top.Vue.prototype.$message("最多上传" + this.maxCount + "个附件")
		},
	}
});

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

Vue.component('jas-table-for-list', {
	props: {
		dialogconfig: {
			default: function () {
				return {}
			}
		},
		privilegeCode: {
			type: [String, Array],
		},
		propconfig: {
			default: function () {
				return {}
			}
		},
		rowBtns: {
			type: Array, // [locate]
			default: function () {
				return []
			}
		},
		btncolwidth: {},
		form: {
			type: Object,
			required: true
		},
		fields: {
			type: Array,
			required: true
		},
		searchPath: {
			type: String,
			required: true
		},
		upcallPath: {
			type: String,
		},
		isSearchBtn: { //是否带有搜索的 收缩按钮 
			default: true,
		},
		isHideBtnCol: { //是否带有搜索的 收缩按钮 
			default: false,
		},
		deletePath: {
			type: String,
			// required: true
		},
		detailUrl: {},
		addUrl: {},
		editUrl: {},
		templateCode: {},
		exportTemplateCode: {},
		className: {},
		importConfig: {},
		searchType: {
			default: 'post' //可以是get,post和postForm
		}
	},
	data: function () {
		return {
			prop: {
				oid: 'oid'
			},
			headStyle: {
				'background-color': '#f5f7fa ',
			},
			functionCode: '', //自定义配置表单需要
			_templateCode: '', //通用模板接口需要
			_exportTemplateCode: '', //通用模板接口需要
			_className: '', //通用权限接口需要
			_classNameQuery: '', //通用模板接口需要
			isApprove: '', //是否带有审核功能
			privilege: [], //权限数组 bt_add,bt_update,bt_delete,bt_select,bt_export,bt_import,bt_position
			tableData: [],
			currentPage: 1,
			loading: true,
			total: 0,
			pageSize: 10,
			oids: [],
			rows: [],
			fieldshowed: [],
			isClosed: false,
			_privilegeCode: '',
		}
	},
	computed: {
		reportRows: function () {
			var that = this;
			return this.rows.filter(function (row) {
				return !that.frozenBtn(row);
			});
		},
		approveRows: function () {
			var that = this;
			return this.rows.filter(function (row) {
				return (row.approve_status == '待审核' || row.approveStatus == 1);
			});
		},
	},
	template: [
		'<div  class="jas-flex-box is-vertical is-grown">',
		'<div style="padding: 15px 0;">',
		'	<el-button size="small" plain type="primary" icon="fa fa-plus" v-if="isHasPrivilege(' + "'bt_add'" + ')"  @click="add">增加</el-button>',
		'	<el-button size="small" plain type="primary" icon="fa fa-level-up" v-if="isApprove&&isHasPrivilege(' + "'bt_report'" + ')"  :disabled="reportRows.length==0" @click="upcall">上报</el-button>',
		'	<el-button size="small" plain type="primary" icon="fa fa-check" v-if="isApprove&&isHasPrivilege(' + "'bt_approve'" + ')" :disabled="approveRows.length==0" @click="approve">审核</el-button>',
		'   <slot name="btns"></slot>',
		'<jas-import-export-btns  @refreshtable="refresh" :is-import="isHasPrivilege(' + "'bt_import'" + ')" :is-export="isHasPrivilege(' + "'bt_export'" + ')" ',
		'		:form="form" :oids="oids" :import-config="importConfig" :template-code="_templateCode" :export-template-code="_exportTemplateCode" :function-code="functionCode" :class-name="_classNameQuery"></jas-import-export-btns>',

		'  <span class="fr">',
		'		<el-popover ref="popover4" placement="bottom" trigger="click">',
		'			<el-checkbox-group v-model="fieldshowed">',
		'				<div v-for="item in fields" :key="item.field" style="padding:2px 0;">',
		'					<el-checkbox  :label="item.name"></el-checkbox>',
		'				</div>',
		'			</el-checkbox-group>',
		'		</el-popover>',
		'		<el-tooltip class="item" content="字段显隐" placement="top">',
		'           <el-button size="small" icon="fa fa-cog" v-popover:popover4></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip class="item" content="刷新" placement="top">',
		'          <el-button size="small" icon="el-icon-refresh" @click="refresh"></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip v-show="isClosed" v-if="isSearchBtn" class="item" content="展开搜索" placement="top">',
		'	       <el-button size="small" icon="el-icon-arrow-down" @click="toggleSearch"></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip v-show="!isClosed" v-if="isSearchBtn" class="item" content="收起搜索" placement="top">',
		'	       <el-button size="small" icon="el-icon-arrow-up" @click="toggleSearch"></el-button>',
		'		</el-tooltip>',
		'  </span>',
		'</div>',
		'<div class="is-grown">',
		'	<el-table ref="mytable" @selection-change="handleSelectionChange" @sort-change="sortChange" @row-dblclick="preview" @row-click="checkRow" v-loading="loading" height="100%" :data="tableData" border :header-cell-style="headStyle" style="width: 100%" stripe>',
		'    <el-table-column type="selection" width="55" align="center" fixed></el-table-column>',
		'		<el-table-column label="序号" type="index" align="center" width="50" fixed>',
		'		</el-table-column>',
		'		<el-table-column v-for="item,index in fields" v-if="fieldshowed.indexOf(item.name)>-1" :sortable="item.sortable?\'custom \':false" :key="item.oid" :fixed="index=== 0?true:false" :label="item.name" :prop="item.field" :formatter="item.formatter" min-width="130px" :width="item.width" show-overflow-tooltip align="center">',
		'		</el-table-column>',
		'		<el-table-column label="操作" align="center" v-if="!isHideBtnCol" :width="btncolwidth" fixed="right">',
		'			<template slot-scope="scope">',
		'				<el-button @click.stop="locate(scope.row)"  v-if="isHasPrivilege(' + "'bt_position'" + ')" type="text" size="small">定位</el-button>',
		'				<el-button @click.stop="preview(scope.row)"  v-if="isHasPrivilege(' + "'bt_select'" + ')" type="text" size="small">查看</el-button>',
		'				<el-button @click.stop="edit(scope.row)"  :disabled="frozenBtn(scope.row)" v-if="isHasPrivilege(' + "'bt_update'" + ')"  type="text" size="small">编辑</el-button>',
		'				<el-button @click.stop="deleteItem(scope.row)" :disabled="frozenBtn(scope.row)" v-if="isHasPrivilege(' + "'bt_delete'" + ')"   type="text" size="small">删除</el-button>',
		'				<el-button v-for="item in rowBtns" @click.stop="clickRowBtns(scope.row,item)" type="text" size="small">{{item}}</el-button>',
		'			</template>',
		'		</el-table-column>',
		'	</el-table>',
		'</div>',
		'<div style="padding: 15px 0 0;" class="clearfix">',
		'	<el-pagination class="fr" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"',
		'		:page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">',
		'	</el-pagination>',
		'</div>',
		'</div>',
	].join(''),
	watch: {
		privilegeCode: function () {
			this._requestPrivilege(this._privilegeCode);
			// this.search();
		}
	},
	created: function () {
		var that = this
		var param = window.jasTools.base.getParamsInUrl(location.href);
		this.isApprove = param.isApprove;
		this._className = this.className || param.className;
		this._classNameQuery = this.classNameQuery || param.classNameQuery;
		this._templateCode = this.templateCode || param.templateCode;
		this._exportTemplateCode = this.exportTemplateCode || param.exportTemplateCode;
		this.functionCode = param.menuCode || param.functionCode;
		this._privilegeCode = this.privilegeCode || param.privilegeCode;
		this.fieldshowed = this.fields.filter(function (item) {
			return !item.tablehidden;
		}).map(function (item) {
			return item.name;
		});
		this.propconfig.oid && (this.prop.oid = this.propconfig.oid);
	},
	mounted: function () {

		this._requestPrivilege(this._privilegeCode);
		this.search();
	},
	methods: {
		clickRowBtns: function (row, btn) {
			this.$emit('clickrowbtn', row, btn)
		},
		toggleSearch: function () {
			this.$parent.toggleSearch();
			this.isClosed = this.$parent.isClosed;
		},
		frozenBtn: function (row) {
			if (row.approveStatus > 0) {
				return true;
			}
			return false;
		},
		upcall: function () {

			var that = this;
			var oids = this.reportRows.map(function (item) {
				return item[that.prop.oid];
			});
			if (oids.length === 0) return;
			var url = jasTools.base.rootPath + '/daq/dataApprove/save.do';
			jasTools.ajax.post(url, {
				businessOid: oids,
				approveStatus: 1, //status 2 通过 -1 驳回
				className: this._className,
				functionCode: this.functionCode,
			}, function (data) {
				top.Vue.prototype.$message({
					type: 'success',
					message: '上报成功'
				});
				that.refresh();
			});
		},
		approve: function () {
			var that = this;
			var oids = this.approveRows.map(function (item) {
				return item[that.prop.oid];
			});
			if (oids.length === 0) {
				return;
			} else if (oids.length === 1) {

				var src = jasTools.base.setParamsToUrl(this.detailUrl, {
					approveType: 2,
					className: this._className,
					menuCode: this.functionCode || '',
				});
				var url = jasTools.base.setParamsToUrl(src, this.approveRows[0]);
				top.jasTools.dialog.show({
					width: '60%',
					height: '80%',
					title: '审核',
					src: url,
					cbForClose: function (param) {
						if (param == 'success') {
							that.refresh();
						}
					}
				});
			} else {
				var src = jasTools.base.setParamsToUrl('./pages/template/dialogs/approveTemplate.html', {
					approveType: 2,
					className: this._className,
					menuCode: this.functionCode || '',
				});
				var url = jasTools.base.setParamsToUrl(src, {
					oids: oids.join(',')
				});
				top.jasTools.dialog.show({
					width: '600px',
					height: '400px',
					title: '批量审核',
					src: url,
					cbForClose: function (param) {
						if (param == 'success') {
							that.refresh();
						}
					}
				});
			}
		},
		handleSelectionChange: function (val) {
			var that = this;
			this.oids = val.map(function (item) {
				return item[that.prop.oid];
			});
			this.$emit('selectchanged', val);
			this.rows = val;
		},
		sortChange: function (param) {
			console.log(param)
			if (param.prop) {
				var type = param.order == 'descending' ? 'desc' : 'asc';
				this.form.orderBy = param.prop + ' ' + type;
			} else {
				this.form.orderBy = null;
			}
			this.search();
		},
		locate: function (item) {
			this.$emit('locate', item)
		},
		isHasPrivilege: function (sName) {
			//console.log(sName);
			if (this._privilegeCode && this.privilege.indexOf(sName) === -1) {
				return false;
			}
			return true;
		},
		_requestPrivilege: function (privilegeCode) {
			var that = this;
			if (!privilegeCode) return;
			if ((typeof privilegeCode) === 'string') {
				var url = jasTools.base.rootPath + "/jasframework/privilege/privilege/getFunctionConfig.do";
				jasTools.ajax.get(url, {
					privilegeCode: privilegeCode, //菜单权限编号
					appId: jasTools.base.getAppId() || "402894a152681ba30152681e8b320003" //应用id，值默认
				}, function (data) {
					that.privilege = data.rows.map(function (item) {
						return item.functionType;
					});
				});
			} else {
				that.privilege = privilegeCode;
			}
		},
		search: function () {
			this._requestTable();
		},
		refresh: function () {
			this.search();
		},
		add: function () {
			var that = this;
			if (!this.addUrl) return;
			top.jasTools.dialog.show({
				width: this.dialogconfig.addWidth || '60%',
				height: this.dialogconfig.addHeight || '80%',
				title: '增加',
				src: this.addUrl,
				cbForClose: function () {
					that.refresh()
				}
			});
		},
		checkRow: function (row) {
			this.$refs['mytable'].toggleRowSelection(row)
		},
		preview: function (row) {
			var that = this;
			if (!this.detailUrl) return;
			var url = this.detailUrl;
			if (this.isApprove) {
				url = jasTools.base.setParamsToUrl(this.detailUrl, {
					approveType: 1
				});
			}
			var paramObj = {
				oid: row[that.prop.oid]
			};
			url = jasTools.base.setParamsToUrl(url, paramObj);
			top.jasTools.dialog.show({
				width: this.dialogconfig.detailWidth || '60%',
				height: this.dialogconfig.detailHeight || '80%',
				title: '查看',
				src: url,
			});
		},
		_requestTable: function (str, cb) {
			var that = this;
			that.loading = true;
			var obj = jasTools.base.extend({}, {
				pageNo: this.currentPage,
				pageSize: this.pageSize,
			}, this.form);
			var url = jasTools.base.rootPath + this.searchPath;
			jasTools.ajax[this.searchType](url, obj, function (data) {
				if (that.isNotFirst) {
					setTimeout(function () {
						that.loading = false;
					}, 100);
				} else {
					that.loading = false;
					that.isNotFirst = true;
				}
				that.tableData = data.rows;
				that.total = data.total;
			});
		},
		edit: function (row) {
			var that = this;
			var url = jasTools.base.setParamsToUrl(this.addUrl, row)
			top.jasTools.dialog.show({
				width: this.dialogconfig.addWidth || '60%',
				height: this.dialogconfig.addHeight || '80%',
				title: '修改',
				src: url,
				cbForClose: function () {
					that.refresh()
				}
			});
		},
		deleteItem: function (row) {
			var that = this;
			window.top.Vue.prototype.$confirm('您确定要删除本条数据吗？', '提示', {
				type: 'warning',
				callback: function (action) {
					if (action === 'confirm') {
						that._deleteItem(row);
					}
				}
			});
		},
		_deleteItem: function (row) {
			var that = this;
			if (this.deletePath) {
				var url = jasTools.base.rootPath + this.deletePath;
				jasTools.ajax.post(url, {
					oid: row[that.prop.oid]
				}, function (data) {
					top.Vue.prototype.$message({
						type: 'success',
						message: '删除成功'
					});
					that.refresh();
				});
			} else {
				this.$emit('deleterow', row);
			}
		},
		handleSizeChange: function (val) {
			this.pageSize = val;
			this.search();
		},
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.search();
		}
	},

});

Vue.component('jas-table-for-list-new', {
	props: {
		dialogconfig: {
			default: function () {
				return {}
			}
		},
		privilegeCode: {
			type: [String, Array],
		},
		propconfig: {
			default: function () {
				return {}
			}
		},
		rowBtns: {
			type: Array, // [locate]
			default: function () {
				return []
			}
		},
		btncolwidth: {},
		form: {
			type: Object,
			required: true
		},
		fields: {
			type: Array,
			required: true
		},
		searchPath: {
			// type: String,
			required: true
		},
		upcallPath: {
			type: String,
		},
		isSearchBtn: { //是否带有搜索的 收缩按钮 
			default: true,
		},
		isHideBtnCol: { //是否带有搜索的 收缩按钮 
			default: false,
		},
		deletePath: {
			type: String,
			// required: true
		},
		detailUrl: {},
		addUrl: {},
		editUrl: {},
		templateCode: {},
		exportTemplateCode: {},
		className: {},
		importConfig: {},
		searchType: {
			default: 'post' //可以是get,post和postForm
		}
	},
	data: function () {
		return {
			prop: {
				oid: 'oid'
			},
			headStyle: {
				'background-color': '#f5f7fa ',
			},
			functionCode: '', //自定义配置表单需要
			_templateCode: '', //通用模板接口需要
			_exportTemplateCode: '', //通用模板接口需要
			_className: '', //通用权限接口需要
			_classNameQuery: '', //通用模板接口需要
			isApprove: '', //是否带有审核功能
			privilege: [], //权限数组 bt_add,bt_update,bt_delete,bt_select,bt_export,bt_import,bt_position
			tableData: [],
			currentPage: 1,
			loading: true,
			total: 0,
			pageSize: 10,
			oids: [],
			rows: [],
			fieldshowed: [],
			isClosed: false,
			_privilegeCode: '',
		}
	},
	computed: {
		reportRows: function () {
			var that = this;
			return this.rows.filter(function (row) {
				return !that.frozenBtn(row);
			});
		},
		approveRows: function () {
			var that = this;
			return this.rows.filter(function (row) {
				return (row.approve_status == '待审核' || row.approveStatus == 1);
			});
		},
	},
	template: [
		'<div  class="jas-flex-box is-vertical is-grown">',
		'<div style="padding: 15px 0;">',
		'	<el-button size="small" plain type="primary" icon="fa fa-plus" v-if="isHasPrivilege(' + "'bt_add'" + ')"  @click="add">增加</el-button>',
		'	<el-button size="small" plain type="primary" icon="fa fa-level-up" v-if="isApprove&&isHasPrivilege(' + "'bt_report'" + ')"  :disabled="reportRows.length==0" @click="upcall">上报</el-button>',
		'	<el-button size="small" plain type="primary" icon="fa fa-check" v-if="isApprove&&isHasPrivilege(' + "'bt_approve'" + ')" :disabled="approveRows.length==0" @click="approve">审核</el-button>',
		'   <slot name="btns"></slot>',
		'<jas-import-export-btns  @refreshtable="refresh" :is-import="isHasPrivilege(' + "'bt_import'" + ')" :is-export="isHasPrivilege(' + "'bt_export'" + ')" ',
		'		:form="form" :oids="oids" :import-config="importConfig" :template-code="_templateCode" :export-template-code="_exportTemplateCode" :function-code="functionCode" :class-name="_classNameQuery"></jas-import-export-btns>',

		'  <span class="fr">',
		'		<el-popover ref="popover4" placement="bottom" trigger="click">',
		'			<el-checkbox-group v-model="fieldshowed">',
		'				<div v-for="item in fields" :key="item.field" style="padding:2px 0;">',
		'					<el-checkbox  :label="item.name"></el-checkbox>',
		'				</div>',
		'			</el-checkbox-group>',
		'		</el-popover>',
		'		<el-tooltip class="item" content="字段显隐" placement="top">',
		'           <el-button size="small" icon="fa fa-cog" v-popover:popover4></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip class="item" content="刷新" placement="top">',
		'          <el-button size="small" icon="el-icon-refresh" @click="refresh"></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip v-show="isClosed" v-if="isSearchBtn" class="item" content="展开搜索" placement="top">',
		'	       <el-button size="small" icon="el-icon-arrow-down" @click="toggleSearch"></el-button>',
		'		</el-tooltip>',
		'		<el-tooltip v-show="!isClosed" v-if="isSearchBtn" class="item" content="收起搜索" placement="top">',
		'	       <el-button size="small" icon="el-icon-arrow-up" @click="toggleSearch"></el-button>',
		'		</el-tooltip>',
		'  </span>',
		'</div>',
		'<div class="is-grown">',
		'	<el-table ref="mytable" @selection-change="handleSelectionChange" @sort-change="sortChange" @row-dblclick="preview" @row-click="checkRow" v-loading="loading" height="100%" :data="tableData" border :header-cell-style="headStyle" style="width: 100%" stripe>',
		'    <el-table-column type="selection" width="55" align="center" fixed></el-table-column>',
		'		<el-table-column label="序号" type="index" align="center" width="50" fixed>',
		'		</el-table-column>',
		'   <template v-for="item,index in fields" v-if="fieldshowed.indexOf(item.name)>-1">',
		' 		<el-table-column  v-if="item.tagTypeFn" :sortable="item.sortable?\'custom \':false" :key="item.oid" :fixed="index=== 0?true:false" :label="item.name" :prop="item.field" :formatter="item.formatter" min-width="130px" :width="item.width" show-overflow-tooltip align="center">',
		'       <template slot-scope="scope">',
		'         <el-tag size="small" :type="item.tagTypeFn(scope.row)" close-transition>{{scope.row[item.field]}}</el-tag>',
		'       </template>',
		' 		</el-table-column>',
		' 		<el-table-column v-else :sortable="item.sortable?\'custom \':false" :key="item.oid" :fixed="index=== 0?true:false" :label="item.name" :prop="item.field" :formatter="item.formatter" min-width="130px" :width="item.width" show-overflow-tooltip align="center">',
		' 		</el-table-column>',
		'   </template>',
		'		<el-table-column label="操作" align="center" v-if="!isHideBtnCol" :width="btncolwidth" fixed="right">',
		'			<template slot-scope="scope">',
		// '				<el-button @click.stop="locate(scope.row)"  v-if="isHasPrivilege(' + "'bt_position'" + ')" type="text" size="mini">定位</el-button>',
		// '				<el-button @click.stop="preview(scope.row)"  v-if="isHasPrivilege(' + "'bt_select'" + ')" type="text" size="mini">查看</el-button>',
		// '				<el-button @click.stop="edit(scope.row)"  :disabled="frozenBtn(scope.row)" v-if="isHasPrivilege(' + "'bt_update'" + ')"  type="text" size="mini">编辑</el-button>',
		// '				<el-button @click.stop="deleteItem(scope.row)" :disabled="frozenBtn(scope.row)" v-if="isHasPrivilege(' + "'bt_delete'" + ')"   type="text" size="mini">删除</el-button>',
		'				    <el-button  v-for="item in rowBtns" :key="item.name" v-if="ckeckIfShow(scope.row,item)"  @click.stop="clickRowBtns(scope.row,item)" :type="item.type || \'text\'" size="mini">{{item.name}}</el-button>',
		'			</template>',
		'		</el-table-column>',
		'	</el-table>',
		'</div>',
		'<div style="padding: 15px 0 0;" class="clearfix">',
		'	<el-pagination class="fr" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"',
		'		:page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">',
		'	</el-pagination>',
		'</div>',
		'</div>',
	].join(''),
	watch: {
		privilegeCode: function () {
			this._requestPrivilege(this._privilegeCode);
			// this.search();
		}
	},
	created: function () {
		var that = this
		var param = window.jasTools.base.getParamsInUrl(location.href);
		this.isApprove = param.isApprove;
		this._className = this.className || param.className;
		this._classNameQuery = this.classNameQuery || param.classNameQuery;
		this._templateCode = this.templateCode || param.templateCode;
		this._exportTemplateCode = this.exportTemplateCode || param.exportTemplateCode;
		this.functionCode = param.menuCode || param.functionCode;
		this._privilegeCode = this.privilegeCode || param.privilegeCode;
		this.fieldshowed = this.fields.filter(function (item) {
			return !item.tablehidden;
		}).map(function (item) {
			return item.name;
		});
		this.propconfig.oid && (this.prop.oid = this.propconfig.oid);
	},
	mounted: function () {

		this._requestPrivilege(this._privilegeCode);
		this.search();
	},
	methods: {
		ckeckIfShow: function (row, item) {
			var isShow = item.isShow ? item.isShow([row]) : true;
			var isHasPrivilege = item.privilegeCode ? this.isHasPrivilege(item.privilegeCode) : true;
			return (isShow && isHasPrivilege);
		},
		clickRowBtns: function (row, item) {
			if (item.isDefaultMethod) { //'bt_position'、'bt_select'、'bt_update'、'bt_delete'
				var fnMap = {
					'bt_position': 'locate',
					'bt_select': 'preview',
					'bt_update': 'edit',
					'bt_delete': 'deleteItem',
				}
				if (item.privilegeCode && fnMap[item.privilegeCode]) {
					this[fnMap[item.privilegeCode]](row);
				}
			} else {
				this.$emit('clickrowbtn', row, item.name)
			}
		},
		toggleSearch: function () {
			this.$parent.toggleSearch();
			this.isClosed = this.$parent.isClosed;
		},
		frozenBtn: function (row) {
			if (row.approveStatus > 0) {
				return true;
			}
			return false;
		},
		upcall: function () {

			var that = this;
			var oids = this.reportRows.map(function (item) {
				return item[that.prop.oid];
			});
			if (oids.length === 0) return;
			var url = jasTools.base.rootPath + '/daq/dataApprove/save.do';
			jasTools.ajax.post(url, {
				businessOid: oids,
				approveStatus: 1, //status 2 通过 -1 驳回
				className: this._className,
				functionCode: this.functionCode,
			}, function (data) {
				top.Vue.prototype.$message({
					type: 'success',
					message: '上报成功'
				});
				that.refresh();
			});
		},
		approve: function () {
			var that = this;
			var oids = this.approveRows.map(function (item) {
				return item[that.prop.oid];
			});
			if (oids.length === 0) {
				return;
			} else if (oids.length === 1) {

				var src = jasTools.base.setParamsToUrl(this.detailUrl, {
					approveType: 2,
					className: this._className,
					menuCode: this.functionCode || '',
				});
				var url = jasTools.base.setParamsToUrl(src, this.approveRows[0]);
				top.jasTools.dialog.show({
					width: '60%',
					height: '80%',
					title: '审核',
					src: url,
					cbForClose: function (param) {
						if (param == 'success') {
							that.refresh();
						}
					}
				});
			} else {
				var src = jasTools.base.setParamsToUrl('./pages/template/dialogs/approveTemplate.html', {
					approveType: 2,
					className: this._className,
					menuCode: this.functionCode || '',
				});
				var url = jasTools.base.setParamsToUrl(src, {
					oids: oids.join(',')
				});
				top.jasTools.dialog.show({
					width: '600px',
					height: '400px',
					title: '批量审核',
					src: url,
					cbForClose: function (param) {
						if (param == 'success') {
							that.refresh();
						}
					}
				});
			}
		},
		handleSelectionChange: function (val) {
			var that = this;
			this.oids = val.map(function (item) {
				return item[that.prop.oid];
			});
			this.$emit('selectchanged', val);
			this.rows = val;
		},
		sortChange: function (param) {
			if (param.prop) {
				var type = param.order == 'descending' ? 'desc' : 'asc';
				this.form.orderBy = param.prop + ' ' + type;
			} else {
				this.form.orderBy = null;
			}
			this.search();
		},
		locate: function (item) {
			this.$emit('locate', item)
		},
		isHasPrivilege: function (sName) {
			//console.log(sName);
			if (this._privilegeCode && this.privilege.indexOf(sName) === -1) {
				return false;
			}
			return true;
		},
		_requestPrivilege: function (privilegeCode) {
			var that = this;
			if (!privilegeCode) return;
			if ((typeof privilegeCode) === 'string') {
				var url = jasTools.base.rootPath + "/jasframework/privilege/privilege/getFunctionConfig.do";
				jasTools.ajax.get(url, {
					privilegeCode: privilegeCode, //菜单权限编号
					appId: jasTools.base.getAppId() || "402894a152681ba30152681e8b320003" //应用id，值默认
				}, function (data) {
					that.privilege = data.rows.map(function (item) {
						return item.functionType;
					});
				});
			} else {
				that.privilege = privilegeCode;
			}
		},
		search: function () {
			this._requestTable();
		},
		refresh: function () {
			this.search();
		},
		add: function () {
			var that = this;
			if (!this.addUrl) return;
			top.jasTools.dialog.show({
				width: this.dialogconfig.addWidth || '60%',
				height: this.dialogconfig.addHeight || '80%',
				title: '增加',
				src: this.addUrl,
				cbForClose: function () {
					that.refresh()
				}
			});
		},
		checkRow: function (row) {
			this.$refs['mytable'].toggleRowSelection(row)
		},
		preview: function (row) {
			var that = this;

			if (!this.detailUrl || !this.isHasPrivilege('bt_select')) return;
			var url = this.detailUrl;
			if (this.isApprove) {
				url = jasTools.base.setParamsToUrl(this.detailUrl, {
					approveType: 1
				});
			}
			var paramObj = {
				oid: row[that.prop.oid]
			};
			url = jasTools.base.setParamsToUrl(url, paramObj);
			top.jasTools.dialog.show({
				width: this.dialogconfig.detailWidth || '60%',
				height: this.dialogconfig.detailHeight || '80%',
				title: '查看',
				src: url,
			});
		},
		_requestTable: function (str, cb) {
			var that = this;
			that.loading = true;
			var obj = jasTools.base.extend({}, {
				pageNo: this.currentPage,
				pageSize: this.pageSize,
			}, this.form);
			if (typeof this.searchPath != 'string') {
				that.loading = false;
				that.isNotFirst = true;
				that.tableData = this.searchPath;
				that.total = this.searchPath.length;
				return;
			}
			var url = jasTools.base.rootPath + this.searchPath;
			jasTools.ajax[this.searchType](url, obj, function (data) {
				if (that.isNotFirst) {
					setTimeout(function () {
						that.loading = false;
					}, 100);
				} else {
					that.loading = false;
					that.isNotFirst = true;
				}
				that.tableData = data.rows;
				that.total = data.total;
			});
		},
		edit: function (row) {
			var that = this;
			var url = jasTools.base.setParamsToUrl(this.addUrl, row)
			top.jasTools.dialog.show({
				width: this.dialogconfig.addWidth || '60%',
				height: this.dialogconfig.addHeight || '80%',
				title: '修改',
				src: url,
				cbForClose: function () {
					that.refresh()
				}
			});
		},
		deleteItem: function (row) {
			var that = this;
			window.top.Vue.prototype.$confirm('您确定要删除本条数据吗？', '提示', {
				type: 'warning',
				callback: function (action) {
					if (action === 'confirm') {
						that._deleteItem(row);
					}
				}
			});
		},
		_deleteItem: function (row) {
			var that = this;
			if (this.deletePath) {
				var url = jasTools.base.rootPath + this.deletePath;
				jasTools.ajax.post(url, {
					oid: row[that.prop.oid]
				}, function (data) {
					top.Vue.prototype.$message({
						type: 'success',
						message: '删除成功'
					});
					that.refresh();
				});
			} else {
				this.$emit('deleterow', row);
			}
		},
		handleSizeChange: function (val) {
			this.pageSize = val;
			this.search();
		},
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.search();
		}
	},

});


Vue.component('jas-import-export-btns', {
	props: {
		templateCode: { // horizontal
			type: String,
		},
		exportTemplateCode: { // horizontal
			type: String,
		},
		functionCode: {
			type: String,
		},
		oids: {
			type: Array,
		},
		form: {
			type: Object,
		},
		isImport: {
			type: Boolean,
			default: true,
		},
		isExport: {
			type: Boolean,
			default: true,
		},
		importConfig: {}
	},
	data: function () {
		return {}
	},
	template: [
		'<span style="margin-left: 10px;" >',
		'<el-button size="small" v-if="isImport" type="primary" plain="plain" icon="fa fa-mail-forward" @click="bt_import">导入</el-button>',
		'<el-button size="small" :disabled="oids.length==0" v-if="isExport" type="primary" plain="plain" icon="fa fa-mail-reply" @click="bt_export">导出已选</el-button>',
		'<el-button size="small" v-if="isExport" type="primary" plain="plain" icon="fa fa-mail-reply-all" @click="bt_export_all">导出全部</el-button>',
		'<el-button size="small" v-if="isImport" type="primary" plain="plain" icon="fa fa-download" @click="bt_download">下载模板</el-button>',
		'</span>',
	].join(''),
	methods: {
		bt_import: function () { // 导入
			var that = this;
			var src = './pages/template/dialogs/upload.html?templateCode=' + this.templateCode;
			if (that.importConfig && that.importConfig.importUrl) {
				src += "&importUrl=" + that.importConfig.importUrl;
			}
			top.jasTools.dialog.show({
				title: '导入',
				width: '600px',
				height: '600px',
				src: src,
				cbForClose: function () {
					that.$emit('refreshtable');
				}
			});
		},
		bt_export: function (obj) {
			var that = this;
			var url = jasTools.base.rootPath + '/importExcelController/exportExcel.do';
			if (that.importConfig && that.importConfig.exportUrl) {
				url = jasTools.base.rootPath + that.importConfig.exportUrl;
			}
			jasTools.ajax.post(url, {
				templateCode: this.exportTemplateCode,
				functionCode: this.functionCode, //"F000043", // 自定义表单功能编码
				keywords: {
					oids: this.oids
				}
			}, function (data) {
				that._downloadExportFile(data.data);
			});
		},
		bt_export_all: function (obj) { // 导出全部
			var that = this;
			var url = jasTools.base.rootPath + '/importExcelController/exportExcel.do';
			//			for(var key in this.form){
			//				if(this.form[key]&&JSON.stringify(this.form[key]).indexOf("min")>-1){
			//					this.form[key]=[Number(this.form[key].min),Number(this.form[key].max)];
			//				}
			//			}
			if (that.importConfig && that.importConfig.exportUrl) {
				url = jasTools.base.rootPath + that.importConfig.exportUrl;
			}
			jasTools.ajax.post(url, {
				templateCode: this.exportTemplateCode,
				functionCode: this.functionCode, // 自定义表单功能编码
				keywords: this.form
			}, function (data) {
				that._downloadExportFile(data.data);
			});
		},
		_downloadExportFile: function (id) {
			var that = this;
			var url = jasTools.base.rootPath + "/importExcelController/downloadExcel.do";
			jasTools.ajax.downloadByIframe('post', url, {
				fileId: id
			});
			// jasTools.ajax.downloadByPost(url, {
			// 	fileId: id
			// });
		},
		bt_download: function () { // 下载模板
			var that = this;
			jasTools.ajax.downloadByIframe('post', jasTools.base.rootPath + "/jasframework/excelTemplate/download.do", {
				excelTemplateCode: this.templateCode
			});
		},

	},
	mounted: function () {
		console.log(this.importConfig);
	}
});

Vue.component('jas-form-items', {
	props: {
		subindex: {},
		formfield: {},
		fields: { // horizontal
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
			fatherSelectList: [],
			childSelectList: [],
		}
	},
	template: [
		'<el-row>',
		'	<template v-for="item in fields">',

		'		<template v-if="fieldsConfig[item.field].type == \'textarea\'">',
		'			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">',
		'				<jas-textarea :title="item.name" :maxLength="fieldsConfig[item.field].maxLength || 200" v-model="form[item.field]"></jas-textarea>',
		'			</el-col>',
		'		</template>',

		'		<el-col v-else :xs="24" :sm="12" :md="12" :lg="12" :xl="8">',
		'			<el-form-item :ref="item.field + 123" :label="item.name"  :prop="formfield?(formfield + \'[\' + subindex + \'].\'+ item.field):item.field" :rules="fieldsConfig[item.field] && fieldsConfig[item.field].rules" style="margin-bottom: 15px ">',
		'				<template v-if="fieldsConfig[item.field].type == \'select\'">',
		'					<el-select :ref="item.field" v-model="form[item.field]" clearable :placeholder="\'请选择\'+item.name" size="small" @visible-change="visibleChange($event,item.field)"  @change="fatherSelectChanged($event,item.field)">',
		'						<el-option v-for="option in fieldsConfig[item.field].options" :key="option.key" :label="option.value" :value="option.key"></el-option>',
		'					</el-select>',
		'				</template>',
		'				<template v-if="fieldsConfig[item.field].type == \'multiSelect\'">',
		'				  <jas-base-el-multi-select :ref="item.field" v-model="form[item.field]" :item="item" :options="fieldsConfig[item.field].options" @visible-change="visibleChange($event,item.field)" @change="fatherSelectChanged($event,item.field)"></jas-base-el-multi-select>',
		'				</template>',

		'				<template v-if="fieldsConfig[item.field].type == \'input\'">',
		'					<el-input @change="fieldChanged(item.field)" v-model="form[item.field]" :placeholder="\'请输入\'+item.name" size="small" clearable></el-input>',
		'				</template>',
		'	    	<template v-if="fieldsConfig[item.field].type == \'number\'">',
		'					<el-input-number @change="fieldChanged(item.field)" v-model="form[item.field]" :precision="precision(fieldsConfig[item.field].precision)" :step="1" :max="fieldsConfig[item.field].max || 999999" controls-position="right" clearable :placeholder="\'请输入\'+item.name" size="small"></el-input-number>',
		'	    	</template>',
		'				<template v-if="fieldsConfig[item.field].type == \'date\'">',
		'					<el-date-picker clearable value-format="yyyy-MM-dd" type="date" :placeholder="\'请选择\'+item.name" @change="fieldChanged(item.field)" v-model="form[item.field]" size="small" style="width: 100%;"></el-date-picker>',
		'				</template>',
		'			</el-form-item>',
		'		</el-col>',
		'	</template>',
		'</el-row>',
	].join(''),
	methods: {
		precision: function (value) {
			if (value == 0) return 0;
			if (!value) return 3;
			return value;
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
		labelWidth: function (name) {
			return name.length > 5 ? '220px' : '100px';
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

			for (var field in fieldsConfig) {
				var fieldIndex = fieldArr.indexOf(field);
				if (fieldIndex > -1 && fieldsConfig.hasOwnProperty(field)) {
					var config = fieldsConfig[field];
					/* 初始化赋值 */
					if (!config.options) {
						that.$set(config, 'options', []);
					}
					if (!config.rules) {
						that.$set(config, 'rules', []);
					}
					if (config.type === 'select' && config.childSelect && config.childSelect.length > 0) {
						that.childSelectList.push.apply(that.childSelectList, config.childSelect);
						that.fatherSelectList.push(field);
					}

					/* 设置验证规则 */
					if (config.isRequired) {
						config.rules.push({
							required: true,
							message: fieldNameArr[fieldIndex] + '为必填项',
							//trigger: 'change'
						});
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
				if (that.form.weldOid != "" && childField == "weldOid") {
					options.push({
						key: that.form.weldOid,
						value: that.form.weldCode
					});
					that.fieldsConfig[childField].options = options;
				} else {
					that.fieldsConfig[childField].options = options;
				}
				var length = that.fieldsConfig[childField].options.length;
				!isInit && (form[childField] = '');
				//form[childField] = '';
				//if (options.length === 1) { //只有一个选项就自动复制
				//form[childField] = options[0].key;
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
				if (!fieldConfig.childUrl || fieldConfig.childUrl.length === 0) return;
				var url = fieldConfig.childUrl[index] || fieldConfig.childUrl[0];
				getAndSet(fatherField, form[fatherField], childField, url);
			});
			this.fieldChanged(fatherField)
		},

		fieldChanged: function (field) {
			// console.log(this.$refs[field + 123][0].form)
			console.log(field)
			// this.$refs[field + 123][0].form.validateField(field);
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
	created: function () {},
	mounted: function () {
		this.resetFieldsConfig(this.fields, this.fieldsConfig);
	}
});

Vue.component('jas-form-items-group', {
	props: {
		namesGroup: {
			type: Array,
		},
		fieldsGroup: { // horizontal
			type: Array,
		},
		fieldsConfig: {
			type: Object,
		},
		form: {
			type: Object,
			default: function () {
				return {}
			}
		},
	},
	data: function () {
		return {
			fatherSelectList: [],
			childSelectList: [],
		}
	},
	template: [

		'<div>',
		'<div v-for="fields,index in fieldsGroup">',
		'	<jas-base-group-title :name="namesGroup[index]"></jas-base-group-title>',

		'<el-row>',
		'	<template v-for="item in fields">',
		'		<template v-if="fieldsConfig[item.field].type == \'textarea\'">',
		'			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">',
		'				<jas-textarea :title="item.name" :maxLength="fieldsConfig[item.field].maxLength || 200" v-model="form[item.field]"></jas-textarea>',
		'			</el-col>',
		'		</template>',
		'		<el-col v-else :xs="24" :sm="12" :md="12" :lg="12" :xl="8">',
		'			<el-form-item :ref="item.field + 123" :label="item.name"  :prop="item.field" :rules="fieldsConfig[item.field] && fieldsConfig[item.field].rules" style="margin-bottom: 15px ">',
		'				<template v-if="fieldsConfig[item.field].type == \'select\'">',
		'					<el-select :disabled="fieldsConfig[item.field].disabled?true:false" :ref="item.field" v-model="form[item.field]" clearable :placeholder="\'请选择\'+item.name" size="small" @visible-change="visibleChange($event,item.field)"  @change="fatherSelectChanged($event,item.field)">',
		// '						<el-option v-for="option in fieldsConfig[item.field].options" :key="option.key" :label="option.value" :value="option.key"></el-option>',
		'						<el-option v-for="option in fieldsConfig[item.field].options" :key="option.key" :label="fieldsConfig[item.field].props?option[fieldsConfig[item.field].props.label]:option.value" :value="fieldsConfig[item.field].props?option[fieldsConfig[item.field].props.value]:option.key"></el-option>',
		'					</el-select>',
		'				</template>',
		'				<template v-if="fieldsConfig[item.field].type == \'multiSelect\'">',
		'				  <jas-base-el-multi-select :ref="item.field" v-model="form[item.field]" :item="item" :options="fieldsConfig[item.field].options" @visible-change="visibleChange($event,item.field)" @change="fatherSelectChanged($event,item.field)"></jas-base-el-multi-select>',
		'				</template>',

		'				<template v-if="fieldsConfig[item.field].type == \'cascader\'">',
		'				  <jas-base-el-cascader :ref="item.field" v-model="form[item.field]" :props="fieldsConfig[item.field].props" :item="item" :options="fieldsConfig[item.field].options" @visible-change="visibleChange($event,item.field)"></jas-base-el-cascader>',
		'				</template>',

		'				<template v-if="fieldsConfig[item.field].type == \'input\'">',
		'					<el-input :disabled="fieldsConfig[item.field].disabled?true:false" @change="fieldChanged(item.field)" v-model="form[item.field]" :placeholder="\'请输入\'+item.name" size="small" clearable></el-input>',
		'				</template>',
		'		    	<template v-if="fieldsConfig[item.field].type == \'number\'">',
		'					<el-input-number @change="fieldChanged(item.field)" v-model="form[item.field]" :precision="fieldsConfig[item.field].precision || 3" :step="1" :max="fieldsConfig[item.field].max || 999999" controls-position="right" clearable :placeholder="\'请输入\'+item.name" size="small"></el-input-number>',
		'	  		  	</template>',
		'				<template v-if="fieldsConfig[item.field].type == \'date\'">',
		'					<el-date-picker clearable value-format="yyyy-MM-dd" type="date" :placeholder="\'请选择\'+item.name" @change="fieldChanged(item.field)" v-model="form[item.field]" size="small" style="width: 100%;"></el-date-picker>',
		'				</template>',
		'			</el-form-item>',
		'		</el-col>',
		'	</template>',
		'</el-row>',
		'</div>',
		'</div>',
	].join(''),
	methods: {
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

			for (var field in fieldsConfig) {
				var fieldIndex = fieldArr.indexOf(field);
				if (fieldIndex > -1 && fieldsConfig.hasOwnProperty(field)) {
					var config = fieldsConfig[field];
					/* 初始化赋值 */
					if (!config.options) {
						that.$set(config, 'options', []);
					}
					if (!config.rules) {
						that.$set(config, 'rules', []);
					}
					if (config.type === 'select' && config.childSelect && config.childSelect.length > 0) {
						that.childSelectList.push.apply(that.childSelectList, config.childSelect);
						that.fatherSelectList.push(field);
					}

					/* 设置验证规则 */
					if (config.isRequired) {
						config.rules.push({
							required: true,
							message: fieldNameArr[fieldIndex] + '为必填项',
							//	trigger: 'change'
						})
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
							var obj = {};
							if (config.requestParams) {
								obj = jasTools.base.extend(obj, config.requestParams);
							}
							jasTools.ajax.post(jasTools.base.rootPath + "/" + config.optionUrl, obj, function (data) {
								config.options = data.rows ? data.rows : data;
							});
						})(field, config)
					}
				}
			}

			that.fatherSelectList = that.fatherSelectList.filter(function (field) {
				return that.childSelectList.indexOf(field) === -1;
			});

		},
		visibleChange: function (isShowOptions, currentField) { //下拉框显示事件
			if (!isShowOptions) return;
			var fieldArr = [];
			var fieldNameArr = [];
			var fieldsConfig = this.fieldsConfig;

			this.allFields.forEach(function (item) {
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
			console.log(that.$refs[fatherField][0])
			that.$refs[fatherField][0].$forceUpdate()
			var fieldConfig = this.fieldsConfig[fatherField];
			var form = this.form;
			var setChildOptionsAndValue = function (childField, options) { // 入参下拉选项
				that.fieldsConfig[childField].options = options;
				!isInit && (form[childField] = '');

				// if (options.length === 1) { //只有一个选项就自动复制
				// 	form[childField] = options[0].key;

				// }else{
				// 	form[childField] = '';
				// }
				that.$refs[childField][0].$emit('change', isInit);
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
				if (!fieldConfig.childUrl || fieldConfig.childUrl.length === 0) return;
				var url = fieldConfig.childUrl[index] || fieldConfig.childUrl[0];
				getAndSet(fatherField, form[fatherField], childField, url);
			});
			this.fieldChanged(fatherField)
		},
		fieldChanged: function (field) {
			// console.log(this.$refs[field + 123][0].form)
			this.$refs[field + 123][0].form.validateField(field);
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
	created: function () {
		console.log(this.form, 1111111111)

	},
	mounted: function () {
		console.log(this.form, 1111111111)
		this.allFields = Array.prototype.concat.apply([], this.fieldsGroup);
		this.resetFieldsConfig(this.allFields, this.fieldsConfig);
	}
});

Vue.component('jas-sub-form-group', {
	props: {
		groupName: {
			type: String,
		},
		formfield: {
			type: String,
		},
		fields: { // horizontal
			type: Array,
			default: function () {
				return []
			}
		},
		fieldsConfig: {
			type: Object,
		},
		formList: {
			type: Array,
			default: function () {
				return []
			}
		},
		formDefault: {
			type: Object,
		},
	},
	data: function () {
		return {}
	},
	template: [
		'<div>',
		'	<div v-show="formList.length === 0">',
		'		<div style="padding-top: 10px;float: right;">',
		'			<el-button @click="addFormGroup(formList)" type="text" size="small">新增</el-button>',
		'		</div>',
		'		<jas-base-group-title :name="groupName"></jas-base-group-title>',
		'		<el-row>无</el-row>',
		'	</div>',
		'	<div v-for="row,index in formList" >',
		'		<div style="padding-top: 10px;float: right;">',
		'			<el-button v-show="formList.length-1==index" @click="addFormGroup(formList)"  type="text" size="small">新增</el-button>',
		'			<el-button v-show="row.operationFlag != -1" @click="removeFormGroup(formList,index)" type="text" size="small">删除</el-button>',
		'			<el-button v-show="row.operationFlag == -1" @click="resetFormGroup(formList,index)" type="text" size="small">恢复</el-button>',
		'		</div>',
		'		<jas-base-group-title :name="groupName+(index+1)"></jas-base-group-title>',
		'		<jas-form-items v-show="row.operationFlag != -1" 		:subindex="index" :formfield="formfield"  :form="row" :fields="fields" :fields-config="fieldsConfig"></jas-form-items>',
		'		<div v-show="row.operationFlag === -1" >已被删除</div>',
		'	</div>',
		'</div>',
	].join(''),
	methods: {
		resetFormGroup: function (formList, index) {
			formList[index].operationFlag = 2; // -1（删除），0（不变），1（新增），2（修改）
		},
		removeFormGroup: function (formList, index) {
			if (formList[index].oid) {
				formList[index].operationFlag = -1;
			} else {
				formList.splice(index, 1);
			}
		},
		addFormGroup: function (formList) {
			var obj = {};
			for (var item in this.formDefault) {
				if (this.formDefault.hasOwnProperty(item)) {
					obj[item] = this.formDefault[item]
				}
			}
			obj.operationFlag = 1;
			formList.push(obj);
		},
	},
});

Vue.component('jas-sub-detail-group', {
	props: {
		groupName: {
			type: String,
		},
		fields: { // horizontal
			type: Array,
		},
		detailList: {
			type: Array,
		},
	},
	data: function () {
		return {}
	},
	template: [
		'<div>',
		'	 <div v-show="detailList && detailList.length == 0">',
		'	 	<jas-base-group-title :name="groupName"></jas-base-group-title>',
		'	 	<div>无</div>',
		'	 </div>',
		'	 <div v-for="detail,index in detailList">',
		'	 	<jas-base-group-title :name="groupName+(index+1)"></jas-base-group-title>',
		'	 	<jas-detail-table :titles="fields" :detail="detail"></jas-detail-table>',
		'	 </div>',
		'</div>',
	].join(''),
	methods: {},
});

Vue.component('jas-approve-dialog', {
	props: {
		oid: {
			type: String
		},
		type: {
			type: Number, // 0 无审批功能 1 查看审批  2 审核审批
			default: 0
		},
		className: {
			type: String
		},
		functionCode: {
			type: String
		},
	},
	data: function () {
		return {
			total: 0,
			_oid: this.oid,
			_type: 0,
			_className: this.className,
			_functionCode: this.functionCode,
			searchform: {
				page: 1,
				rows: 10,
			},
			headStyle: {
				'background-color': '#f5f7fa ',
			},
			activeName: 'first',
			tableData: [],
			searchform: {
				page: 1,
				rows: 10,
			},
			loading: {
				table: false
			},
			remarks: '',
		}
	},
	template: [
		'				<jas-dialog-wrapper v-if="_type==0">',
		'					<slot></slot>',
		'				</jas-dialog-wrapper>',
		'<el-tabs v-else class="jas-approve-dialog jas-flex-box is-vertical" v-model="activeName" @tab-click="handleClick" >',
		'  <el-tab-pane label="详情信息" name="first">',
		'    <div style="height: 100%;overflow: auto;">',
		'				<jas-dialog-wrapper>',
		'					<div><slot></slot></div>',
		'					<div v-if="_type==2" slot="footer">',
		'						<div>',
		'							<div>',
		'								<el-form label-width="80px">',
		'									<el-form-item label="审批意见">',
		'										<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" size="small" v-model="remarks"></el-input>',
		'									</el-form-item>',
		'								</el-form>',
		'							</div>',
		'							<div>',
		'								<el-button size="small" @click="close">取 消</el-button>',
		'								<el-button size="small" type="warning" @click="requestApprove(-1)">驳 回</el-button>',
		'								<el-button size="small" type="primary" @click="requestApprove(2)">通 过</el-button>',
		'							</div>',
		'						</div>',
		'					</div>',
		'				</jas-dialog-wrapper>',
		'			</div>',
		'  </el-tab-pane>',
		'  <el-tab-pane label="审核信息" name="second">',
		'    <div class="jas-flex-box is-vertical" style="margin: 0 20px;">',
		'      <el-table v-loading="loading.table" class="is-grown" :data="tableData" height="100" style="width: 100%;" :header-cell-style="headStyle" border stripe>',
		'        <el-table-column type="index" label="序号" width="50" align="center" fixed></el-table-column>',
		'        <el-table-column prop="approveStatus" :formatter="formatter" label="操作类型" width="120" align="center"></el-table-column>',
		'        <el-table-column prop="approveOpinion" label="审批意见" align="center"></el-table-column>',
		'        <el-table-column prop="createDatetime" label="操作时间" width="160" align="center"></el-table-column>',
		'        <el-table-column prop="createUserName" label="操作人员" width="160" align="center"></el-table-column>',
		'      </el-table>',
		'      <el-pagination style="text-align: right;margin-top:15px" @size-change="handleSizeChange" @current-change="handleCurrentChange" ',
		'        :current-page="searchform.page" :page-sizes="[10,20,50,100]" :page-size="searchform.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">',
		'      </el-pagination>',
		'    </div>',
		'  </el-tab-pane>',
		'</el-tabs>',
	].join(''),
	created: function () {
		var param = window.jasTools.base.getParamsInUrl(location.href);
		this._oid = param.oid || this.oid;
		this._type = param.approveType || this.type;
		this._className = param.className || this.className;
		this._functionCode = param.menuCode || this.functionCode;
	},
	mounted: function () {

	},
	methods: {
		formatter: function (a, b, c) {
			if (c == 1) return '上报';
			if (c == 2) return '通过';
			if (c == -1) return '驳回';
		},
		handleClick: function (vm) {
			if (vm.name === 'second') {
				this.requestTableList();
			}
		},
		handleSizeChange: function (val) {
			this.searchform.rows = val;
			this.requestTableList();
		},
		handleCurrentChange: function (val) {
			this.searchform.page = val;
			this.requestTableList();
		},
		requestTableList: function () {
			var that = this;
			that.loading.table = true;
			var url = jasTools.base.rootPath + '/jdbc/commonData/dataApprove/getPage.do';
			jasTools.ajax.post(url, {
				businessOid: this._oid
			}, function (data) {
				setTimeout(function () {
					that.loading.table = false;
				}, 300)
				that.tableData = data.rows;
				that.total = data.total;
			});
		},
		requestApprove: function (status) {
			var that = this;

			if (status == -1 && !this.remarks) {
				top.Vue.prototype.$message({
					type: 'error',
					message: '驳回状态下，审批意见必填'
				});
				return;
			}

			var url = jasTools.base.rootPath + '/daq/dataApprove/save.do';
			jasTools.ajax.post(url, {
				businessOid: [this._oid],
				approveOpinion: this.remarks,
				approveStatus: status, //status 2 通过 -1 驳回
				className: this._className,
				functionCode: this._functionCode,
			}, function (data) {
				top.Vue.prototype.$message({
					type: 'success',
					message: '审核成功'
				});
				top.jasTools.dialog.close('success');
			});
		},
		close: function () {
			top.jasTools.dialog.close();
		},
	}
});

Vue.component('jas-remarks', { // 此组件已废弃，请使用jas-textarea
	props: {
		remarks: {
			type: String
		}
	},
	data: function () {
		return {
			remarksDesc: 200,
			remark: this.remarks
		}
	},
	watch: {
		remarks: function () {
			this.remark = this.remarks;
			this.remarksDesc = 200 - this.remarks.length;
		}
	},
	template: [
		'<el-form-item label="备注">',
		'<el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" size="small" v-model="remark"',
		':maxLength="200"  @input="instructionNum"></el-input>',
		'<p style="text-align:right;color:#999;">您还可以输入<span v-text="remarksDesc"></span>字</p>',
		'</el-form-item>'
	].join(''),
	mounted: function () {


	},
	methods: {
		instructionNum: function () {
			if (this.remark) {
				var num = 200 - this.remark.trim().length;
				this.remarksDesc = num;
				this.$emit('changevalue', this.remark.trim());
			}

		}
	}
});

Vue.component('jas-textarea', {
	props: {
		value: {},
		prop: {},
		rules: {},
		title: {
			default: '备注'
		},
		maxLength: {
			default: 200
		}
	},
	data: function () {
		return {}
	},

	computed: {
		_value: {
			get: function () {
				return this.value || '';
			},
			set: function (newVal) {
				this.$emit('input', newVal);
			}
		}
	},
	template: [
		'<el-form-item :prop="prop" :rules="rules" :label="title">',
		'<el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" size="small" v-model.trim="_value" ',
		':maxLength="maxLength" ></el-input>',
		'<p style="text-align:right;color:#999;position: absolute;top: 100%;right: 0;line-height: 1.4;">您还可以输入<span v-text="maxLength-_value.length"></span>字</p>',
		'</el-form-item>'
	].join(''),
	mounted: function () {},
	methods: {}
});

Vue.component('jas-detail-table-link', {
	props: {
		titles: {
			type: Array,
			required: true
		},
		detail: {

		}
	},
	data: function () {
		return {
			columnNum: 2,
		}
	},
	computed: {
		formatTitle: function () {
			var that = this;
			var newTitle = [];
			if (!this.detail) return [];
			this.titles.forEach(function (item, index, arr) {
				if (index % that.columnNum === 0) {
					var _arr = [];
					for (var i = 0; i < that.columnNum; i++) {
						if (arr[index + i] !== undefined) {
							_arr.push(arr[index + i]);
						}
					}
					newTitle.push(_arr)
				}
			});
			if (this.titles.length === 1) {
				this.columnNum = 1;
			}
			return newTitle;
		}
	},
	template: [
		'<div v-show="detail" class="jas-detail-table">',
		'<table class="table_wrap">',
		'    <template v-for="item in formatTitle">',
		'        <tr>',
		'            <template v-for="subitem in item">',
		'                <th>{{subitem.name}}</th>',
		'                <td v-if="subitem.isLink":ref="subitem.field" style="color: blue; cursor: pointer;"  @click="linkForDetail(subitem.link,detail[subitem.detailOid],subitem.detailTitle)" v-text="formatValue(detail[subitem.field],subitem.formatter)"></td>',
		'                <td v-else :ref="subitem.field" v-text="formatValue(detail[subitem.field],subitem.formatter)"></td>',
		'            </template>',
		'        </tr>',
		'    </template>',
		'</table>',
		'</div>'
	].join(''),
	methods: {
		formatValue: function (value, formatter) {
			if (formatter) {
				return formatter('', '', value, '');
			}
			return value;
		},
		resizeColumn: function () {
			var that = this;

			var width = that.$el.clientWidth;
			if (width < 660) {
				that.columnNum = 1;
			} else if (width < 1400) {
				that.columnNum = 2;
			} else {
				that.columnNum = 3;
			}
		},
		linkForDetail: function (src, oid, title) {
			console.log(title);
			if (!oid) return;
			var url = jasTools.base.setParamsToUrl(src, {
				oid: oid
			});
			top.jasTools.dialog.show({
				width: '55%',
				height: '80%',
				title: title,
				src: url,
			});
		}
	},
	mounted: function () {
		var that = this;
		this.resizeColumn();
		$(window).on('resize', function () {
			that.resizeColumn();

		});
	},
});


Vue.component('jas-remote-select-form-item', {
	props: {
		params: {
			default: function () {
				return {}
			}
		},
		keyword: {
			default: 'ruleName'
		},
		prop: {},
		disabled: {
			default: false
		},
		isShowButton: {
			default: false
		},
		rules: {},
		label: {},
		searchurl: {},
		value: {}, // v-model
		vlabel: {},
		propconfig: {
			default: function () {
				return {
					label: 'label',
					value: 'value',
				}
			}
		}
	},
	data: function () {
		return {
			sloading: false,
			myoptions: [],
			cacheoption: [],
			selectObj: null,
		}
	},
	mounted: function () {
		if (this.value && this.vlabel) {
			var op = {};
			op[this.propconfig.value] = this.value;
			op[this.propconfig.label] = this.vlabel;
			this.myoptions = [op];
			console.log('0000000000000000000000000')
		}
	},
	watch: {
		vlabel: function () {
			if (this.value && this.vlabel) {
				var op = {};
				op[this.propconfig.value] = this.value;
				op[this.propconfig.label] = this.vlabel;
				this.myoptions = [op];
				console.log('0000000000000000000000000-----------')
			}
		},

	},
	computed: {
		_value: {
			get: function () {
				var that = this;
				return this.value;
			},
			set: function (newVal) {
				var that = this;
				this.cacheoption.forEach(function (item) {
					if (item[that.propconfig.value] === newVal) {
						that.selectObj = item;
					}
				});
				this.$emit('input', newVal);
			}
		}
	},
	template: [
		'<el-form-item :rules="rules" :label="label" :prop="prop">',
		'	<div><el-select size="small" :disabled="disabled" v-model="_value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" @focus="remoteMethod" :loading="sloading">',
		'		<el-option v-for="item in myoptions" :key="item[propconfig.value]" :label="item[propconfig.label]" :value="item[propconfig.value]">',
		'     <slot v-bind:item="item"></slot>',
		'   </el-option>',
		'	</el-select>',
		' <el-button style="position:absolute;top:4px;right:-30px;" @click="newRules" v-if="isShowButton" type="text" size="small">创建</el-button>',
		'</div></el-form-item>'
	].join(''),
	methods: {
		newRules: function (query) {
			var that = this;
			var url = jasTools.base.rootPath +
				'/jasmvvm/pages/group-risk-test/base-template-new/dialogs/add-rule.html?pageCode=rule';

			top.jasTools.dialog.show({
				width: '900px',
				title: '新增',
				src: url,
				cbForClose: function (form) {
					console.log(form)
					// that.vlabel = form.ruleName;
					if (form) {
						that._value = form.oid;
						var op = {};
						op[that.propconfig.value] = form.oid;
						op[that.propconfig.label] = form.ruleName;
						that.myoptions = [op];
					}
					// that.$refs.table.refresh();
				}
			});
		},
		remoteMethod: function (query) {
			var that = this;
			if (query !== '') {
				if (typeof query !== 'string') {
					query = ''
				}
				this.sloading = true;
				var obj = jasTools.base.extend({}, this.params);
				obj[this.keyword] = query;
				var url = jasTools.base.rootPath + (this.searchurl || "/jdbc/commonData/rule/getPage.do");
				jasTools.ajax.post(url, obj, function (data) {
					that.sloading = false;
					that.myoptions = data.rows;
					that.cacheoption = that.cacheoption.concat(data.rows);
				});
			} else {
				this.myoptions = [];
			}
		},
	}
});

/** 通用业务组件--end ****************************************************************************************************************************************************************************************************************************************************************************************************/