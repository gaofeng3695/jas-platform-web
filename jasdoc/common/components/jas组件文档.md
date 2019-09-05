## jas组件文档

[TOC]

### 一 、通用组件

定义：没有任何业务关联的组件

#### 模态框组件 jas-iframe-dialog

打开iframe模态框，已封装到公共方法里面

> 代码

```html
<script>
    // 直接调用封装好的通用方法
    top.jasTools.dialog.show({
        title: '增加',
        width: '60%',
        height: '60%',
        src: './pages/template/dialogs/addTemplate.html?menuCode=' + that.menuCode,
        cbForClose: function () {
            that.refresh();
        }
    });
</script>
```

> 属性

|   参数    |              说明              |  类型   | 可选值 | 默认值 |
| :-------: | :----------------------------: | :-----: | :----: | :----: |
|   width   | 模态框的宽度，支持百分比、像素 | String  | px、%  |  80%   |
|  height   | 模态框的高度，支持百分比、像素 | String  | px、%  |  80%   |
| iframeUrl |           iframe路径           | String  |        |        |
|  visible  |            是否可见            | Boolean |        | false  |
|   title   |          模态框的标题          | String  |        |  提示  |

> 事件

| 事件名称 |         说明         | 回调参数 |
| :------: | :------------------: | :------: |
|  close   | 模态框被关闭后的钩子 |          |



#### 分组标题栏 jas-base-group-title

可用于增加、详情等页面中的分组标题栏

> 代码

```html
<body>
    <jas-base-group-title name="基础信息"></jas-base-group-title>
</body>
```

> 属性

| 参数 |   说明   |  类型  | 可选值 |  默认值  |
| :--: | :------: | :----: | :----: | :------: |
| name | 分组名称 | string |        | 表单分组 |



#### 详情表格组件 jas-detail-table

用于展示详情的表格组件，使用window.onresize方法实现响应式

> 代码

```html
<body>
    <jas-detail-table :titles="detailTitle" :detail="detail" />
</body>
<script>
    {
        detailTitle: [{
            name: '项目名称',
            field: 'projectName',
        }],
        detail:{
            projectName:'xxx'
        }
    }
</script>
```

> 属性

|  参数  |                             说明                             | 类型  | 可选值 | 默认值 |
| :----: | :----------------------------------------------------------: | :---: | :----: | :----: |
| titles | 详情的各个项的数组，例[{name:'xxx', field :'xxx'}]，新增formatter配置项详见element文档 | array |        |        |
| detail |                           详情对象                           |  obj  |        |        |



#### 两栏分隔组件 jas-two-panel-resizer

将div分成上下或者左右两栏，点击收缩按钮可收缩其中一栏

> 代码

```html
<body>
    <jas-two-panel-resizer layout="horizontal" length="40%">
    	<div slot="closePanel"></div>
        <div slot="mainPanel"></div>
    </jas-two-panel-resizer>
</body>
```

> 属性

|  参数  |                   说明                   |  类型  |        可选值        | 默认值 |
| :----: | :--------------------------------------: | :----: | :------------------: | :----: |
| layout | 分栏类型：上下 horizontal、左右 vertical | string | horizontal、vertical |        |
| length | 第一栏的长度：上下（高度）、左右（宽度） | string |        px 、%        |        |

> 事件

|  事件名称  |         说明         | 回调参数 |
| :--------: | :------------------: | :------: |
| paneresize | 调整分栏大小时的钩子 |          |

> 插槽

|    名称    |             说明             |
| :--------: | :--------------------------: |
| closePanel | 第一栏，也就是可关闭的那一栏 |
| mainPanel  |     第二栏，也就是显示栏     |

#### 



### 二 、结构组件

#### 搜索和列表界面结构 jas-list-wrapper

搜索和列表展示界面的结构组件

> 代码

```html
<body>
    <jas-list-wrapper>
        <div slot="search"></div>
        <div slot="list"></div>
    </jas-list-wrapper>
</body>

```

> 插槽

|  名称  |           说明           |
| :----: | :----------------------: |
| search |         搜索区域         |
|  list  | 按钮、表格、分页控制区域 |

#### 模态框界面内容和按钮结构 jas-dialog-wrapper

在模态框内，用于分隔内容和按钮的结构组件

> 代码

```html
<body>
    <jas-dialog-wrapper>
      <div></div> 
      <div slot="footer">
        <el-button size="small" @click="cancel()">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </div>
    </jas-dialog-wrapper>
</body>
```

> 插槽

|  名称  |     说明     |
| :----: | :----------: |
|  默认  |   内容区域   |
| footer | 底部按钮区域 |



### 三、业务组件

定义：业务相关的组件

#### 搜索栏组件 jas-search-for-list 

搜索栏组件

> 代码

```html
<body>
	<jas-search-for-list 
		slot="search" 
		:form="topSearch" 
		:fields="fields" 
		:fields-config="fieldsConfig" 
		@search="searchList"
	></jas-search-for-list>
</body>
<script>

</script>
```

> 属性

|     参数      |                        说明                        | 类型  | 可选值 | 默认值 |
| :-----------: | :------------------------------------------------: | :---: | :----: | :----: |
|    fields     | 搜索的各个项的数组，例[{name:'xxx', field :'xxx'}] | array |        |        |
|     form      |                      请求对象                      |  obj  |        |        |
| fields-config |       字段的类型配置，详见jas-form-items组件       |  obj  |        |        |


> 事件

| 事件名称 |                           说明                           |         回调参数         |
| :------: | :------------------------------------------------------: | :----------------------: |
| search | 触发搜索的钩子 |  |

#### 列表组件 jas-table-for-list

1. 列表组件，包含顶部操作按钮（新增，导入，导出），表格，分页控件
2. 内部集成了权限功能，使用权限接口或权限数组控制按钮显隐

> 代码

```html
<body>
    <jas-table-for-list ref="table" slot="list" :fields="tableFields" :form="topSearch" search-path="/jdbc/commonData/medianStake/getPage.do" :add-url="addUrl" :detail-url="detailUrl"></jas-table-for-list>
</body>
<script>

</script>
```

> 属性

|      参数      |                             说明                             |     类型     | 可选值 | 默认值 |
| :------------: | :----------------------------------------------------------: | :----------: | :----: | :----: |
|     fields     | 表格的各个项的数组，例[{name:'xxx', field :'xxx'}]，新增formatter配置项详见element文档 |    array     |        |        |
|      form      |                      表格请求的传参对象                      |     obj      |        |        |
|  search-path   |                      刷新列表的请求路径                      |    string    |        |        |
|  delete-path   |                     删除某一项的请求路径                     |    string    |        |        |
|    add-url     |                  打开添加和编辑模态框的路径                  |    string    |        |        |
|   detail-url   |                     打开详情模态框的路径                     |    string    |        |        |
| privilege-code | 1.按钮权限编码，为空则拥有所有权限 <br />2.权限数组['bt_add','bt_update','bt_delete',<br />'bt_select','bt_export','bt_import','bt_position '] | string/array |        |        |
|  templateCode  |                   导入导出组件用的模板编号                   |    string    |        |        |
|   className    |                  导入导出组件用的后台接口类                  |    string    |        |        |
|    selfBtns    |                本身按钮的显隐，可选['locate']                |    array     |        |        |

> 方法

|     方法名     |      说明      | 参数 |
| :------------: | :------------: | :--: |
| search   | 刷新列表的方法 |      |
> 事件

| 事件名称 |                           说明                           |         回调参数         |
| :------: | :------------------------------------------------------: | :----------------------: |
| locate  | 点击定位按钮的钩子 | itemObj |

#### 文件上传 jas-file-upload 

在新增编辑页面展示的文件管理组件，可进行上传删除操作

> 代码

```html
<body>
	<jas-file-upload ref="upload" @success="uploadSuccess"></jas-file-upload>
</body>
<script>
    this.$refs.upload.requestFile(this.oid); // 触发附件请求
    this.$refs.upload.uploadFile(this.oid); //触发上传附件
    uploadSuccess: function () { // 成功上传后的回调
        top.Vue.prototype.$message({
            type: 'success',
            message: !this.isEdit ? '保存成功' : '修改成功'
        });
        this.cancel(1);
    }
</script>
```
> 属性

|   参数    |               说明               |  类型  | 可选值 | 默认值 |
| :-------: | :------------------------------: | :----: | :----: | :----: |
|   limit   |           限制上传文件           | number |        |   5    |
| fileTypes | 文件的限制类型，文件后缀名的数组 | array  |        |   []   |

> 方法

|   方法名    |                            说明                             |           参数            |
| :---------: | :---------------------------------------------------------: | :-----------------------: |
| requestFile |  请求附件列表的方法，入参业务id，将业务相关的附件展示出来   | Function( bizId : String) |
| uploadFile  | 上传附件的方法，入参业务id，若没有附件会直接触发success事件 | Function( bizId : String) |

> 事件

| 事件名称 |                           说明                           |         回调参数         |
| :------: | :------------------------------------------------------: | :----------------------: |
| success  | 文件上传成功后的钩子，若无文件上传可直接被uploadFile触发 | response, file, fileList |





#### 文件列表 jas-file-list  

在详情界面展示的文件列表，包含预览和下载供功能

> 代码

```html
<body>
    <jas-file-list :biz-id="oid"></jas-file-list>
</body>
```
> 属性

| 参数  |    说明    |     类型     | 可选值 | 默认值 |
| :---: | :--------: | :----------: | :----: | :----: |
| bizId | 相关业务id | stringstring |        |        |



#### 导入导出按钮组  jas-import-export-btns  

位于表格上方的按钮组，执行导入、导出、下载模板功能

> 代码

```html
<body>
	<jas-import-export-btns 
		:isImport="privilege.join('').indexOf('bt_import')>-1"
		:isExport="privilege.join('').indexOf('bt_export')>-1"
		:form="searchTable" 
		:oids="oids" 
		:template-code="templateCode" 
		:class-name="className"
	></jas-import-export-btns>
</body>

```
> 属性

|     参数      |                  说明                  |  类型   | 可选值 | 默认值 |
| :-----------: | :------------------------------------: | :-----: | :----: | :----: |
|   isImport    |            是否拥有导入权限            | boolean |        |  true  |
|   isExport    |            是否拥有导出权限            | boolean |        |  true  |
|     form      |  列表查询的查询对象，用于导出全部接口  | object  |        |        |
|     oids      | 选中的条目的oids数组，用于导出已选接口 |  array  |        |   []   |
| template-code |         模板编号，用于导出接口         | string  |        |        |
|  class-name   |     后台用的class类，用于导出接口      | string  |        |        |

#### 表单项组件 jas-form-items  

在新增编辑页面展示的表单项组件

> 代码

```html
<body>
	<jas-form-items ref="mainForm" :form="form" :fields="fields" :fields-config="fieldsConfig"></jas-form-items>
</body>
<script>
	that.$refs['mainForm'].triggerFatherSelectsChange();
</script>
```
> 属性

|     参数     |                        说明                        | 类型  | 可选值 | 默认值 |
| :----------: | :------------------------------------------------: | :---: | :----: | :----: |
|   mainForm   |           需要发送给后台的表单value对象            |  obj  |        |        |
|    fields    | 表单的各个项的数组，例[{name:'xxx', field :'xxx'}] | array |        |        |
| fieldsConfig |              字段的类型配置，详见下表              |  obj  |        |        |

> 配置

|   配置项    |                          说明                          |  类型   |
| :---------: | :----------------------------------------------------: | :-----: |
|    type     |       字段类型，可选值[select,input,date,number]       | String  |
|   options   |            下拉选的选项，[key:',value:''}]             |  Array  |
|  optionUrl  |               下拉选的选项,后台请求接口                | String  |
| domainName  |             下拉选的选项,阈值表的阈值名称              | String  |
| childSelect |                  级联子级字段名的数组                  |  Array  |
|  childUrl   | 级联子级的选项接口的数组，index需要与childSelect相对应 |  Array  |
| isRequired  |                        是否必填                        | Boolean |
|  precision  |           数字输入框，精度（3: 小数位为3位）           | Number  |
|     max     |                   数字输入框，最大值                   | Number  |

> 方法

|           方法名           |                        说明                        |              参数               |
| :------------------------: | :------------------------------------------------: | :-----------------------------: |
| triggerFatherSelectsChange | 常用于编辑页面，手动触发级联父级下拉选的change事件 | Function( field: String) (可选) |


#### 子表单分组组件 jas-sub-form-group   

子表单的分组组件，可对整组进行添加、删除操作，跟接口强关联

> 代码

```html
<body>
	<jas-sub-form-group 
		group-name="缺陷信息" 
         :form-default="sonFormDefault" 
         :form-list="form.raySubList" 
         :fields="subFields" 
         :fields-config="sonFieldsConfig"
	></jas-sub-form-group></jas-form-items>
</body>
<script>
	that.$refs['mainForm'].triggerFatherSelectsChange();
</script>
```
> 属性

|     参数     |                        说明                        | 类型  | 可选值 | 默认值 |
| :----------: | :------------------------------------------------: | :---: | :----: | :----: |
|  form-list   |           需要发送给后台的表单value对象            | array |        |   []   |
|    fields    | 表单的各个项的数组，例[{name:'xxx', field :'xxx'}] | array |        |        |
| fieldsConfig |       字段的类型配置，详见jas-form-items组件       |  obj  |        |        |
|  group-name  |                      分组名称                      |       |        |        |
| form-default |           默认表单项对象，增加按钮会用到           |  obj  |        |        |

#### 子表单详情组件 jas-sub-detail-group    

> 用于展示子表的信息

```html
<body>
	<jas-sub-detail-group 
		group-name="缺陷信息" 
		:detail-list="detail.raySubList" 
		:fields="subFieldsArr"
	></jas-sub-detail-group>
</body>

```
> 属性

|    参数     |                             说明                             | 类型  | 可选值 | 默认值 |
| :---------: | :----------------------------------------------------------: | :---: | :----: | :----: |
| detail-list |                   需要展示的表单value对象                    | array |        |   []   |
|   fields    | 表单的各个项的数组，例[{name:'xxx', field :'xxx'}]，，新增formatter配置项详见element文档 | array |        |        |
| group-name  |                           分组名称                           |       |        |        |
