	/**
	 * 修改与新增
	 *
	 */


$(function(){
	var parentid=getParamter("parentid");
	var folderType = getParamter("folderType");
	var folderNo = getParamter("folderNo");
	$("#parentid").val(parentid);
	$("#foldertype").val(folderType);
	$("#folderno").val(folderNo);
	if(folderType != 1){
		document.getElementById("folderNoTr").style.display="none";
	}
});

function save() {
	debugger;
	alert("wqw")
		$('#addFolderForm').form('submit', {
			url :rootPath+ "jasdoc/folder/doccenter/createFolder.do?token="+localStorage.getItem("token"),
			onSubmit : function() {
				return $(this).form('validate');
			},
			success : function(data) {
				var result = eval('(' + data + ')');
				if (result.success=="1") {
					//刷新父页面，参数：返回值，操作类型（1：新增，2：修改）
					parent.reloadDataTree(result.data,1);
					closeFolder();
				} else {
					debugger;
					parent.showAlert('提示',result.message , 'info');
				}
			}
		});
	}
	/**
	 * 方法描述： 关闭界面
	 */
	function closeFolder(){
		parent.closeDlg('addFolder');
	}