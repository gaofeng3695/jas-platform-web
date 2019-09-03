/**
 * @file
 * @author  张超飞
 * @version 1.0
 * @desc  用户主页面js
 * @date  2012-12-18
 * @last modified by lizz
 * @last modified time  2017-08-17
 */

var userRequestPage = rootPath+"jasframework/privilege/user/";
var userRequestUrl = rootPath+"jasframework/privilege/user/";
var userDatagridID = "10060201";

$(function(){
	$('#tt').tree({
		url: rootPath+'jasframework/privilege/unit/getLeftTree.do',
		onLoadSuccess:function(node,data) {
		 	var aa=$('#tt').tree('select',$('#tt').tree('getRoot').target);
			var url = rootPath+"jasframework/privilege/user/getList.do?unitId="+$('#tt').tree('getRoot').id;
			getChildren();
			$("#"+userDatagridID).datagrid("options").url = url;
			$("#"+userDatagridID).datagrid('load');
		},
		onClick:function(node){
			$("#"+userDatagridID).datagrid('clearSelections'); // clear
			queryUser();
			if(node.attributes.type){
				//$("#toolbar").hide();
			}else{
				$("#toolbar").show();
			}
		}
	});
	//datagrid初始化
  	$("#"+userDatagridID).datagrid({
		autoRowHeight: false,
		fitColumns:true,
		nowrap:true,
		columns:[[
		      {field:getLanguageValue("ck"),checkbox:true},
			  {field:'loginName',title:getLanguageValue("user.loginname"),align:"center",width:100},
			  {field:'userName',title:getLanguageValue("user.username"),align:"center",width:100},
			  {field:'roleNames',title:getLanguageValue("user.roleName"),align:"center",width:200},
			  {field:'unitName',title:getLanguageValue("user.unitName"),align:"center",width:100},
			  {field:'phone',title:getLanguageValue("user.phone"),align:"center",width:100},
			  {field:'email',title:getLanguageValue("user.email"),align:"center",width:150},
			  {field:'passwordExpiredDate',title:getLanguageValue("user.passwordExpiredDate"),align:"center",width:150,hidden:true},
			  {field:'description',title:getLanguageValue("user.description"),align:"left",width:200}
//			  ,
//			  {field:'operate',title:getLanguageValue("user.operate"),width:150,align:"center",formatter: function(value,row,index){
//					if (row.oid){
//						var opt = '<p class="table-operate"><a href="#" title = "' + getLanguageValue("view")+'" onclick="viewUser(\'' + row.oid+'\')">\
//										<span class="fa fa-eye"></span>\
//								   </a><a href="#" title = "' + getLanguageValue("edit")+'" onclick="editUser(\'' + row.oid+ '\'\,\'' + row.loginName+'\')">\
//										<span class="fa fa-edit"></span>\
//							   	   </a><a href="#" title = "' + getLanguageValue("delete")+'" onclick="removeUser(\'' + row.oid+'\')">\
//										<span class="fa fa-minus"></span>\
//							       </a><a href="#" title = "' + getLanguageValue("user.jiaoseshezhi")+'" onclick="setRole(\'' + row.oid+'\')">\
//										<span class="fa fa-cog"></span>\
//								   </a></p>'
//						return opt
//					}
//				}}
			]],
			/*title:"用户查询列表",*/
			onDblClickRow : function(index, row) {
				  $("#"+userDatagridID).datagrid('selectRow',index);  //指定行选中
				  viewUser(row.oid);
			},
			onLoadSuccess:function(data){
		    	$("#"+userDatagridID).datagrid('clearSelections'); //clear selected options
		    }
	});

    //高级搜索
	$("#moreQuery").click(function(){
		$(this).toggleClass("active");
		$("#moreTable").toggleClass("active");
		var span = $(this).children().find(".l-btn-icon");
		if($(this).hasClass("active")){
			$(span).removeClass("accordion-expand").addClass("accordion-collapse");
			initDatagrigHeight('10060201','userQuery','147','right');
		}else{
			$(span).removeClass("accordion-collapse").addClass("accordion-expand");
			initDatagrigHeight('10060201','userQuery','64','right');
		}
	});
	$('input[name="userrange"]').change(function() {
		queryUser();
	});

  	tempWidth = $('#right').css('width');
	if(tempWidth.lastIndexOf('px')>0){
		tempWidth = parseInt(tempWidth.substring(0,tempWidth.length-2));
	}

	initDatagrigHeight('10060201','userQuery','64','right');
	initResize();

});

	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	var div_left_width = 200;
	var tempWidth = 0;



 	/**
 	 * @desc 页面自适应
 	 */
	$(window).bind("resize",function(){
		resizeLayout();
	});


	/**
 	 * @desc 窗口的自适应处理
 	 */
	function resizeLayout(){
		try{

			clientWidth = document.documentElement.clientWidth;
			clientHeight = document.documentElement.clientHeight;
			var div_left_width = $("#left").width()+10;

			$('#userQuery').panel('resize',{width:clientWidth-div_left_width-5});
			$("#"+userDatagridID).datagrid('resize',{width:clientWidth-div_left_width-5,height:clientHeight-$('#userQuery').panel('panel').height()});
			$('#userrange').combobox({
				width :  $('#right').width() * 0.35
			});
		}catch(e){
		}
	}

/**
 * @desc 初始化页面绑定事件
 */
function initResize(){

	//自动适应页面大小
	$(".layout-button-left").bind("click",function(){
		$('#userQuery').panel('resize',{width:clientWidth-28-6});
		$("#"+userDatagridID).datagrid('resize',{width:clientWidth-28-6});
		/*$(".layout-button-right").bind("click",function(){
			resizeLayout();

			$('#userQuery').panel('resize',{width:tempWidth});
			$("#"+userDatagridID).datagrid('resize',{width:tempWidth});
		});*/
	});
}

/**
 * @desc 用户角色设置
 */
function setRoleRow(){
	var rows = $("#"+userDatagridID).datagrid("getSelections");
	if (rows.length != 1) {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"), "info");
		return;
	}
	var row = rows[0];
	setRole(row.oid);
}
function setRole(userId){
	if(!isNull(userId)){
		top.getDlg("userRole.htm?refreshPage=queryUser&userId="+userId,"config",getLanguageValue('user.jiaoseshezhi'),550,440,false,true,true);
	}
}

/**
 * @desc 添加用户
 */
function addUser(){
	 var row = $('#tt').tree('getSelected');
	 if (row != null ){
		var unitId= row.id;
	 	var url="addUser.htm?refreshPage=queryUser&unitId="+unitId;
		top.getDlg(url,"addUserIframe",getLanguageValue('user.xinzengyonghu'),710,310,false,true,true);
	 }else{
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
		return;
	}
}

//修改用户信息
function editUserRow() {
	var rows = $("#"+userDatagridID).datagrid("getSelections");
	if (rows.length != 1) {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"), "info");
		return;
	}
	var row = rows[0];
	editUser(row.oid);
}
function editUser(userId){
	if(!isNull(userId)){
		top.getDlg("updateUser.htm?id="+userId,"editUserIframe",getLanguageValue('user.xiugaiyonghu'),710,300);
	}

}


/**
 * @desc 修改用户密码
 */
function editpassword(index){
	var rows;
	if(!isNull(index)){
		$("#"+userDatagridID).datagrid('selectRow',index);  //指定行选中
	}
	rows = $("#"+userDatagridID).datagrid('getSelections');

	if(rows.length == 1) {
		top.getDlg("updateUserPass.htm?refreshPage=queryUser&id="+rows[0].oid,"editiframe",getLanguageValue('user.xiugaimima'),710,300,false,true,true);
	} else {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
	}
}
//查看用户详情
function viewUserRow() {
	var rows = $("#"+userDatagridID).datagrid("getSelections");
	if (rows.length != 1) {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"), "info");
		return;
	}
	var row = rows[0];
	viewUser(row.oid);
}
function viewUser(userId){
	if(!isNull(userId)){
		top.getDlg("viewUser.htm?id="+userId,"viewUserIframe",getLanguageValue('user.chakanyonghu'),800,400);
	}
}

//删除用户
function removeUserRow() {
	var rows = $("#"+userDatagridID).datagrid("getSelections");
	if (rows.length ==0) {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"), "info");
		return;
	}
	var ids="";
	for(var i=0;i<rows.length;i++){
		ids += ","+rows[i].oid;
	}
	if(ids.length > 0) ids = ids.substring(1);
	removeUser(ids);
}
function removeUser(userIds){
	var str = JSON.stringify({"oids" : userIds});
	$.messager.confirm(getLanguageValue("delete"),getLanguageValue("user.deletecomfirm"),function(r){
		if (r){
			$.ajax({
					// url: rootPath+"jdbc/commonData/user/deleteBatch.do",//调用新增接口
					url: rootPath+"jasframework/privilege/user/deleteUser.do",//用户批量删除
				   data: {oids:userIds},
				   type: "POST",
				   dataType:"json",
				   async:false,
				   success: function(data){
						if(data.status==1){
							top.showAlert(getLanguageValue("tip"),getLanguageValue("deletesuccess"),"info",function(){
								$("#"+userDatagridID).datagrid('reload');
								$("#"+userDatagridID).datagrid('clearSelections');
							});
						}else{
							top.showAlert(getLanguageValue("error"),data.msg,"error");
						}
				   },
				   error : function(data) {
						top.showAlert(getLanguageValue("error"), data.msg, 'info');
					}
				});
		}
	});
}

/**
 * @desc 重置用户密码
 */
function resetUserPwd(){
	var rows = $("#"+userDatagridID).datagrid('getSelections');
	if (rows.length > 0){
		var ids="";
		for(var i=0;i<rows.length;i++){
			ids += ","+rows[i].oid;
		}
		if(ids.length > 0)ids = ids.substring(1);
		$.messager.confirm(getLanguageValue('user.resetpass'),getLanguageValue('user.resetconfirm'),function(r){
			if (r){
				var postUrl = rootPath+'jasframework/privilege/user/resetUserPWD.do?ids=' + ids + '&rd='+Math.random();
				$.post(postUrl,function(result){
					if (result.success){
			top.showAlert(getLanguageValue('success'),getLanguageValue('user.resetsuccess'),'info');
					} else {
						top.showAlert(getLanguageValue("error"),result.msg,'error');
						return;
					}
				},'json');
			}
		});
	}else{
		top.showAlert(getLanguageValue("tip"),getLanguageValue("pleasechoose"),'info');
		return;
	}
}
/**
 * @desc 修改用户密码(已过时)
 */
function editUserPass(){
	var rows = $("#"+userDatagridID).datagrid('getSelections');
	if (rows.length == 1){
		var row = $("#"+userDatagridID).datagrid('getSelected');
		var eventID =row.oid;
		top.getDlg("updateUserPass.htm?random="+new Date().getTime()+"&id="+eventID,"updateiframe",getLanguageValue('user.xiugaimima'),450,170,false,true,true);
	}else{
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
	}
}

/**
 * @desc 获取选中的树节点
 */
function getChildren(){
	var node = $('#tt').tree('getSelected');
    if (node) {
        var children = $('#tt').tree('getChildren', node.target);
    }
    else {
        var children = $('#tt').tree('getChildren');
    }
//    var s = "'";
//    for (var i = 0; i < children.length; i++) {
//        s += children[i].id + "','";
//    }
//    s+=node.id + "'";
    //alert(s);
    // modify by gejian at 2019-07-22 解决显示所有子部门用户数据查询不到的bug
    var s = node.id;
    for (var i = 0; i < children.length; i++) {
    	s += "," + children[i].id
    }
    return s;
}


/**
 * @desc 查询用户
 */
function queryUser(){
	$("#"+userDatagridID).datagrid('clearSelections'); // clear
	var loginName = ($("#loginName").val()||"")!=""?"%"+$("#loginName").val()+"%":"";
	var userName = ($("#userName").val()||"")!=""?"%"+$("#userName").val()+"%":"";
	var userrange = $("input[name='userrange']:checked").val();
	var query={"loginName":loginName,"userName":userName,"userRange":userrange};
	var row = $('#tt').tree('getSelected');
	var url;
	if (row != null ){
		if(userrange==1){
	 		var unitidList = getChildren();
			url = rootPath+"jasframework/privilege/user/getList.do?unitIdList=" + unitidList;
		}else{
			url=rootPath+"jasframework/privilege/user/getList.do?unitId=" + row.id;
		}
		$("#"+userDatagridID).datagrid("options").url = url;
		$("#"+userDatagridID).datagrid('options').queryParams=query;
		$("#"+userDatagridID).datagrid('load');
		$("#"+userDatagridID).datagrid('options').queryParams=null;
	 }else{
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
		return;
	}
}

/**
 * @desc 清空查询条件
 */
function clearselectform(){
	$("#loginName").val("");
	$("#userName").val("");
	$("#userrange").combobox("setValue","");

}
