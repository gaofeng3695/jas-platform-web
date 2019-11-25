//初始化
$(function() {
	$("#dlg").panel("open");
	loadData();
});

/**
 * 描述：关闭查看页面
 */
function closeDomain() {
	top. closeDlg("view");
}
/**
 * 描述：初始化数据
 */
function loadData() {
	var oid=getParamter("oid");
	$.getJSON(rootPath+"hibernate/commonData/domain/get.do?oid="+oid,
	function(data){
		var sDataFilted = filterXSS(JSON.stringify(data.data));
		var oDataFilted = JSON.parse(sDataFilted);
		putValue(oDataFilted);
	});
}
/**
 * 描述：显示数据
 * @param obj 数据
 */
function putValue(obj) {
	$("#domainName").html(obj.domainName);
	$("#codeId").html(obj.codeId);
	$("#codeName").html(obj.codeName);
	$("#parentCodeId").html(obj.parentCodeId);
	$("#ordinal").html(obj.ordinal);
}
