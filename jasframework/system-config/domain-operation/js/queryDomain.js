/**
 * @desc 页面初始化
 */
$(document).ready(function(){
	$('#dg').datagrid({
        loader : function(param, success, error) {
            var opts = $(this).datagrid("options");
            $.ajax({
            type : opts.method,
            url : opts.url,
            dataType : 'json',
            contentType : 'application/json;charset=utf-8', // 设置请求头信息
            data : JSON.stringify(param),
            success : function(result) {
                success(result);
            }
            });},
		width:'100%',
		nowrap: false,
		striped: true,
		collapsible:false,
        url:rootPath+"/hibernate/commonData/domain/getPage.do",
        fitColumns:true,
		remoteSort: true,
		idField:'oid',
		nowrap:true,
        columns:[[{field:'ck',title:getLanguageValue('ck'),checkbox:true},
                {field:'domainName',title:'阈名',width:300},
                {field:'codeId',title:'阈值Id',width:300},
                {field:'codeName',title:'阈值名称',width:300},
                {field:'parentCodeId',title:'父阈值Id',width:300},
                {field:'ordinal',title:'序号',width:300},
        
			]],
		onDblClickRow:function(index,indexData){
			top.getDlg("viewDomain.htm?hidden=&oid="+indexData.oid+"&r="+new Date().getTime(),'view',getLanguageValue("view"),700,240,false,true,true);
		},
		onCheck:function(rowIndex,rowData){

		},
		onSelect:function(rowIndex,rowData){

		}
    });
    initDatagrigHeight('dg','queryDiv',100);
});

function queryDomain(){
    var domainName = $("#domainName").val();
	var query={"domainName":domainName}; //把查询条件拼接成JSON
	$("#dg").datagrid('options').queryParams=query; //把查询条件赋值给datagrid内部变量
	$("#dg").datagrid('load'); //重新加载
}

function showInfo(){
    var rows = $("#dg").datagrid("getSelections");
	if(rows.length == 1) {
		top.getDlg("viewDomain.html?oid="+rows[0].oid+"&r="+new Date().getTime(),'view', getLanguageValue("view"),800,400);
	} else {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
	}
}

function removeDomain(){
	var rows = $('#dg').datagrid('getSelections');
	if (rows.length == 1){
		var row = $('#dg').datagrid('getSelected');
		
		$.messager.confirm(getLanguageValue("delete"),getLanguageValue("deleteconfirm"),function(r){
			if (r){
                        $.ajax({
                            url : rootPath+"/hibernate/commonData/domain/delete.do",
                            data : JSON.stringify({
                                oid: row.oid
                            }),
                            type : 'POST',
                            dataType:"json",
                            contentType: "application/json",
                            success : function(data) {
                                if(data.status == 1){
                                    top.showAlert(getLanguageValue("tip"),getLanguageValue("deletesuccess"),'ok',function(){
                                        $('#dg').datagrid('reload');	// reload the user data
                                        $('#dg').datagrid('clearSelections'); //clear selected options
                                    });
                                }else{
                                    top.showAlert(getLanguageValue("tip"), getLanguageValue("deleteFailed"), 'info');
                                }
                            }
                        });
					}
			
		});
	}else{
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
	}
}

function newDomain(){
	top.getDlg("addDomain.html?r="+new Date().getTime(),"saveiframe", getLanguageValue("add"),750,400);
}


/**
 * @desc 修改按钮事件
 */
function editDomain(oid){
	var rows = $("#dg").datagrid("getSelections");
	var eventID;
	if(!isNull(oid)){
		eventID = oid;
	}else if(rows.length == 1){
		eventID = rows[0].oid;
	} else {
		top.showAlert(getLanguageValue("tip"),getLanguageValue("chooserecord"),'info');
		return;
	}
	if(!isNull(eventID)){
		top.getDlg("addDomain.html?oid="+eventID+"&r="+new Date().getTime(),"saveiframe",getLanguageValue("edit"),700,300,false,true,true);
	}
}

function refreshDomain(){
    $.ajax({
        url : rootPath+"/jasframework/sysdoman/refreshCache.do",
        type : 'GET',
        success : function(data) {
            if(data==true){
                top.showAlert(getLanguageValue("tip"),"刷新成功",'ok',function(){
                    $('#dg').datagrid('reload');	// reload the user data
                    $('#dg').datagrid('clearSelections'); //clear selected options
                });
            }else{
                top.showAlert(getLanguageValue("tip"), getLanguageValue("deleteFailed"), 'info');
            }
        }
    });
}