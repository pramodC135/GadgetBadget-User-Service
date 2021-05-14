<%@page import="model.User" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=divice-width, initial-scale=1">
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/users.js"></script>
<title>Users Management</title>
</head>
<body>

	<div class="container">
					<div class="row">
					<h1>GADGETBADGET</h1>
							<div class="col">
								
								<h2>Users Management</h2>
								<form id="formUser" name="formUser" method="post" action="users.jsp">
									User code: <input name="userCode" id="userCode" type="text" class="form-control form-control-sm"><br>
									UserName: <input name="username" id="username" type="text" class="form-control form-control-sm"><br>
									Password: <input name="userPwd" id="userPwd" type="password" class="form-control form-control-sm"><br>
									User Email: <input name="userEmail" id="userEmail" type="email" class="form-control form-control-sm"><br>
									User Role : <input name="userRole" id="userRole" type="text" class="form-control form-control-sm"><br>
									First Name : <input name="userFname" id="userFname" type="text" class="form-control form-control-sm"><br>
									Last Name : <input name="userLname" id="userLname" type="text" class="form-control form-control-sm"><br>
									Address : <input name="userAddress" id="userAddress" type="text" class="form-control form-control-sm"><br>
									Birth Date : <input name="userBod" id="userBod" type="date" class="form-control form-control-sm"><br>
									<br>
									<div id="alertSuccess" class="alert alert-success"></div>
									<div id="alertError" class="alert alert-danger"></div>
									<input name="btnSave" id="btnSave" type="button" value="Save User" class="btn btn-primary">
									<input type="hidden" id="hidUserIDSave" name="hidUserIDSave" value="">
								</form>
								
								<br>
								
								<div id="divUsersGrid"> 
										<%
										User userObj = new User();
										out.print(userObj.readUsers());
										%>	
								</div>
	
							</div>
					</div>
	</div>

</body>
</html>