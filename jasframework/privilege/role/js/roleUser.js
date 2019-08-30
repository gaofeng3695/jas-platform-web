function closePanel(){
		top. closeDlg("config");
	}
/**
 * 描述：重新加载数据
 * @param url 重新加载数据的页面
 * @param elementId datagridID
 */
	function reloadData(url, elementId){
		var fra= parent.$("iframe");
		for(var i=0; i<fra.length;i++) {
			if(fra[i].src.indexOf(url) != -1) {
				fra[i].contentWindow.$(elementId).datagrid("reload");
			}
		}
	}
	
	
	/**
	 * 描述：提交保存
	 */
//	function save(){
//		$('#savePcUser').form('submit',{
//			url: url,//"createPcUser.do",
//			onSubmit: function(){
//				return $(this).form('validate');
//			},
//			success: function(result){
//				var result = eval('('+result+')');
//				if (result.success){
//					reloadData('usermanagement.htm','#10060201');
//					closePanel();
//					//parent.$("iframe")[2].contentWindow.$("#dg").datagrid("reload");
//					//fra[2].src=fra[2].src;
//					
//				} else {
//					top.showAlert(getLanguageValue("error"),result.msg,'error');
//				}
//			}
//		});
//	}
	var roleId;
	/**
	 * 描述：设置角色
	 */
	function userRoleConfig(){
		roleId = getParamter("roleId");
		var param = {"roleOid":roleId};
		var postUrl = rootPath+"jasframework/privilege/role/getUserOfRole.do";
		$.ajax({
			url : postUrl,
			data :JSON.stringify(param),
			type : 'POST',
			dataType:"json",
			contentType: "application/json",
			success : function(result) {
				if (result.success){
					$('#dlg_user').dialog('open').dialog('setTitle',getLanguageValue("user.setrole"));
					$("#hasUser").html("");
					$("#noHasUser").html("");
					var noHasUserHtml= "";
					for(var i=0;i<result.noHasUser.length;i++){
						var user = result.noHasUser[i];
						noHasUserHtml += "<option value=\""+user.oid+"\">"+user.userName+"</option>";
					}
					$("#noHasUser").append(noHasUserHtml);
					
					var hasUserHtml = "";
					for(var i=0;i<result.hasUser.length;i++){
						var user = result.hasUser[i];
						hasUserHtml += "<option value=\""+user.oid+"\">"+user.userName+"</option>";
					}
					$("#hasUser").append(hasUserHtml);
				} else {
					top.showAlert(getLanguageValue("error"),result.msg,'error');
					return;
				}
			}
		});
//		$.post(postUrl,{"roleOid":roleId},function(result){
//			if (result.success){
//				$('#dlg_user').dialog('open').dialog('setTitle',getLanguageValue("user.setrole"));
//				$("#hasUser").html("");
//				$("#noHasUser").html("");
//				var noHasUserHtml= "";
//				for(var i=0;i<result.noHasUser.length;i++){
//					var user = result.noHasUser[i];
//					noHasUserHtml += "<option value=\""+user.oid+"\">"+user.userName+"</option>";
//				}
//				$("#noHasUser").append(noHasUserHtml);
//				
//				var hasUserHtml = "";
//				for(var i=0;i<result.hasUser.length;i++){
//					var user = result.hasUser[i];
//					hasUserHtml += "<option value=\""+user.oid+"\">"+user.userName+"</option>";
//				}
//				$("#hasUser").append(hasUserHtml);
//			} else {
//				top.showAlert(getLanguageValue("error"),result.msg,'error');
//				return;
//			}
//		},'json');
	}
		/**
		 * 描述：转移目标
		 * @param a 角色
		 * @param b 角色
		 */
		function move(a,b){
            if(a.selectedIndex == -1){
               return;
            }
            for(var i=a.length-1;i>=0;i--){
                if (a[i].selected){
                	b.options.add(new Option(a[i].innerHTML,a[i].value));
                	a.remove(i);
                }
            }
        }
		
		/**
		 * 描述：保存角色与用户关系
		 */
		function saveUserOfRole(){
			disableButtion("saveButton");
			var userIds = [];
			$("#hasUser > option").each(function(){
//				roleIds += $(this).val() + ",";
				userIds.push($(this).val());
			});
//			if(roleIds != ""){
//				roleIds = roleIds.substring(0,roleIds.length-1);
//			}
			var param = {
				"roleOid":roleId,
				"userOidList":userIds	
			};
			var postUrl = rootPath+"jasframework/privilege/role/updateUser.do?";
//			$.post(postUrl,param,function(result){
//				if (result.success){
//					reloadData('queryRole.htm', '#dg');
//					top.showAlert(getLanguageValue("tip"),getLanguageValue("savesuccess"),'info',function(){
//						closePanel();
//					});
//				} else {
//					top.showAlert(getLanguageValue("error"),result.msg,'error');
//					return;
//				}
//			},'json');
			$.ajax({
				url : postUrl,
				data :JSON.stringify(param),
				type : 'POST',
				dataType:"json",
				contentType: "application/json",
				success : function(result) {
					if (result.status){
						reloadData('queryRole.htm', '#dg');
						top.showAlert(getLanguageValue("tip"),getLanguageValue("savesuccess"),'info',function(){
							closePanel();
						});
					} else {
						top.showAlert(getLanguageValue("error"),result.msg,'error');
						enableButtion("saveButton");
						return;
					}
				}
			});
		}
		//初始化
	$(function(){
		$('#dlg_user').panel('open');
			userRoleConfig();
	});
		