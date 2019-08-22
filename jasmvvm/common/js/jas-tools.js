/**
 * -- jasTools js工具对象
 * -- @GF created on 2019/1/21
 *
 * ---- jasTools.base 基础操作方法
 * ------ jasTools.base.createuuid 创建uuid
 * ------ jasTools.base.extend 对象继承
 * ------ jasTools.base.rootPath 服务器路径中的项目名称
 * ------ jasTools.base.getParamsInUrl 获取url里的参数
 * ------ jasTools.base.setParamsToUrl 向url里添加参数
 * ------ jasTools.base.getIdArrFromTree 在树形结构内获取id
 * ------ jasTools.base.switchToCamelCase 下划线转驼峰
 *
 * ---- jasTools.dialog 弹出框
 * ------ jasTools.dialog.open 打开弹出框
 * ------ jasTools.dialog.close 关闭弹出框
 *
 * ---- jasTools.mask 覆盖框
 * ------ jasTools.mask.open 打开覆盖框
 * ------ jasTools.mask.close 关闭覆盖框
 *
 * ---- jasTools.ajax http请求
 * ------ jasTools.ajax.get get请求
 * ------ jasTools.ajax.post post请求
 * ------ jasTools.ajax.postForm post表单请求
 * ------ jasTools.ajax.downloadByIframe 下载
 *
 *
 */

(function (window) {

	/**
	 * @description 基础操作库
	 *
	 */
	var tools = (function () {
		/**
		 * @description 创建uuid
		 */
		var createuuid = function () {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
			s[8] = s[13] = s[18] = s[23] = "-";
			var uuid = s.join("");
			return uuid;
		};
		/**
		 *日期转换
		 */
		var formatDate = function (oDate, sFormat) { // 入参：date对象，格式化格式
			/*
			 * 对Date的扩展，将 Date 转化为指定格式的String
			 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
			 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
			 * 例子：
			 * formatDate(new Date(),"yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
			 * formatDate(new Date(),"yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
			 * formatDate(new Date(),"yyyyMMddHHmmssS")      ==> 20060702080904423
			 */
			var o = {
				"M+": oDate.getMonth() + 1, //月份
				"d+": oDate.getDate(), //日
				"H+": oDate.getHours(), //小时
				"m+": oDate.getMinutes(), //分
				"s+": oDate.getSeconds(), //秒
				"q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
				"S": oDate.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(sFormat)) sFormat = sFormat.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(sFormat)) sFormat = sFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return sFormat;
		};
		/**
		 * @description 继承对象
		 * @param target  要被继承的对象
		 */
		var extend = function (target) {
			for (var i = 1, j = arguments.length; i < j; i++) {
				var source = arguments[i] || {};
				for (var prop in source) {
					if (source.hasOwnProperty(prop)) {
						var value = source[prop];
						if (value !== undefined) {
							target[prop] = value;
						}
					}
				}
			}
			return target;
		};
		/**
		 * @description   获取url的
		 * @param target  要被继承的对象
		 */
		var getParamsInUrl = function (url) {
			var obj = null;
			if (url) {
				var arr = url.split('?');
				if (arr.length > 1) {
					var str = arr[1];
					var arr2 = str.split('&');
					arr2.forEach(function (item) {
						var _arr = item.split('=');
						if (_arr.length > 1) {
							obj = obj ? obj : {};
							obj[_arr[0]] = _arr[1];
						}
					})
				}
			}
			return obj || {};
		};
		/**
		 * @description  	向url上添加 key:value
		 * @param url  locoation.href
		 * @param obj  键值对
		 */
		var setParamsToUrl = function (url, obj) {
			if (!obj || typeof obj !== 'object') {
				return url
			}
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					var value = obj[prop];
					if (value !== undefined) {
						var str_connenct = url.indexOf('?') === -1 ? '?' : '&';
						url += str_connenct + prop + '=' + value;
					}
				}
			}
			return url;
		};

		/**
		 * 功能描述：获取系统根路径
		 */
		var getRootPath = function () {
			// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			var curWwwPath = window.document.location.href;
			// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			// 获取主机地址，如： http://localhost:8083
			var localhostPaht = curWwwPath.substring(0, pos);
			// 获取带"/"的项目名，如：/uimcardprj
			var projectName = pathName.substring(0, pathName.substring(1).indexOf('/') + 1);
			// 判断是否是前端项目，则设定代理前缀
			if (!projectName || projectName === '/jasmvvm' || projectName === '/pages') {
				return '/jasproxy'
			}
			return projectName; // /uimcardprj
			// return (localhostPaht + projectName + "/");
		};

		var getIdArrFromTree = function (treeData, nodeId, config) {

			var pidArr = [nodeId];
			var getPId = function (dataArr, id, pid) {
				for (var i = 0; i < dataArr.length; i++) {
					var item = dataArr[i];
					if (item.id === id) {
						return pid;
					} else {
						if (item.children && item.children.length > 0) {
							var result = getPId(item.children, id, item.id);
							if (result) return result;
						}
					}
				}
			};
			var getPPId = function (dataArr, id) {
				var pid = getPId(dataArr, id, '');
				if (pid) {
					pidArr.push(pid);
					getPPId(dataArr, pid);
				} else {
					return pidArr;
				}
			};

			getPPId(treeData, nodeId);
			return pidArr.reverse();
		};

		//字符串下划线转为驼峰
		var switchToCamelCase = function (string) {
			// Support: IE9-11+
			return string.replace(/_([a-z])/g, function (all, letter) {
				return letter.toUpperCase();
			});
		};
		var systemGuard = function (config, cb) {
			var params = jasTools.base.getParamsInUrl(location.href.split('#')[0]);
			var isAppRight = function () {
				if ((config.appId == params.appId) || !appId) {
					return true;
				}
				return false;
			};
			var isAppAccessable = function () {
				var result = false;
				var url = config.accessHost + '/jasframework/privilege/application/userAppPermission.do';
				$.ajax({
					type: "GET",
					url: url,
					async: false,
					data: {
						token: params.token,
						appId: params.appId,
					},
					success: function (data, status) {
						if (data.data == true) {
							result = true;
						}
					}
				});
				return result;
			};
			var loginByToken = function () { //http://192.168.100.130:8888/
				var url = config.loginHost + '/jasframework/login/loginByTokenAndAppId.do';
				$.ajax({
					type: "GET",
					url: url,
					async: false,
					data: {
						token: params.token,
						appId: params.appId,
					},
					success: function (data, status) {
						var userBo = data.user;
						var unitName = userBo.unitName;
						unitName = unitName.substr(unitName.lastIndexOf(">") + 1, unitName.length);
						userBo.unitName = unitName;
						localStorage.setItem("user", JSON.stringify(userBo));
						cb && cb(data);
					}
				});
			};

			if(!params.token || !params.appId){
				return; //不做任何验证
			}
			if (isAppRight()) {
				if (isAppAccessable()) {
					return loginByToken();
				}
			}
			alert('无进入权限')
		};

		return {
			rootPath: getRootPath(),
			createuuid: createuuid,
			extend: extend,
			formatDate: formatDate,
			getParamsInUrl: getParamsInUrl,
			setParamsToUrl: setParamsToUrl,
			getIdArrFromTree: getIdArrFromTree,
			switchToCamelCase: switchToCamelCase,
			systemGuard: systemGuard,
		};
	})();

	/**
	 * 模态框相关操作
	 */
	var jasDialog = (function (tools) {

		var dialogs = [];
		/**
		 * @description 弹出弹出层
		 * @param params             参数对象
		 * @param params.id          参数对象
		 * @param params.title       参数对象
		 * @param params.src         参数对象
		 * @param params.height      参数对象
		 * @param params.width       参数对象
		 * @param params.cbForClose    模态框关闭的回调
		 */
		var show = function (params) {
			var argument = params.argument;
			var obj = tools.extend({
				title: '模态框',
				src: 'https://www.awesomes.cn/',
				height: (80 - dialogs.length * 15) + '%',
				width: (80 - dialogs.length * 15) + '%',
				visible: true
			}, params);

			var html = [
				'<jas-iframe-dialog',
				'  :title="title" ',
				'  :iframeUrl="iframeUrl" ',
				'  :height="height" ',
				'  :width="width" ',
				'  :visible.sync="visible" ',
				'  @close="close">',
				'</jas-iframe-dialog>'

			].join('');
			var res = Vue.compile(html);
			var inst = new Vue({
				el: document.createElement('div'),
				data: {
					title: obj.title,
					iframeUrl: obj.src,
					height: obj.height,
					width: obj.width,
					visible: obj.visible,

				},

				methods: {
					close: function () {
						if (obj.cbForClose) {
							obj.cbForClose(this.paramForCallback);
						}
						var dom = this.$el;
						dom.parentNode.removeChild(dom); //删除
						dialogs.length = dialogs.length - 1;
						// console.log('关闭了一个dialogs')
						// this.$destroy();
						return;
					}
				},
				render: res.render,
				//staticRenderFns: res.staticRenderFns
			});
			document.body.appendChild(inst.$el);
			dialogs.push(inst);
		};
		/**
		 * @description 关闭最顶上的弹出层
		 * @param params             参数对象
		 */
		var close = function (param) {
			var index = dialogs.length - 1;
			if (index < 0) {
				console.log('没有可以关闭的dialogs')
				return;
			}
			var inst = dialogs[index];
			inst.paramForCallback = param;
			inst.visible = false;
		};
		return {
			// dialogs: dialogs,
			show: show,
			close: close
		};
	})(tools);


	var jasMask = (function (tools) {
		var aMaskInst = [];

		function Mask(obj) {
			var that = this;
			this.init(obj);
			setTimeout(function () {
				that.show();
			}, 10);
		}
		Mask.prototype = {
			constructor: Mask,
			init: function (obj) {
				var that = this;
				// obj={
				// 	window : window,
				// 	src:"",
				// 	params:{},
				// 	cbForClose : null
				// }
				this.title = obj.title || '';
				this.src = obj.src || '';
				this.window = obj.window || window;
				this.params = obj.params || '';
				this.cbForClose = obj.cbForClose || function () {};
				this.insertDom();
				var returnBtn = this.node.querySelector('.mask_return');
				returnBtn.onclick = function () {
					that.close();
				}

			},
			insertDom: function () {
				var html = [
					'<div style="height:34px;width:100%;box-sizing:border-box;background:#cee6ff;overflow: hidden;line-height:34px;padding:0 15px;position: absolute;">',
					'	<span>', this.title, '</span>',
					'	<span style="float:right;cursor: pointer;color: #409EFF;" class="mask_return">返回</span>',
					'</div>',
					'<div style="height:100%;box-sizing: border-box;padding-top:34px;">',
					'	<iframe src="" frameborder="0" style="height:100%;width:100%;"></iframe>',
					'</div>',
				].join('');
				var node = document.createElement('div');
				node.style['height'] = 0;
				node.style['width'] = 0;
				node.style['background'] = '#fff';
				node.style['position'] = 'fixed';
				node.style['top'] = '50%';
				node.style['left'] = '50%';
				node.style['transform'] = 'translate(-50%,-50%)';
				node.style['z-index'] = '10';
				node.style['transition'] = 'all 0.3s';
				node.style['opacity'] = 0;

				node.innerHTML = html;

				this.window.document.body.appendChild(node);
				this.node = node;
			},
			getTrueSrc: function () {
				if (!this.src || !this.params) {
					return this.src
				}
				return tools.setParamsToUrl(this.src, this.params);
			},
			show: function () {
				var that = this;
				this.node.style.height = '100%';
				this.node.style.width = '100%';
				this.node.style.opacity = '1';
				aMaskInst.push(this);
				setTimeout(function () {
					var src = that.getTrueSrc();
					that.node.querySelector('iframe').src = src;
				}, 300)
			},
			close: function (param) {
				var that = this;
				this.node.style.height = '0';
				this.node.style.width = '0';
				this.node.style.opacity = '0';
				this.cbForClose && this.cbForClose(param);
				setTimeout(function () {
					that.node.remove();
					aMaskInst.length = aMaskInst.length - 1;
				}, 300)
			}
		}


		var showMask = function (obj) {
			var mask = new Mask(obj);

		}
		var closeMask = function (param) {
			var index = aMaskInst.length - 1;
			if (index < 0) {
				console.info('没有可以关闭的dialogs')
				return;
			}
			var inst = aMaskInst[index];
			inst.close(param);
		}

		return {
			show: showMask,
			close: closeMask
		}
	})(tools);

	var ajax = (function () {
		var ajax = function (type, url, params, cb_success, cb_fail) {
			for (var key in params) {
				if (params[key] == undefined) {
					params[key] = null;
				}
			}
			var data = type === 'POST' ? JSON.stringify(params) : params;
			var contentType = type === 'POSTFORM' ? ' application/x-www-form-urlencoded' : 'application/json';
			var ajaxType = type === 'POSTFORM' ? 'POST' : type;
			$.ajax({
				type: ajaxType || "GET",
				url: tools.setParamsToUrl(url, {
					token: localStorage.getItem('token')
				}),
				contentType: contentType,
				data: data,
				success: function (data, status) {

					if (data.status == -1 && data.code == "402") { // token失效或者过期，会返回-1
						window.top.Vue.prototype.$confirm('登录信息失效，请重新登录', '提示', {
							type: 'warning',
							callback: function (action) {
								if (action === 'confirm') {
									window.top.location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-login/login.html";
								}
							}
						});
						return;
					}
					if (data.status == -1 && data.code == "excel-400") { // token失效或者过期，会返回-1
						window.top.Vue.prototype.$message({
							message: '当前查询条件下无数据',
							type: 'error'
						});
						return;
					}
					if (data.status == 1) {
						cb_success && cb_success(data);
					} else if (!data.status && data) {
						if (data.success == -1) {
							cb_fail && cb_fail(data);
							window.top.Vue.prototype.$message({
								message: data.msg || data.message || '服务器连接失败，请稍后再试',
								type: 'error'
							});
						} else {
							cb_success && cb_success(data);
						}
					} else {
						cb_fail && cb_fail(data);
						window.top.Vue.prototype.$message({
							message: data.msg || data.message || '服务器连接失败，请稍后再试',
							type: 'error'
						});
					}
				},
				error: function () {
					window.top.Vue.prototype.$message({
						message: '服务器连接失败，请稍后再试',
						type: 'error'
					});
				}
			});
		};
		var downloadByIframe = function (type, url, data) {
			if (!url) return;
			var config = {
				url: tools.setParamsToUrl(url, {
					token: localStorage.getItem('token')
				}),
				data: data || {},
				method: type || data,
			}
			var $iframe = $('<iframe id="down-file-iframe" />');
			var $form = $('<form  method="' + config.method + '" />');
			$form.attr('action', config.url);
			for (var key in config.data) {
				$form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
			}
			$iframe.append($form);
			$(document.body).append($iframe);
			$form[0].submit();
			$iframe.remove();
		};

		/**
		 * @description  xhr_post方式下载文件
		 * @param url  请求路径
		 * @param obj  请求参数
		 * @param cbsuccess  成功回调
		 * @param cbfail  失败回调
		 */
		var downloadByPost = function (url, obj, cbsuccess, cbfail) {
			if (!url) return;
			url = tools.setParamsToUrl(url, {
				token: localStorage.getItem('token')
			});
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true); // 也可以使用POST方式，根据接口
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.responseType = "blob"; // 返回类型blob
			// 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
			xhr.onload = function (param) {
				// 请求完成
				// content-disposition: attachment;filename=custom_desktop.java
				if (this.status === 200) {
					// 获取文件名
					var filename = 'download.txt';
					var sName = xhr.getResponseHeader('content-disposition');
					if (sName) {
						sName.split(';').forEach(function (item) {
							var arr = item.split('=');
							if (arr[0] === 'filename') {
								filename = arr[1];
								filename = decodeURIComponent(filename);
							}
						});
						// 返回200
						var blob = this.response;
						var reader = new FileReader();
						reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
						reader.onload = function (e) {
							// 转换完成，创建一个a标签用于下载
							var a = document.createElement('a');
							a.download = filename;
							a.href = e.target.result;
							document.getElementsByTagName('body')[0].appendChild(a); // 修复firefox中无法触发click
							// $(a).trigger('click');
							a.click();
							// a.remove();
							a.parentNode.removeChild(a);
							cbsuccess && cbsuccess(xhr);
						}
					} else {
						cbfail && cbfail(param, this);
					}
				} else {
					cbfail && cbfail(param, this);
				}
			};
			// 发送ajax请求
			if (obj) {
				var sdata = '';
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						var item = key + '=' + obj[key];
						sdata += sdata ? '&' + item : item;
					}
				}
			}
			xhr.send(sdata);
		};
		return {
			ajax: ajax,
			get: ajax.bind(null, 'GET'),
			post: ajax.bind(null, 'POST'),
			postForm: ajax.bind(null, 'POSTFORM'),
			downloadByIframe: downloadByIframe,
			downloadByPost: downloadByPost,
		};
	})();

	window.jasTools = {
		dialog: jasDialog,
		mask: jasMask,
		base: tools,
		ajax: ajax,
	};
})(window);