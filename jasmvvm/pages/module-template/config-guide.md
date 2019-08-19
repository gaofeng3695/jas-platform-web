## 基础业务模板配置指导

### 一、是什么
- 用来展示基础业务（增、删、改、查）的前端模板，
- 可实现条件搜索、列表展示、详情查看、新增条目、编辑条目、删除条目五项基础功能



### 二、开始使用

1. 后端开发相关的接口，其传输格式需要与前端模板相匹配

2. 在config文件夹内新建配置文件，按照规定编辑配置

3. 在菜单中配置页面url，在pageCode参数内输入配置文件的名称，例：

   ```
   jasmvvm/pages/module-template/base-template/base-template.html?pageCode=person
   ```



###  三、配置说明

#### 1. 配置参数

参照config下的person.js文件进行配置

#### 2. 输入框的类型支持

'select','multiSelect','cascader','input','number','date'

单选框、多选框、级联单选框、文本框、数字框、日期框

#### 3. 输入验证

isRequired：是否必填

 rules：elementUI的验证规则，参照elementUI官方文档

max ：数字类型的最大值验证

precision ：数字类型的小数点位数验证

#### 4. 选择框的配置

requestParams：阈值接口中额外的请求参数

childSelect ：级联子集字段的集合

childUrl ：级联子集字段的阈值接口的集合



### 四、其他

1. 【提问】前端模板不满足业务需求，怎么办？

   答：在module-template文件夹下，复制base-template模板文件夹，按照业务需求在复制的文件夹内修改模板，保持原模板不变

2. 【提问】需要更改模板中的通用组件，怎么办？

   答：在module-template文件夹下的components内，新建组件文件，复制通用组件中的相关组件进行修改，然后在新建的模板中进行引用

