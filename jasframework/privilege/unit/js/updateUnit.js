var isroot=getParamter("isroot");
	
var jso;
var parentEventid = "";
var oid = getParamter("eventID");	
var unitFormID="updateUnit";
	
/**
 * 初始化
 */
$(document).ready(function(){
	pkfield=getParamter("id");
	getUnitById();
});

/**
 * 根据用户id获取用户信息
 * @returns
 */
function getUnitById(){
	$.ajax({
		url: rootPath+"jdbc/commonData/unit/get.do",//调用新增接口
		data :{"oid" : oid},
		type : 'GET',
		dataType:"json",
		success : function(data) {
			
			putValue(data);
			
			$("#unitId").combotree({
				url: rootPath+'jasframework/privilege/unit/getLeftTree.do'
			});
			
			$('#unitId').combotree('setValue', data.data.unitId);
			
			var item = data.data;
			
			if(item.parentId){
				parenteventid = item.parentId
			 	if( parenteventid != ""){
					$("#parentId").combotree({
						url: addTokenForUrl(rootPath+'jasframework/privilege/unit/getLeftTree.do?isroot='+isroot),
						panelHeight:235,
						onSelect:function(node){
								var uniteventid=$("#oid").val();
								if(node.id==uniteventid){
									alert("上级部门不能为本部门");
									var unittree=$('#parentId').combotree("tree");
									var parentnone=unittree.tree("getParent",unittree.tree("getSelected").target);
									console.log(parentnone)
									$('#parentId').combotree("setValue",parentnone.id);
								}
						}
					});
					$('#parentId').combotree('setValue', parenteventid);
					if("true"==isroot){
						$("#parentId").combotree("disable");
					}
				 }else{
					$("#parentId").attr("disabled", "disabled");
				} 
			}
			$('#unitType').combobox('setValue', data.data.unitType);
			$('#editgroups').form('load',jso);
			setComboObjWidth('parentId',0.3,'combotree');
			setComboObjWidth('unitType',0.3,'combobox');
		},
		error : function(result) {
			top.showAlert(getLanguageValue("error"), getLanguageValue("queryError"), 'info');
		}
	});
}
		
/**
 * 描述：重新加载数据
 * @param shortUrl 重新加载数据的页面
 * @param elementId 权限树的id
 */
function reloadData(shortUrl, elementId){
	var fra= parent.$("iframe");
	for(var i=0; i<fra.length;i++) {
		if(fra[i].src.indexOf(shortUrl) != -1) {
			fra[i].contentWindow.$(elementId).tree("reload");
			closeUnit();
			break;
		}
	}
	
}
/**
 * 描述：修改部门
 */
function updateUnit(){
	var name = $("#unitName").val();
	var unitCode = $("#unitCode").val();
	var parentEventid = $("#parentId").combotree("getValue");
	var unittree=$("#parentId").combotree("tree");
	var unitobj=unittree.tree("find",oid);
	var childrenunit=unittree.tree("getChildren",unitobj.target);
	var bool=false;
	$.each(childrenunit,function(i,n){
		if(parentEventid==n.id){
			top.showAlert(getLanguageValue("tip"),"上级部门不能为自己的子部门",'info');
                bool=true;
		}
	});
	if(bool){
		return ;
	}
	//检验部门是否存在
	console.log(name)
	$.ajax({
		type: "POST",
		url: rootPath+'jdbc/commonData/unit/update.do',
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify($('#updateUnit').serializeToJson()),
		success: function (result) {
			enableButtion("savebutton");
			if(result.status==1){
       		 top.showAlert("提示", "保存成功", 'info', function () {
                    reloadData('queryUnit.htm', '#tt');
                });
			}else if(result.code == "400") {
				top.showAlert("提示", "保存失败", 'error');
				
			}else{
				top.showAlert("提示", result.msg, 'info');
			}
		}
	});
}	
/**
 * 描述：关闭窗口
 */
function closeUnit(){
	top. closeDlg("saveiframe");
}

function putValue(json) {
	$("#oid").val(json.data.oid);
	$("#unitName").val(json.data.unitName);
	$("#unitCode").val(json.data.unitCode);	
	$("#ordernum").val(json.data.orderNum);	
	$("#phone").val(json.data.phone);	
	$("#address").val(json.data.address);	
	$("#description").val(json.data.description);	
}