/*
 * @Description:
 * @Author: dx
 * @Date: 2020-04-23 09:24:33
 * @LastEditTime: 2020-04-24 11:49:22
 * @LastEditors: dx
 */
var formRules = [{
    "id": "1",
    "name": "只能输入中文",
    "rule": "new RegExp('^[\u4e00-\u9fa5]{0,}$')",
    "message": "只能输入中文"
}, {
    "id": "2",
    "name": "只能输入英文和数字",
    "rule": "new RegExp('^[A-Za-z0-9]+$')",
    "message": "只能输入英文和数字"
}, {
    "id": "3",
    "name": "中文、英文、数字包括下划线",
    "rule": "new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_]+$')",
    "message": "中文、英文、数字包括下划线"
}, {
    "id": "4",
    "name": "只能输入数字",
    "rule": "new RegExp('^[0-9]*$')",
    "message": "只能输入数字"
}, {
    "id": "5",
    "name": "只能输入数字",
    "rule": "new RegExp('^[0-9]*$')",
    "message": "只能输入数字"
}, {
    "id": "6",
    "name": "只能输入日期",
    "rule": "new RegExp('^[1-2]\\d{3}-(0?[1-9]||1[0-2])-(0?[1-9]||[1-2][1-9]||3[0-1])$')",
    "message": "只能输入数字"
}]


var configSet = {
    F000010: {
        key: "MARKER_TYPE_ID", //表示哪一个选项触发
        selectVal: "MT_04", //表示下拉框选择的值
        childKey: "TEST_CYCLE", //key下拉选为 selectVal的时候 childKey为必填项
        childRule: {
            message: "测试周期(日/次)",
            required: true
        }
    }
}