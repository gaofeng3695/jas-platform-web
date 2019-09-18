window.app = new Vue({
	el: '#app',
	data: function () {
		return {
			username: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).userName,
			userunit: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).unitName,
			userImg: '../../common/images/enterlogo.png',
			items: [], //菜单数组
			openedIcons: [],
			iseditmode: false,
			isloading: true,
			
		}
	},
	computed: {
	},
	watch: {
	},

	mounted: function () {
		this._queryMenuData();
	},
	methods: {
		clickicon: function (icon, foid) {
			var that = this;

			if (this.iseditmode) {
				var index = that.openedIcons.indexOf(foid + '||' + icon.oid);

				if (index < 0) {
					that.openedIcons.push(foid + '||' + icon.oid)
				} else {
					that.openedIcons.splice(index, 1)
				}
			} else {
				var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/changeProject.do';
				jasTools.ajax.post(url, {
					projectOid: foid,
				}, function (data) {
					sessionStorage.setItem('projectOid', icon.oid)
					location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-index/index.html";
					// that.getChildrenMenu(icon.oid)
				});
			}
		},
		getChildrenMenu: function (fid) {
			var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/getChildrenMenuList.do';
			jasTools.ajax.get(url, {
				id: fid,
				appId: jasTools.base.getAppId() || '402894a152681ba30152681e8b320003',
			}, function (data) {
				console.log(data)

			});
		},
		randomcolor: function (index) {
			var colors = ['#65c8e8', '#607dbf', '#7ccc5d', '#eac53d', '#ae88d3'];
			var n = index % 5;
			if (index) {
				return colors[n]
			}
			return colors[0]
		},
		_queryMenuData: function () {
			var that = this; // 获取左侧菜单
			var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/getProject.do';
			jasTools.ajax.postForm(url, {
				"menutype": "0",
				"appnumber": jasTools.base.getAppId() || "402894a152681ba30152681e8b320003",
				"language": "zh_CN"
			}, function (data) {
				that.isloading = false;
				that.iseditmode = false;
				that.items = data.rows;
				that.openedIcons = [];
				data.rows.forEach(function (item) {
					item.privilegeList.forEach(function (icon) {
						that.openedIcons.push(item.oid + '||' + icon.oid);
					})
				})
			});
		},
		selectMenu: function (index) {
			var that = this;
			var newTap = '';
			this.tabs.forEach(function (item) { //循环打开的标签页，判断选中的菜单是否带开过
				if (item.name === index) {
					newTap = index;
				}
			});
			if (!newTap) {
				// var aTab = this._createTabsArr([index], this.items);
				this.tabs.push(aTab[0]);
			}
			this.currentTap = index;
		},


		_loginOut: function () {
			var url = jasTools.base.rootPath + '/jasframework/login/logout.do';

			jasTools.ajax.get(url, {}, function (data) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-login/login.html";
			}, function () {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-login/login.html";
			});
		},

		handleCommand: function (command) {
			if (command === 'loginout') {
				this._loginOut();
			} else if (command === 'fullscreen') {
				this._goFullscreen();
			} else if (command === 'resetPassword') {
				this._resetPassword();
			} else if (command === 'changeLayout') {
				this.changeLayout();
			}
		},

		_goFullscreen: function () {
			if (screenfull.enabled) {
				// screenfull.toggle($('.tabswrapper .el-tabs__content')[0]);
				screenfull.toggle();
			} else {
				window.top.Vue.prototype.$message({
					message: '您的浏览器不支持全屏',
					type: 'error'
				});
				// Ignore or do something else
			}
		},
		saveEditdesk: function () {
			var that = this;
			that.isloading = true;
			var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/editCustomDesktop.do';
			jasTools.ajax.post(url, {
				customDesktopList: this.openedIcons.map(function(item){
					return{
						projectOid:item.split('||')[0],
						privilegeOid:item.split('||')[1],
					}
				}),
			}, function (data) {
				that._queryMenuData();
			});
		},
		cancelEdit: function () {
			this.isloading = true;
			this._queryMenuData();
		},
		_editdesk: function () {
			var that = this;
			if (this.iseditmode) return;
			that.isloading = true;

			var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/getProject.do';
			jasTools.ajax.postForm(url, {
				"menutype": "0",
				"appnumber": jasTools.base.getAppId() || "402894a152681ba30152681e8b320003",
				"language": "zh_CN",
				queryType: 1
			}, function (data) {
				that.isloading = false;

				that.iseditmode = true;
				that.items = data.rows;
			});
		},
		_resetPassword: function () {
			var that = this;
			jasTools.dialog.show({
				title: '修改密码',
				width: '530px',
				height: '530px',
				src: '../page-password/resetword.html',
				cbForClose: function (param) {
					if (param === 1) {
						that._loginOut();
					}
				}
			});
		},
		_requestLoginInfo: function () {
			var that = this;
			var url = jasTools.base.rootPath + '/jasframework/log/login/getUserStatisticsInfo.do';

			jasTools.ajax.get(url, {}, function (data) {
				var obj = data.data;
				that.$notify({
					type: 'success',
					title: '登录成功',
					position: 'bottom-right',
					dangerouslyUseHTMLString: true,
					message: [
						'<div style="font-size:12px;">',
						'	<div><span style="color:#409EFF;font-weight: 700;">' + obj.userName + '</span>,您好！</div>',
						'	<div>登录次数：<span style="color:#409EFF;">' + obj.loginCount + '</span></div>',
						'	<div>累计在线时长：<span style="color:#409EFF;">' + obj.totalLoginDate + '</span></div>',
						'	<div>上次登录IP：<span style="color:#409EFF;">' + obj.clientIp + '</span></div>',
						'	<div>上次登录时间：<span style="color:#409EFF;">' + obj.lastLoginDate + '</span></div>',
						'</div>'
					].join('')
				});
			}, function () {

			});


		},
	},
})