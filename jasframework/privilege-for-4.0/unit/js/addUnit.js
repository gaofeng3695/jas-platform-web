//取到父部门id
var eventID =getParamter("parentid");;
//初始化
	$(function(){
		//初始化部门树
		$("#parentId").combotree({
			url: addTokenForUrl(rootPath+'jasframework/privilege/unit/getLeftTree.do')
		});
		//设置部门初始值
		$('#parentId').combotree('setValue', eventID);
		setComboObjWidth("parentId", 0.3, "combotree");
		setComboObjWidth("unitType", 0.3, "combobox");
	});
	
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
			}
		}
		closeUnit();
	}
	/**
	 * 描述：保存部门的方法
	 */
	function saveUnit() {
		 $.ajax({
             type: "POST",
             url: rootPath + 'jdbc/commonData/unit/save.do',
             contentType: "application/json;charset=utf-8",
             data: JSON.stringify($('#addunit').serializeToJson()),
             success: function (data) {
            	if(data.status==1){
            		 top.showAlert("提示", "保存成功", 'info', function () {
                         reloadData('queryUnit.htm', '#tt');
                     });
     			}else if(data.code == "400") {
     				top.showAlert("提示", "保存失败", 'error');
     				
     			}else{
     				top.showAlert("提示", data.msg, 'info');
     				
     			}
             }
         })
	}
		
	/**
	 * 描述：关闭添加窗口
	 */
	function closeUnit(){
		top.closeDlg("saveiframe");
	}
		
	/**
	 * 描述：扩展校验方法的规则
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		verifyName : {//判断分段逻辑号 是否重复
		validator : function(value) {
		var response = $.ajax({
		url :  "../groupmanagement.do?method=verifyName",
		dataType : "json",
		data : {
		groupname : value
		},
		async : false,
		cache : false,
		type : 'POST'
		}).responseText;
		var b = $.parseJSON(response);
		if(b.space== 9){
			 this.message =getLanguageValue("unit.namecannotspaces");
			 return false;
		}
		if(b.success==5){
			 return true;
		} else{
			 this.message =getLanguageValue('unit.namerepeated');
			 return false;
		}
		},
		message : null
		}
	});