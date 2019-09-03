/** 
 * @file
 * @author  xxx
 * @version 1.0 
 * @desc  查看用户信息页面js
 * @date  2012-08-30 上午17:46:07 
 * @last modified by lizz
 * @last modified time  2017-08-17
 */

var pkfield="";

/**
 * @desc 初始化
 */
$(document).ready(function(){
	pkfield=getParamter("id");
	getUserById(pkfield);
	//加载数据变更记录
	addBusinessHistoryRecords(pkfield,"histroryRecordContainer");
});
/**jdbc/commonData/user/get.do
 * @desc 获取用户信息url: 
 */
/**
 * 根据用户id获取用户信息
 * @returns
 */
function getUserById(pkfield){
	$.ajax({
		url: rootPath+"jdbc/commonData/user/get.do",//调用新增接口
		data :{"oid" : pkfield},
		type : 'GET',
		dataType:"json",
		success : function(data) {
			loadData(data.data);
		},
		error : function(result) {
			top.showAlert(getLanguageValue("error"), getLanguageValue("queryError"), 'info');
		}
	});
}


/**
 * @desc 载入数据
 */
function loadData(data) {	
	$("#loginName").html(data.loginName);
	$("#userName").html(data.userName);
	$("#pass").html(data.pass);	
	$("#phone").html(data.phone);
	$("#email").html(data.email);
	$("#passwordExpiredDate").html(data.passwordExpiredDate);
	$("#description").html(data.description);
}

/**
 * @desc 关闭窗口
 */
function closeUser(){
	top. closeDlg("viewUserIframe");
}