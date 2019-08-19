/**
 * 
 * 文件描述: 登录页面js。
 * 
 * @author zhanggf
 * @version 1.0 创建时间： 2012-10-30 上午8:46:07
 */
var currentLanguage = "";

$(function() {
	
	currentLanguage = $("#language").val();
	
	$.ajaxSetup({
		cache:false
	});
	initPageSize();
	changeLanguage(); // 初始化页面中英文
	// 防止在iframe里出现登录页面
	if (window.parent != window) {
		window.parent.location.reload(true);
	}
	//兼容ie8不支持placeholder
	$('input').placeholder();
	
	/**
	 * @desc 回车登录事件
	 */
	$("input").off("keydown");
	$("input").on("keydown", function(e) {
	    // 兼容FF和IE和Opera    
	    var theEvent = e || window.event;
	    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	    if (code == 13) {
    		login();
    		return false;
	    }
	    return true;
	});
});

function initPageSize() {
	var height = document.documentElement.clientHeight;
	document.getElementById("dl_main").style.height = height;
}

/**
 * 功能描述：根据用户选择的语言，改变页面元素语言
 */
function changeLanguage() {
	var language = $("#language").val();
	if (language == "en") {
		$("#loginNamelabel").html("loginName:");
		$("#passwordlabel").html("password:");
		$("#languagelabel").html("language:");
		$("#forgetPassword").html("forgot password?");
		document.getElementById("login").src = "image/LoginButtonEnglish.png";
	} else {
		$("#loginNamelabel").html("用&nbsp;&nbsp;&nbsp;&nbsp;户：");
		$("#passwordlabel").html("密&nbsp;&nbsp;&nbsp;&nbsp;码：");
		$("#languagelabel").html("语&nbsp;&nbsp;&nbsp;&nbsp;言：");
		$("#forgetPassword").html("忘记密码？");
		document.getElementById("login").src = "image/LoginButtonChinese.png";
	}
}

/**
 * 功能描述：登录
 */
function login() {
	var loginNum = $("#loginNum").val();
	var pass = $("#pass").val();
	if(!loginNum || !pass){
		$.messager.alert('提示',"请输入用户名或密码");
		return;
	}
	$("#login").attr("disabled", "disabled");// 点击登录按钮时首先将按钮置为不可用，防止重复点击；如果登录失败，重新将按钮置为可用状态
	var i18n = $("#language").val();
	var homePageVal = $("[name='homePage']:checked").val();
	var appId = top.isIntegrationExist ? "IntegrationPlatform" :top.defaultAppId;
	var formData = {
			logintype : "0",// 0为普通用户登录（外网用户登录），1为域用户登录（内网用户登录）
			loginNum : loginNum,
			pass : pass,
			i18n : i18n,
			appId:appId
		}
	$.ajax({
		url: rootPath+"jasframework/login/login.do?",
	    method: "post",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:JSON.stringify(formData),//获取表单中的json,
	    success: function(result){
			if(result.status==1){
				var token = result.token;
				localStorage.setItem("token",result.token);
				localStorage.setItem("user",JSON.stringify(result.user));
				sessionStorage.setItem("user",JSON.stringify(result.user));
				window.location.href = "home.htm?loginName=" + loginNum+"&token="+ token+"&userName="+encodeURI(result.user.userName)+"&userId="+result.user.oid+"&i18n="+currentLanguage;
			} else {
				top.showAlert("提示", result.msg, 'error');
				$("#login").removeAttr("disabled");
			}
	    }
	 });
		
}


var $win;

/**
 * 修改密码
 */
function forgotPassword(){
	$("#findPassword").css("display","");
	$win=$('#findPassword').window({
		 title: '忘记密码',
         width: 350,
         height: 200,
         modal: true
     });
}
/**
 * 忘记密码确认提交
 */
function confirmSubmit(){
	var url = rootPath+'jasframework/login/forgotPassword.do';
	$('#forgotPassword').form('submit', {
	   	url: url,
   		dataType:"json",
   		onSubmit : function(){
			return $(this).form('validate');
		},
	   	success: function(result){
	   		var result = eval('(' + result + ')');
			if (result.success){
				$.messager.alert("提示", result.msg, "info",function(){
					$win.window('close');
				});
			} else {
				$.messager.alert('错误',result.msg,result.error);
			}
		}
	});
}
/**
 * 关闭忘记密码页面
 */
function closeWindow(){
	$win.window('close');
}
