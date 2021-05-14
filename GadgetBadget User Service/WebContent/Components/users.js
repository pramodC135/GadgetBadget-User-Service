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
				 url : "ItemsAPI", 
				 type : type, 
				 data : $("#formItem").serialize(), 
				 dataType : "text", 
				 complete : function(response, status) 
				 { 
				 		onItemSaveComplete(response.responseText, status); 
				 } 
		 }); 
});


$(document).on("click", ".btnRemove", function(event)
{ 
 	$.ajax( 
 	{ 
			 url : "ItemsAPI", 
			 type : "DELETE", 
			 data : "itemID=" + $(this).data("itemid"),
			 dataType : "text", 
			 complete : function(response, status) 
			 { 
			 		onItemDeleteComplete(response.responseText, status); 
			 } 
	 }); 
});


$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidUserIDSave").val($(this).data("itemid"));
	$("#itemCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#itemName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#itemPrice").val($(this).closest("tr").find('td:eq(2)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(3)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(4)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(5)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(6)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(7)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(8)').text());
	$("#itemDesc").val($(this).closest("tr").find('td:eq(9)').text());
});

function validateUserForm()
{	
	// CODE
	if ($("#itemCode").val().trim() == "")
	{
		return "Insert Item Code.";
	}
	
	// Name
	if ($("#itemName").val().trim() == "")
	{
		return "Insert Item Name.";
	}
	
	// Price
	if ($("#itemPrice").val().trim() == "")
	{
		return "Insert Item Price.";
	}
	
	// is numerical value
	var tmpPrice = $("#itemPrice").val().trim();
	if (!$.isNumeric(tmpPrice))
	{
		return "Insert a numerical value for Item Price."
	}
	
	// convert to decimal price
	$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));
	
	// Description
	if ($("#itemDesc").val().trim() == "")
	{
		return "Insert Item Description.";
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
			 		
			 		$("#divItemsGrid").html(resultSet.data); 
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
		 		$("#hidItemIDSave").val(""); 
		 		$("#formItem")[0].reset(); 
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
		 				 
		 				 $("#divItemsGrid").html(resultSet.data); 
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
