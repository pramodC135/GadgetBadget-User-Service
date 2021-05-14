//page load
$(document).ready(function()
{	
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event)
{ 
		// Clear alerts---------------------
		 $("#alertSuccess").text(""); 
		 $("#alertSuccess").hide(); 
		 $("#alertError").text(""); 
		 $("#alertError").hide(); 
		 
		// Form validation-------------------
		var status = validateUserForm(); 
		if (status != true) 
		 { 
				 $("#alertError").text(status); 
				 $("#alertError").show(); 
				 return; 
		 } 
		 
		// If valid------------------------
		var type = ($("#hidUserIDSave").val() == "") ? "POST" : "PUT"; 
		 $.ajax( 
		 { 
				 url : "UsersAPI", 
				 type : type, 
				 data : $("#formUser").serialize(), 
				 dataType : "text", 
				 complete : function(response, status) 
				 { 
				 		onUserSaveComplete(response.responseText, status); 
				 } 
		 }); 
});


$(document).on("click", ".btnRemove", function(event)
{ 
 	$.ajax( 
 	{ 
			 url : "UsersAPI", 
			 type : "DELETE", 
			 data : "userID=" + $(this).data("userid"),
			 dataType : "text", 
			 complete : function(response, status) 
			 { 
			 		onUserDeleteComplete(response.responseText, status); 
			 } 
	 }); 
});


$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidUserIDSave").val($(this).data("userid"));
	$("#userCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#username").val($(this).closest("tr").find('td:eq(1)').text());
	$("#userPwd").val($(this).closest("tr").find('td:eq(2)').text());
	$("#userEmail").val($(this).closest("tr").find('td:eq(3)').text());
	$("#userRole").val($(this).closest("tr").find('td:eq(4)').text());
	$("#userFname").val($(this).closest("tr").find('td:eq(5)').text());
	$("#userLname").val($(this).closest("tr").find('td:eq(6)').text());
	$("#userAddress").val($(this).closest("tr").find('td:eq(7)').text());
	$("#userBod").val($(this).closest("tr").find('td:eq(8)').text());
});

function validateUserForm()
{	
	// CODE
	if ($("#userCode").val().trim() == "")
	{
		return "Insert User Code.";
	}
	
	// userName
	if ($("#username").val().trim() == "")
	{
		return "Insert UserName.";
	}
	
	// Password
	if ($("#userPwd").val().trim() == "")
	{
		return "Insert User Password.";
	}
	
	// Email
	if ($("#userEmail").val().trim() == "")
	{
		return "Insert Email.";
	}
	
	// Role
	if ($("#userRole").val().trim() == "")
	{
		return "Insert User Role.";
	}
	
	// First name
	if ($("#userFname").val().trim() == "")
	{
		return "Insert User First Name.";
	}
	
	// Last Name
	if ($("#userLname").val().trim() == "")
	{
		return "Insert User Last Name.";
	}
	
	// Address
	if ($("#userAddress").val().trim() == "")
	{
		return "Insert Address.";
	}
	
	// Birthday
	if ($("#userBod").val().trim() == "")
	{
		return "Insert User Birthday.";
	}
	
	return true;
}

function onUserSaveComplete(response, status)
{ 
		if (status == "success") 
		{ 
			 	var resultSet = JSON.parse(response); 
			 	
			 	if (resultSet.status.trim() == "success") 
			 	{ 
			 		$("#alertSuccess").text("Successfully saved."); 
			 		$("#alertSuccess").show(); 
			 		
			 		$("#divUsersGrid").html(resultSet.data); 
				} else if (resultSet.status.trim() == "error") 
			 	{ 
			 		$("#alertError").text(resultSet.data); 
			 		$("#alertError").show(); 
			 	} 
		 } else if (status == "error") 
		 { 
		 		$("#alertError").text("Error while saving."); 
		 		$("#alertError").show(); 
		 } else
		 { 
		 		$("#alertError").text("Unknown error while saving.."); 
		 		$("#alertError").show(); 
		 } 
		 		$("#hidUserIDSave").val(""); 
		 		$("#formUser")[0].reset(); 
}
 

function onUserDeleteComplete(response, status)
{ 
		if (status == "success") 
		{ 
		 		var resultSet = JSON.parse(response); 
		 	
		 		if (resultSet.status.trim() == "success") 
		 		{ 
						 $("#alertSuccess").text("Successfully deleted."); 
		 				 $("#alertSuccess").show(); 
		 				 
		 				 $("#divUsersGrid").html(resultSet.data); 
		 		} else if (resultSet.status.trim() == "error") 
		 		{ 
		 				$("#alertError").text(resultSet.data); 
						 $("#alertError").show(); 
		 		} 
		 } else if (status == "error") 
		 { 
		 		$("#alertError").text("Error while deleting."); 
		 		$("#alertError").show(); 
		 } else
		 { 
		 		$("#alertError").text("Unknown error while deleting.."); 
		 		$("#alertError").show(); 
		 }
 }
