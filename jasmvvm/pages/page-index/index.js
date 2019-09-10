var ConfigOfHome = {
	isShowMapFirst: false, // true false
	mapIframeSrc: jasTools.base.rootPath + '/jasmvvm/pages/module-gis/index.html',
	menuWith: 200, // 数字
};

window.app = new Vue({
	el: '#app',
	data: function () {
		return {
			appId: '',
			projectOid: sessionStorage.getItem('projectOid') || '',
			gisUrl: '',
			username: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).userName,
			userunit: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).unitName,
			userImg: '../../common/images/enterlogo.png',
			direction: 'right',
			panelShowed: ConfigOfHome.isShowMapFirst,
			isExpend: true,
			menuWith: ConfigOfHome.menuWith,
			menusOpened: [],
			currentTap: null,
			tabs: [], // 打开的标签页
			items: [], //菜单数组
			// isMapInited: false, //地图未初始化
			panelLayout: 'horizontal' //地图未初始化
		}
	},
	computed: {
		menuStyle: function () {
			return {
				width: this.isCollapse ? '64px' : (this.menuWith || 200) + 'px'
			}
		},
		isCollapse: function () {
			return !this.isExpend;
		},
	},
	created: function () {
		console.log(location.hash)
		this.currentTap = (location.hash && location.hash.slice(1)) || '';
		this.currentTap && (this.menusOpened = [this.currentTap]);
		var params = jasTools.base.getParamsInUrl(location.href.split('#')[0]);
		this.appId = params.appId || jasTools.base.getAppId() || '402894a152681ba30152681e8b320003';
		this._queryMenuData();
	},
	mounted: function () {
		this._setWindowResizeEventToCloseMenu();
		// this._requestLoginInfo();
		this.bindHashEvent();
		this.bindTabsMenuEvent();
		this.statuschanged(this.panelShowed); // 加载地图
	},

	watch: {
		currentTap: function (val) {
			val && (location.hash = val);
		}
	},


	methods: {
		backToDesk: function () {
			location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-plateform/index.html";
		},
		bindHashEvent: function () {
			var that = this;

			window.addEventListener("popstate", function (a, b, c) {
				var index = location.hash && location.hash.slice(1);
				index && that.selectMenu(index);
				//doSomething
			}, false);
		},
		bindTabsMenuEvent: function () {
			var that = this;
			$('.el-tabs__nav-scroll').on('contextmenu', function (e) {
				e.preventDefault();
				e.returnValue = false;
				that.$refs.popover.reference = e.currentTarget;
				that.$refs.popover.showPopper = true;
				return false; //取消window自带的菜单弹出来
			});
			$(document).on('click', function () {
				that.$refs.popover.showPopper = false;
			});
		},
		handleTabsOptions: function (index) {
			var that = this;
			if (index == 1) {
				var id = "pane-" + this.currentTap;
				document.getElementById(id).querySelector("iframe").contentWindow.location.reload(true);
			}
			if (index == 2) { // 关闭当前选项卡
				this.removeTab(this.currentTap);
			}
			if (index == 3) {
				this.tabs = this.tabs.filter(function (tab) {
					return (tab.name == that.currentTap) || !tab.closable;
				});
			}
			if (index == 4) {
				this.tabs = this.tabs.filter(function (item) {
					return !item.closable
				});
				this.currentTap = this.tabs[0] ? this.tabs[0].name : undefined;
			}
			this.$refs.popover.showPopper = false;

		},
		_getFirstMenuId: function (items) {
			var that = this;
			var obj = items[0];
			if (obj.subs && obj.subs.length > 0) {
				return this._getFirstMenuId(obj.subs);
			}
			return obj.id;
		},
		_queryMenuData: function () {
			var that = this; // 获取左侧菜单
			if (this.projectOid) {
				var url = jasTools.base.rootPath + '/jasframework/multiprojectPrivilege/getChildrenMenuList.do';
				jasTools.ajax.get(url, {
					id: this.projectOid,
					appId: that.appId,
				}, function (data) {
					console.log(data)
					if (typeof data === 'object' && data.length > 0) {
						that.items = that._formatMenus(data);
						if (!that.currentTap || that.currentTap == 0) {
							that.currentTap = that._getFirstMenuId(that.items);
							that.menusOpened = [that.currentTap];
						}
						that.tabs = that._createTabsArr(that.menusOpened, that.items);
					}
				});
			} else {
				var url = jasTools.base.rootPath + '/jasframework/privilege/privilege/getAllUserFuntion.do';
				$.ajax({
					url: url + "?token=" + localStorage.getItem('token'),
					type: 'get',
					async: true,
					data: {
						"menutype": "0",
						"appId": that.appId,
						"language": "zh_CN"
					},
					success: function (data, xhr, param) {
						if (typeof data === 'object' && data.length > 0) {
							that.items = that._formatMenus(data);
							if (!that.currentTap || that.currentTap == 0) {
								that.currentTap = that._getFirstMenuId(that.items);
								that.menusOpened = [that.currentTap];
							}
							that.tabs = that._createTabsArr(that.menusOpened, that.items);
						}

					}
				});
			}
		},
		_formatMenus: function (aMenu) {
			var _aMenu = JSON.parse(JSON.stringify(aMenu));
			var switcher = function (arr) {
				if (typeof arr === "object") {
					arr.forEach(function (item) {
						item.index = item.id || '';
						item.icon = item.icon || ''; //fa-bars fa-bookmark
						item.title = item.text;
						if (!item.attributes) {
							item.attributes = {};
							item.attributes.URL = 'jasmvvm/pages/module-jasdoc/doc-verify/doc-verify.html';
						}

						if (item.attributes && item.attributes.URL) {
							if (item.attributes.URL.indexOf('http') > -1) {
								item.link = item.attributes.URL;
							} else {
								item.link = jasTools.base.rootPath + '/' + item.attributes.URL;
							}
						}
						item.subs = item.children;
						if (item.subs) {
							switcher(item.subs);
						}
					})
				}

			};
			switcher(_aMenu);
			return _aMenu;
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
				var aTab = this._createTabsArr([index], this.items);
				this.tabs.push(aTab[0]);
			}
			this.currentTap = index;
		},
		removeTab: function (targetName) {
			var tabs = this.tabs;
			var activeName = this.currentTap;
			//如果当前显示的tab页被删除，更改当前显示的tab页为下一页
			if (activeName === targetName) {
				tabs.forEach(function (tab, index) {
					if (tab.name === targetName) {
						var nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}
			//设定当前显示的tab页
			this.currentTap = activeName;
			//在原数组中删除这个要被删除的tab
			this.tabs = tabs.filter(function (tab) {
				return tab.name !== targetName;
			})
		},
		_getMenuInfoByIndex: function (index, aMenu) {
			var _icon = '';
			var _title = '';
			var _closable = true;
			var _link = '';
			var isGetResult = false;

			var getTitle = function (index, aMenu) {
				for (var i = 0; i < aMenu.length; i++) {
					var item = aMenu[i];

					if (item.subs) { //如果有子集递归处理

						if (!isGetResult) {
							_icon = item.icon;
							_title = item.title;
							getTitle(index, item.subs);
						}
					} else {
						if (index === item.index) {
							isGetResult = true;
							_icon = item.icon;
							_title = item.title;
							_link = item.link;
							_closable = item.closable !== false ? true : false;
							return;
						}
					}
				}
			};
			getTitle(index, aMenu);
			return {
				icon: _icon,
				title: _title,
				closable: _closable,
				link: _link || '',
			}
		},
		_setWindowResizeEventToCloseMenu: function () {
			var that = this;
			window.addEventListener('resize', function () {
				if (document.body.clientWidth < 900 && that.isExpend) {
					that.isExpend = false;
				}
			});
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
		_createTabsArr: function (aIndex, aMenu) {
			var that = this;

			return aIndex.map(function (index) {
				var info = that._getMenuInfoByIndex(index, aMenu);

				return {
					title: info.title,
					name: index,
					link: info.link,
					icon: info.icon,
					closable: info.closable
				}
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
		changeLayout: function () {
			this.panelLayout = (this.panelLayout == 'horizontal') ? 'vertical' : 'horizontal';

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
		paneresize: function () {
			console.log(ConfigOfHome.mapIframeSrc);
			!this.gisUrl && (this.gisUrl = ConfigOfHome.mapIframeSrc);
		},
		statuschanged: function (val) {
			if (val) {
				console.log(ConfigOfHome.mapIframeSrc);
				!this.gisUrl && (this.gisUrl = ConfigOfHome.mapIframeSrc);
			}
		},
	},
})