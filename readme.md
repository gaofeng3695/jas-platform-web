## jasmvvm 前端框架


[TOC]

### 一、特性介绍

1. 基于【Vue 2.5】(<https://cn.vuejs.org/v2/guide/>)前端 mvvm 框架
2. 采用【ELementUi】前端 UI 框架
3. 采用【FontAwesome】前端 font-icon 库
4. 以【iframe】方式构建的多页面管理系统
5. 新增 iframe 页面的【路由】功能
6. 集成【文档管理】、【权限管理】、【日常办公】模块
7. 集成【地图模块】，支持GIS地图、高德地图
8. 集成【基础业务模板模块】，以配置的方式快速构建前端增删改查页面
9. 实现 通用方法【jas-tools】、通用组件【jas-components】 的封装



### 二、启动项目

1. 作为前后端分离项目开发

   下载项目，安装依赖，配置代理，启动项目

   git clone > npm i > bs-config.js > npm start

2. 集成到后端项目中开发

   复制 jasmvvm 文件夹到后端项目相关目录，配置起始页，启动项目



### 三、文件目录结构

    ├── jasmvvm							项目根文件夹
    │   ├── common							公共文件夹
    │   │   ├── components					 	公共组件文件夹
    │   │   │   └── jas-components.js
    │   │   ├── css							 	公共css文件夹
    │   │   │   └── main.css
    │   │   ├── images							图片文件夹
    │   │   └── js							 	公共js文件夹
    │   │       └── jas-tools.js
    │   ├── lib								第三方库
    │   │   ├── vue					 			vue框架
    │   │   ├── jquery					 		jquery库
    │   │   ├── element-ui						 UI库
    │   │   ├── font-awesome-4.7.0				 字体库
    │   │   └── ...
    │   └── pages							页面文件夹
    │       ├── group-demos					 	框架demo分组
    │       ├── group-...					 	项目私有分组
    │       ├── module-gdmap					高德地图模块
    │       ├── module-gis					 	gis模块
    │       ├── module-jasdoc					文档管理模块
    │       ├── module-privilege   				 权限管理模块
    │       ├── module-template   				 基础模板模块
    │       ├── module-pdf-viewer				pdf查看器模块
    │       ├── page-index					 	主页文件夹
    │       ├── page-login					 	登录文件夹
    │       ├── page-passwword					忘记密码件文件夹
    │       └── page-timeout					超时文件夹
    ├── .gitignore						git忽略文件配置
    ├── bs-config.js					前端服务器配置
    ├── package.json	 				npm包配置
    └── readme.md						介绍文档



### 四、文件创建规则

#### 1.  页面分类

1. module

   前端框架提供的功能模块页面，例如，文档管理模块、权限管理模块、地图模块、pdf预览模块

2. page

   项目中单独的页面，例如，主页，登录页，忘记密码页，登录超时页

3. group

   项目中相似功能的页面，通常作为菜单中的一个大项分类，例如，demo分组

   group文件夹不建议多层嵌套，建议为多层嵌套的菜单分组建立同级group文件夹

4. dialogs

   作为html页面的弹出框页面，以dialogs文件夹为容器置于html页面同级目录

#### 2.  页面引入

整个应用由多个html页面集成，集成方式分为以下三种：

1. ###### 浏览器地址栏直接跳转的方式

   【强制】绝对路径跳转，登录页和主页之间的跳转

2. ###### index页面中，tab页内嵌frame的方式

   【强制】绝对路径引入，在权限界面配置引入路径，无需在代码中书写

3. ###### index页面中，dialog框内嵌frame的方式

   【强制】绝对路径引入，调用父页面的dialog方法

#### 3.  资源创建与引入

1. ###### 页面私有资源

   - 图片统一置于./common/images 下
   - 私有 js、css、components 写于 html 内的相关位置，或以单文件置于 html 同级目录下

2.  ###### 项目共有资源

   - 图片统一置于./common/images 下
   - 公共js方法，写于 ./common/js/jas-tools.js 内的指定位置，或以单文件置于 ./common/js 下
   - 公共css资源，写于 ./common/css/main.css内的指定位置，或以单文件置于 ./common/css 下
   - 公共component，写于 ./common/components/jas-components.js 内的指定位置，或以单文件置于 ./common/components 下

3. ###### 第三方资源

   - 以模块的方式置于 ./lib 下



### 五、页面代码结构

![](http://wx3.sinaimg.cn/large/0062G6WRly1fzfh7h6dnkj30wm0o6ad6.jpg )



### 六、通用资源介绍

1. ###### main.css 通用样式

   ```js
   * 1. basic-css 项目基础样式
   * 2. element-css-fix elementUi优化样式
   * 3. 3rd-part-module-css-fix 第三方组件样式
   * 4. jas-compoennts-css 通用组件样式
   * 5. customer-main-css 项目私有公共样式
   ```

2. ###### jas-tools.js 通用方法

   ```js
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
   ```

3. ###### jas-components.js

   ```js
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

   ```



### 七、demo示例

#### 1.  我的收藏夹（文档管理）

1. ###### vue的使用

   - 文档：[官方文档](https://cn.vuejs.org/v2/guide/)
   - 特性：数据驱动，双向绑定
   - 模板语法：v-bind（:）、v-model、v-if、v-show、v-on（@）、{{  }}
   - 配置项：el、data、computed、watch、mounted、methods

2. ###### elementUi的使用

   - 文档：[官方文档](http://element-cn.eleme.io/#/zh-CN/component)
   - 举例：el-tree、el-breadcrumb 、el-button 、el-table 、el-pagination 

3. ###### 自定义组件的使用
   - 构成：独立的vue实例，包含html模板
   - 通信：属性传入，事件触发
   - 举例：jas-two-panel-resizer 、jas-base-module-title 
4. ###### ajax请求
   - 方法：jasTools.ajax.get（post、postForm、downloadByIframe ）
   - 特性：已封装错误回调，可自定义
   - 状态：v-loading标识请求状态
   - 提示：top.Vue.prototype.$message 成功、错误提示
5. ###### 对话框
   - 方法：top.jasTools.dialog.show（close） 
   - 特性：支持固定和百分比大小，按钮跟随页面
   - 参数：大小、标题、地址、回调

#### 2.  基础业务模板

   - 详见模板文件夹下的配置说明










