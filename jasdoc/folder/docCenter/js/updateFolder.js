
var folderId = getParamter("folderId");
$(function(){
	$('#id').val(folderId);
	getFolderById(folderId);
});

function save(){
	$('#updateFolderForm').form('submit', {
		url : rootPath+"jasdoc/folder/doccenter/updateFolder.do?token="+localStorage.getItem("token"),
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(result) {
			result = JSON.parse(result);
			if (result.success==1) {
				$.messager.alert('提示',result.message, 'info',function(){
					var folderName = $("#foldername").val();
					var id = $("#id").val();
					parent.reloadDataTree({"name":folderName,"id":id},2);
					closeFolder();
				});
			}else{
				$.messager.alert('提示',result.message, 'info');
			}

		}
  });
}

/**
 * 方法描述：根据文件夹ID查询文件夹信息
 * @param folderId
 */
function getFolderById(folderId){
	$.ajax({
		url:rootPath+"jasdoc/folder/doccenter/getFolderById.do?folderId="+folderId,
		type:"POST",
		success:function(result){
			if(result!=null){
				$("#foldername").val(result.foldername);
				$("#description").val(result.description);
				$("#folderno").val(result.folderno);
				$("#hierarchy").val(result.hierarchy);
				$("#parentid").val(result.parentid);
				$("#foldertype").val(result.foldertype);
				if(result.foldertype != 1){
					document.getElementById("folderNoTr").style.display="none";
				}
			}
		}
	});
}

/**
 * 方法描述： 关闭界面
 */
function closeFolder(){
	parent.closeDlg('updateFolder');
}