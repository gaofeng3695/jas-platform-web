/**
 * 方法描述：修改文档基本信息
 */
function updateFile(){
		var url = rootPath+'jasdoc/folder/doccenter/updateDoc.do';
 		var fileclassifys = $("#classify").combotree('getValues');
 		var fileclassify = "";
 		if( fileclassifys != null && fileclassifys.length > 0 ){
 			for( var  j = 0 ; j < fileclassifys.length ; j ++ ){
 				if( j != fileclassifys.length-1 ){
 					fileclassify+=fileclassifys[j]+",";
 				}else{
 					fileclassify+=fileclassifys[j];
 				}
 			}
 		}
 		$("#fileclassify").val(fileclassify);
 		$('#editfilefrom').form('submit', {
		   	url: url+"?token="+localStorage.getItem("token"),
 			onSubmit: function(){
				return $(this).form('validate');
 			},
		   	success: function(check){
	     		if (check.error=='-1'){
					$.messager.alert('错误',check.message,'error');
				} else{
					$.messager.alert('提示',check.message,'ok');
					parent.reloadDataTree(null,0);
					closeFile();
				}
			},
		   	dataType:"json"
		});

	}
	function closeFile(){
		parent.closeDlg('updateFile');
	}

	/**
	 *  方法描述：回显文档基本信息
	 */
	$(function(){
		var eventid = getParamter("eventid");
		$.getJSON( rootPath+'jasdoc/folder/doccenter/getFileInfoById.do',{'docId':eventid},function(obj){
				$("#eventid").val(obj.eventid);
				$("#filename").val(obj.filename);
				$("#filename1").val(obj.filename);
				$("#fileno").val(obj.fileno);
				$("#keyword").val(obj.keyword);
				$("#summary").val(obj.summary);
				$("#remark").val(obj.remark);
			 $('#classify').combotree({
				    url: rootPath+"jasdoc/folder/classify/getDocClassifyTreeAsync.do",
					cascadeCheck:false,
					onBeforeExpand:function(node){
						url=rootPath+"/jasdoc/folder/classify/getChildrenClassify.do";
					 	$('#classify').combotree("tree").tree("options").url= url+"?folderId="+node.id;
						node.iconCls= 'icon-tree-classify-node-open';
						$('#classify').combotree("tree").tree('update', node);
					},onBeforeCollapse: function(node){
						node.iconCls= 'icon-tree-classify-node-close';
						$('#classify').combotree("tree").tree('update', node);
					},onLoadSuccess:function(){
						$.ajax({
							url:rootPath+"jasdoc/folder/classify/getFolderidByFileid.do?fileid="+obj.eventid,
							success:function(result){
								for(var i = 0; i<result.length; i++){
									var node1 = $("#classify").combotree("tree").tree('find',result[i].ID);
									if(node1){
										$("#classify").combotree("tree").tree('check',node1.target);
									}
								}
							},
							async:false,
							dataType:"json"
						});
					}
				});
		});
	});