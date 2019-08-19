/**
 * 类描述: 已办工作功能js。
 * 
 * @author zhaojz
 * @version 1.0 创建时间： 2012-12-30 上午8:46:07 
 * ********************************更新记录****************************** 
 * 版本： 1.0 修改日期： 修改人： 修改内容：
 * *********************************************************************
 */
var workflowTaskUrlRootPath = workflow.URL.task; //流程任务后台请求根路径

/**
 * 初始化页面，加载页面数据。
 */
$(document).ready(function(){
	//初始化查询条件
	initQueryCondition();
	//初始化流程部署数据列表
	initDatagrid();
});

/**
 * 描述：初始化查询条件
 */
function initQueryCondition(){
	
}
/**
 * 描述：初始化datagrid数据
 */
var datagridID = "myDoneTaskDatagrid";
var datagridObj;
var refreshPageParams="refreshPage="+workflow.page.myTask.url+"&refreshPageDatagrid="+datagridID;
function initDatagrid() {
	datagridObj = $('#'+datagridID);
	datagridObj.datagrid({
		url : workflowTaskUrlRootPath.myDoneList,
		idField : 'taskId',
		pagination : true,
		rownumbers : true,
		singleSelect:true,
		//contentType:application/json,page rows->pageNo pageSize,sort order->orderBy,data->dataJSONString
		loader : function(param, success, error) { 
			datagridBeforeSend(param, success, error,$(this).datagrid("options"));
		 },
		columns : [ [ {
			field : 'ck',
			title : getLanguageValue('ck'),
			checkbox : true
		}, {
			field : 'processName',
			title : getLanguageValue('workflow.processName'), 
			width : 150,
			formatter:function(value,row){
				return row.processName;
			}
		}, {
			field : 'proInstName',
			title : getLanguageValue('workflow.proInstName'),
			width : 150
		}, {
			field : 'taskId',
			title : getLanguageValue('workflow.taskName')+"/"+getLanguageValue('workflow.taskId'),
			width : 200,
			sortable : true,
			formatter:function(value,row){
				return row.taskName+" ("+row.taskId+")";
			}
		},{
			field : 'startUserName',
			title : getLanguageValue('workflow.proInstStartUserName'),
			width : 80,
			align:"center"
		}, {
			field : 'startTime',
			title : getLanguageValue('workflow.taskStartTime'),
			width : 150,
			align:"center",
			sortable : true
		}, {
			field : 'endTime',
			title : getLanguageValue('workflow.taskEndTime'),
			width : 150,
			align:"center",
			sortable : true
		}, {
			field : 'duration',
			title : getLanguageValue('workflow.taskDuration'),
			width : 280,
			align : "center",
			formatter:function(value,row){
				return millsToHmsConverter(value);
			}
		}, {
			field : 'dueTime',
			title : getLanguageValue('workflow.taskDueTime'),
			width : 150,
			align:"center",
			hidden:true
		},{
			field : 'proInstId',
			title : getLanguageValue('workflow.proInstId'),
			width : 100,
			align:"center",
			hidden : true
		}, {
			field : 'businessKey',
			title : getLanguageValue('workflow.businessKey'),
			width : 150,
			hidden : true
		}] ],
		onSelect : function(i, row) {
			buttonStatus();
		},
		onSelectAll : function(i, row) {
			buttonStatus();
		},
		onUnselectAll : function(i, row) {
			buttonStatus();
		},
		onDblClickRow : function(i, row) {
		}
	});
	initDatagrigHeight(datagridID,'',0);
}
/**
 * 描述：判断按钮可用状态，并根据条件进行按钮可用状态设置
 * 
 * @param datagridObj datagrid对象
 */
function buttonStatus() {
	var rows = datagridObj.datagrid('getSelections');
	if(rows.length!=1){
		$('#101102020103').linkbutton('disable');
		return;
	}
	var taskId = rows[0].taskId;
	workflow.taskIsCanWithdraw(taskId,function(result){
		if (result.status==-1) {
			$('#101102020103').linkbutton('disable');
			return;
		}
		if (result.data == true) {
			$('#101102020103').linkbutton('enable');
		} else {
			$('#101102020103').linkbutton('disable');
		}
	})
}

/**
 * 查看流程图，弹出流程图显示页面窗口
 */
function showWorkFlowChart() {
	var rows = datagridObj.datagrid("getSelections");
	if (rows.length == 1) {
		workflow.openWorkflowChart('proInstId='+rows[0].proInstId);
	} else {
		workflow.tipChooseRecored();
	}
}

/**
 * 查看流程历史审批记录，弹出历史审批记录页面窗口
 */
function showApproveHistory() {
	var rows = datagridObj.datagrid("getSelections");
	if (rows.length == 1) {
		workflow.openApproveHistory('proInstId='+rows[0].proInstId+"&businessKey="+rows[0].businessKey);
	} else {
		workflow.tipChooseRecored();
	}
}

/**
 * 流程撤回
 */
function taskWithdraw() {
	$.messager.confirm(getLanguageValue("workflow.taskWithdraw"), getLanguageValue("workflow.taskWithdrawConfirm"), function(confirm) {
		if (confirm) {
			var rows = datagridObj.datagrid("getSelections");
			if (rows.length != 1) {
				workflow.tipChooseRecored();
				return;
			}
			if (rows.length == 1) {
				workflow.taskWithdraw(rows[0].taskId,function(result){
					if (result.status==-1){
						top.showAlert(getLanguageValue("error"), result.msg, 'error');
					}else{
						top.showAlert(getLanguageValue("tip"), getLanguageValue("workflow.taskWithdrawSuccess"), 'info',function() {
							refresh();
						});
					}
				})
			}
		}
	});
}

function refresh(){
	datagridObj.datagrid("reload");
}
