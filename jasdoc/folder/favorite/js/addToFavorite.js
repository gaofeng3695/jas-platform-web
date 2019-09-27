var docIds = "";
var	fileNames = "";
var oldFolderId = "";


/**
 * 方法描述：加载收藏夹树
 */
function queryFavoriteTree() {
	var width = $("#fileNames").width()+3;
	$('#foldreeventid').combotree({
		width:width+"px",
		panelHeight:'auto',
		url:rootPath+"jasdoc/folder/favorite/queryFavoriteFolder.do",
		onBeforeExpand:function(node){
			url=rootPath+"jasdoc/folder/favorite/getChildren.do";
		 	$('#foldreeventid').combotree("tree").tree("options").url= url+"?folderId="+node.id;
		 	node.iconCls= 'icon-tree-favorite-node-open';
		 	$('#foldreeventid').combotree("tree").tree('update', node);
		},onBeforeCollapse: function(node){
			node.iconCls="icon-tree-favorite-node-close";
			$('#foldreeventid').combotree("tree").tree('update', node);
		},onLoadSuccess:function(node, data){
		}
	});
}

	$(function() {
		docIds = getParamter("eventids");
		fileNames = decodeURIComponent(decodeURIComponent(getParamter("filenames")));
		oldFolderId = getParamter("folderId");
		$("#fileNames").text(fileNames);

		queryFavoriteTree();
	});


	/**
	 * 方法描述： 保存收藏夹与文档的关系
	 *
	 */
	function save() {
		url =rootPath+"jasdoc/folder/favorite/addDocToFavorite.do";
		var folderId = $("#foldreeventid").combotree('getValue');
		if(folderId==""||folderId==null){
			$.messager.alert('提示',"请选择收藏夹",'info');
		}else{
			$.ajax({
				type : "POST",
				url : url,
				data : {
					"docIds" : docIds,
					"folderId" : folderId
				},
				success : function(result) {
					if (result.success=="1") {
						$.messager.alert('提示', result.message, 'info',function(){
							parent.reloadDataTree(null,0);
							closeFavorite();

						});

					} else {
						$.messager.alert('错误', result.message, result.error);
					}
				}
			});
	}
}

	/**
	 * 方法描述： 关闭界面
	 */
	function closeFavorite() {
		parent.closeDlg('favorite');
	}
