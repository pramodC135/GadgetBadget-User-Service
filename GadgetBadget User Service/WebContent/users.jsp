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
							<div class="col">
								
								<h1>Users Management</h1>
								<form id="formItem" name="formItem" method="post" action="users.jsp">
									User code: <input name="itemCode" id="itemCode" type="text" class="form-control form-control-sm"><br>
									User Name: <input name="itemName" id="itemName" type="text" class="form-control form-control-sm"><br>
									Password: <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									User Email: <input name="itemDesc" id="itemDesc" type="text" class="form-control form-control-sm"><br>
									User Role : <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									First Name : <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									Last Name : <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									Address : <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									Birth Date : <input name="itemPrice" id="itemPrice" type="text" class="form-control form-control-sm"><br>
									<br>
									<div id="alertSuccess" class="alert alert-success"></div>
									<div id="alertError" class="alert alert-danger"></div>
									<input name="btnSave" id="btnSave" type="button" value="Save" class="btn btn-primary">
									<input type="hidden" id="hidUserIDSave" name="hidUserIDSave" value="">
								</form>
								
								<br>
								
								<div id="divItemsGrid"> 
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