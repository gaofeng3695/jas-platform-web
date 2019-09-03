var pkfield="";
var userFormID = "userForm";
/**
 * 初始化
 */
$(document).ready(function(){
	pkfield=getParamter("id");
	getUserById();
});

/**
 * 根据用户id获取用户信息
 * @returns
 */
function getUserById(){
	$.ajax({
		url: rootPath+"jdbc/commonData/user/get.do",//调用新增接口
		data :{"oid" : pkfield},
		type : 'GET',
		dataType:"json",
		success : function(data) {
			$("#"+userFormID).form('load', data.data);
			$("#unitId").combotree({
				url: rootPath+'jasframework/privilege/unit/getLeftTree.do'
			});
			$('#unitId').combotree('setValue', data.data.unitId);
		},
		error : function(result) {
			top.showAlert(getLanguageValue("error"), getLanguageValue("queryError"), 'info');
		}
	});
}

/**
 * desc 加载数据初始数据
 */
function loadData(data){
	$("#loginName").val(data.loginName);
	$("#userName").val(data.userName);
	$("#phone").val(data.phone);
	$("#email").val(data.email);
	$("#passwordExpiredDate").val(data.passwordExpiredDate);
	$("#description").val(data.description);
}

/**
 * desc 关闭修改页面
 */
function closePanel() {
	top. closeDlg("editUserIframe");
}

/**
 * desc 重新加载数据
 * @param url 重新加载数据的页面
 * @param elementId datagridID
 */
function reloadData(url, elementId) {
	var fra = parent.$("iframe");
	for ( var i = 0; i < fra.length; i++) {
		if (fra[i].src.indexOf(url) != -1) {
			fra[i].contentWindow.$(elementId).datagrid("reload");
		}
	}
}

/**
 * desc 修改用户
 */
function updateUser() {
	disableButtion("saveButton");
	var validateResault=$("#"+userFormID).form('validate');
	if(validateResault == false){
		top.showAlert(getLanguageValue("tip"), getLanguageValue("formVailidateFailed"), 'info',function(){
			enableButtion("saveButton");
		});
		
		return validateResault;
	}else{
		$.ajax({
			url: rootPath+"jdbc/commonData/user/update.do",//调用新增接口
		    method: "post",
		    contentType: "application/json;charset=utf-8",
		    dataType: "json",
		    data:JSON.stringify($("#"+userFormID).serializeToJson()),//获取表单中的json,
		    success: function(data){
				if(data.status==1){
					top.showAlert(getLanguageValue("tip"), getLanguageValue("updatesuccess"), 'info', function() {
						//关闭弹出框
						reloadData('queryUser.htm','#10060201');
					    closePanel();
					});
				} else {
					top.showAlert(getLanguageValue("error"),getLanguageValue("user.userexist"), 'error');
					enableButtion("saveButton");
				}
		    }
		 });
	}
}

/**
 * @desc 关闭修改页面
 */
function closeUser(){
	top. closeDlg("editUserIframe");
}
		