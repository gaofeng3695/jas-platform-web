/**
 * 类描述: 待办工作功能js。
 * 
 * @author zhaojz
 * @version 1.0
 * @创建时间： 2012-12-30 上午8:46:07
 * ********************************更新记录******************************
 * 版本： 1.0 修改日期： 修改人： 修改内容：
 * ********************************************************************
 */


var workflowTaskUrlRootPath = workflow.URL.task; //流程任务后台请求根路径
var workflowTaskRootPath = workflow.page.task; //流程任务页面根路径
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
	//初始化流程名称列表下拉选
	workflow.getWorkflowNameList(function(result){
		workflow.loadWorkflowName("processKey",result.rows);
	});
}

/**
 * 描述：初始化数据列表
 */
var datagridID = "myToDoTaskDatagrid";
var datagridObj;
var refreshPageParams="refreshPage=myundotask.htm&refreshPageDatagrid="+datagridID;
function initDatagrid(){
	datagridObj = $('#'+datagridID);
	datagridObj.datagrid( {
		url : workflowTaskUrlRootPath.myTodoList,
		toolbar : '#toolbar',
		idField : 'taskId',
		pagination : true,
		rownumbers : true,
		//contentType:application/json,page rows->pageNo pageSize,sort order->orderBy,data->dataJSONString
		loader : function(param, success, error) { 
			datagridBeforeSend(param, success, error,$(this).datagrid("options"));
		 },
		rowStyler : function(index, row) {
			//任务已过期，则特殊标记
			var dueTimeMills = datetimeToMillsConverter(row.dueTime)||0;
			var curTimeMills = new Date().getTime();
			if (dueTimeMills!=0 && dueTimeMills < curTimeMills) {
				return 'background-color:#ff5555;color:#333;';
			}
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
			width : 200
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
			field : 'status',
			title : getLanguageValue('workflow.proInstStatus'),
			width : 200,
			align:"center",
			formatter:function(value,row){
				var formatter = "";
				if("running"==value){
					formatter = "运行中";
				}
				if("suspend"==value){
					formatter = "挂起";
				}
				if(row.dueTime){
					formatter+="<br/><span style='color:red;font-size:10px;line-height:18px;'>(任务于"+row.dueTime+" 过期)</span>";
				}
				return formatter;
			}
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
		},{
			field : 'appName',
			title : getLanguageValue('workflow.appName'), 
			width : 200,
			formatter:function(value,row){
				return value||row.appId;
			},
			hidden:true
		}] ],
		onDblClickRow : function(i, row) {
		}
	});
	initDatagrigHeight(datagridID,'',0);
}


/**
 * 描述：任务审批按钮（办理按钮）处理函数，弹出任务审批页面窗口
 */
var taskApprovePath = workflowTaskRootPath.approve;
function showTaskApprovePage() {
	var rows = datagridObj.datagrid("getSelections");
	if (rows.length == 1) {
		var dlgRequestParams=refreshPageParams;  //附加的请求参数
		top.getDlg(taskApprovePath.url+"?taskId=" + rows[0].taskId + "&proInstId=" + rows[0].proInstId+"&"+dlgRequestParams, 
				taskApprovePath.id,getLanguageValue(taskApprovePath.key), 
				taskApprovePath.w, taskApprovePath.h);
	} else {
		workflow.tipChooseRecored();
	}
}
/**
 * 描述：转办按钮处理函数，弹出任务转办页面窗口
 */
var taskTransferPath = workflowTaskRootPath.transfer;
function showTaskTransferPage(){
	var rows = datagridObj.datagrid("getSelections");
	if (rows.length == 0) {
		workflow.tipChooseRecored();
		return;
	}
	var taskIds = [];
	var processNamesAndTaskNames = [];
	for(var i=0;i<rows.length;i++){
		taskIds.push(rows[i].taskId);
		processNamesAndTaskNames.push(rows[i].processName+"-"+rows[i].taskName);
	}
	processNamesAndTaskNames = encodeURI(encodeURI(processNamesAndTaskNames));
	top.getDlg(taskTransferPath.url+"?taskIds="+taskIds+"&processNamesAndTaskNames="+processNamesAndTaskNames+"&"+refreshPageParams,
			taskTransferPath.id,getLanguageValue(taskTransferPath.key), 
			taskTransferPath.w, taskTransferPath.h);
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


