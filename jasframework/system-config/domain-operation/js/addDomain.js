var oid = "";
$(function() {
    oid = getParamter("oid");
    loadData();
});


/**
 * #desc 描述：初始化数据
 */
function loadData() {
		if (oid != null && oid != "" ) {
			$.ajax({
				url : rootPath+"hibernate/commonData/domain/get.do",
				data :{"oid" : oid},
				type : 'POST',
				dataType:"json",
				success : function(data) {
					var jsonData = data.data;
                    $("#domainForm").form('load', jsonData);
				},
				error : function(result) {
					top.showAlert(getLanguageValue("tip"), getLanguageValue("queryError"), 'info');
				}
			});
		} 
}


/**
 * @desc 关闭添加页面
 */
function closePanel() {
	top. closeDlg("saveiframe");
}

/**
 * @desc 添加
 */
function save() {
	disableButtion("saveButton");
	var url = "";
	var validateResault = $('#domainForm').form("validate");
	var formData = $("#domainForm").serializeToJson();
	if(oid != "" && oid != null){
		formData.oid=oid;
		url = rootPath+"/hibernate/commonData/domain/update.do";
	}else{
		url = rootPath+"/hibernate/commonData/domain/save.do";
	}
	var fromData = JSON.stringify(formData);//获取表单中的json,
	
	if(validateResault == false){
		top.showAlert(getLanguageValue("tip"), getLanguageValue("必填项不能为空"), 'info');
		enableButtion("saveButton");
		return validateResault;
	}else{
		$.ajax({
			url: url,
		    method: "post",
		    contentType: "application/json;charset=utf-8",
		    dataType: "json",
		    data:fromData,
		    success: function(data){
				if(data.status==1){
					top.showAlert(getLanguageValue("tip"), getLanguageValue("savesuccess"), 'info', function() {
						//重新加载表格数据
						reloadData('domain-operation.html', '#dg');
						//关闭弹出框
					    closePanel();
					});
				} else {
					top.showAlert(getLanguageValue("tip"), data.msg, 'error');
					enableButtion("saveButton");
				}
		    }
		 });
	}
}
