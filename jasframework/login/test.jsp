<%@ page language="java" contentType="text/html; charset=ISO-8859-1" import="java.util.*" 
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
Map<String, String> map = System.getenv();	    
String userName = map.get("USERNAME");// 获取用户名	    
String computerName = map.get("COMPUTERNAME");// 获取计算机名	    
String userDomain = map.get("USERDOMAIN");// 获取计算机域名	    
System.out.println(userName);	    
System.out.println(computerName);	    
System.out.println(userDomain);
%>

</body>
</html>