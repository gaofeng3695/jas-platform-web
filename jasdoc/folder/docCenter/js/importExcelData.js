/**
 *
 * 文件描述: 将excel数据导入到数据库中

 * @author LiuDongya
 * @version 1.0
 *
 */

var callerPageUrl = getParamter('callerPageUrl');
var datagridElementId = getParamter('datagridElementId');
var templateId = getParamter("templateId");
var tableName = getParamter("tableName");
var functionName = getParamter("functionName");
var fileNameWithId = ""; // 下载错误信息文件Id命名
var fileName = ""; // 下载错误信息文件名称

$(function () {
	$("<div id=\"load-mask\" class=\"datagrid-mask\"></div>").css({
		width: "100%",
		height: $(window).height()
	}).appendTo("body");
	$("<div id=\"load-mask-msg\" class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({
		left: ($(document.body).outerWidth(true) - 240) / 2,
		top: ($(window).height() - 45) / 2
	});
	handleStyle();
});

function showLoadingMessage(message) {
	$('#load-mask-msg').html(message);
	$('#load-mask').css('display', 'block');
	$('#load-mask-msg').css('display', 'block');
}

function hiddenLoadingMessage() {
	$('#load-mask').css('display', 'none');
	$('#load-mask-msg').css('display', 'none');
}

/**
 * @desc 上传
 */
function uploadDataFile() {
	$('#uploadfile').linkbutton('disable'); //禁用
	$inputObj = $('#file');
	if ($inputObj.val() == "请选择excel文件") {
		top.showAlert("提示", "请选择数据！", 'info');
		$('#uploadfile').linkbutton('enable'); //可用
		return;
	} else if ($inputObj.val() == "") {
		top.showAlert("提示", "请选择数据！", 'info');
		$('#uploadfile').linkbutton('enable'); //可用
		return;
	} else if ($inputObj.val().indexOf(".xls") == -1 && $inputObj.val().indexOf(".xlsx") == -1) {
		$('#uploadfile').linkbutton('enable'); //可用
		top.showAlert("提示", "请选择excel数据！", 'info');
		return;
	}
	showLoadingMessage('正在进行文件解析和数据检查，请耐心等待...');
	uploader.upload();
	uploader.on('uploadSuccess', function (file, returnData) {
		hiddenLoadingMessage();

		if (returnData.success == -1) {
			$('#uploadfile').linkbutton('enable'); //可用
			top.showAlert("提示", returnData.msg, '');
		} else if (returnData.success == 0) {
			$('#uploadfile').linkbutton('enable'); //可用
			var totalCount = returnData.total;
			var checkResutlMessage = returnData.msg;
			var resutlMessage = "</br>数据总条数: <span style='font-weight:bold;color:red'>" + totalCount + "</span>";
			resutlMessage = resutlMessage + " 以下为具体检查结果：<br>";
			var arr = checkResutlMessage.split("$");
			$.each(arr, function (i) {
				if (arr[i].indexOf("<br>") != -1) {
					resutlMessage += arr[i];
				} else {
					resutlMessage += arr[i] + "<br>";
				}
			});
			$('#fileChoose').css('display', 'none');
			$('#dataCheckResult').css('display', 'block');
			$('#dataCheckResult').html($('#dataCheckResult').html() + resutlMessage);
			$("#uploadfile").css('display', 'none');

		} else if (returnData.success == 1) {
			var resutlMessage = returnData.msg;
			$('#fileChoose').css('display', 'none');
			$('#dataCheckResult').css('display', 'block');
			$('#fileChooseButton').css('display', 'none');
			$('#dataCheckResultButton').css('display', 'block');
			$('#dataCheckResult').html($('#dataCheckResult').html() + "<span style='font-weight:bold;color:red'>" + resutlMessage);
			$("#download-btn").hide();
			$('#uploadfile').linkbutton('enable'); //可用
			//			disableButtion('importData-initial');
		}
	});
}

/**
 * @desc 导入提示
 * @param importType
 */
function importData() {
	//	if(importType=='update'){
	//		$.messager.confirm("确认","更新导入比较耗时，确定要更新导入吗？",function(r){
	//			if (r){
	//				showLoadingMessage('更新导入较耗时，请耐心等待...');
	//				importDataRequest(importType);
	//			}
	//		});
	//	}else{
	//		showLoadingMessage('正在进行数据入库，请耐心等待...');
	//		importDataRequest(importType);
	//	}
	$('#importData-initial').linkbutton('disabled');
	importDataRequest();

}

/**
 * @desc 不同方式导入excel
 * @param importType
 */
function importDataRequest() {
	$.ajax({
		url: rootPath + "jasdoc/folder/doccenter/importFolder.do?folderid=" + folderId,
		type: 'POST',
		success: function (returnData) {
			hiddenLoadingMessage();
			if (returnData.status == 0) {
				$('#importData-initial').linkbutton('enabled');
				top.showAlert("提示", returnData.msg, '');
				return;
			} else {
				$('#importData-initial').linkbutton('enabled');
				top.showAlert("提示", "数据导入成功！", 'info', function () {
					closeSave();
				});
			}
		},
		error: function (data) {
			$('#importData-initial').linkbutton('enabled');
			hiddenLoadingMessage();
			top.showAlert('提示', '数据导入失败！', 'error');
		}
	});
}

/**
 *
 * 方法描述：关闭窗口
 *
 */
function closeSave() {
	top.closeDlg('importiframe');
}

function handleStyle() {
	$("#file").attr('style', 'color:gray;');
	$("#file").val('请选择excel文件');
}