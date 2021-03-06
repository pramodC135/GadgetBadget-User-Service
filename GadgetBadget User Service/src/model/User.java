package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import util.DB_Connection;

public class User {
	
	//insert user method
	public String insertUser(String code, String username, String pwd, String email, String role, String fname, String lname, String address, String bod)
	{
		String output = "";
		
	    Calendar calobj = Calendar.getInstance();
	    DateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
		
		try
		{	
			DB_Connection obj_DB_Connection= new DB_Connection();
			Connection con = obj_DB_Connection.connect();
			
			if (con==null)
			{
				return "Error while connecting to users database for inserting.!";
			}
			
			// Create a prepared statement 'userID', ?,
			String query =  " insert into users(`userID`,`userCode`,`username`,`userPwd`,`userEmail`, `userRole`, `userFname`, `userLname`, `userAddress`, `userBod`, `joinDate` )"+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			//blinding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, code);
			preparedStmt.setString(3, username);
			preparedStmt.setString(4, pwd);
			preparedStmt.setString(5, email);
			preparedStmt.setString(6, role);
			preparedStmt.setString(7, fname);
			preparedStmt.setString(8, lname);
			preparedStmt.setString(9, address);
			preparedStmt.setString(10, bod);
			preparedStmt.setString(11, (df.format(calobj.getTime())));
			
			//execute the statement
			preparedStmt.execute();
			con.close();
			
			String newUsers =readUsers();
			output = "{\"status\":\"success\", \"data\":\"" + newUsers + "\"}";
		}
		catch(Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while inserting the User.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	//read user method
	public String readUsers()
	{
		String output = "";

		try
		{
			DB_Connection obj_DB_Connection= new DB_Connection();
			Connection con = obj_DB_Connection.connect();
			if(con == null)
			{
				return "Error while connecting to users database for reading.";
			}
			
			output = "All Users Details";
			
			// Prepare the html table to be displayed
			output = "<table border='1'><tr><th>User Code</th>"
				+ "<th>username</th>"
				+ "<th>Password</th>"
				+ "<th>Email</th>"
				+ "<th>Role</th>"
				+ "<th>First Name</th>"
				+ "<th>Last Name</th>"
				+ "<th>Address</th>"
				+ "<th>Birthday</th>"
				+ "<th>Join Date</th>"
				+ "<th>Update</th><th>Remove</th></tr>";
			
			String query = "select * from users";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			
			// iterate through the rows in the result set
			while(rs.next())
			{
				String userID = Integer.toString(rs.getInt("userID"));
				String userCode = rs.getString("userCode");
				String username = rs.getString("username");
				String userPwd = rs.getString("userPwd");
				String userEmail = rs.getString("userEmail");
				String userRole = rs.getString("userRole");
				String userFname = rs.getString("userFname");
				String userLname = rs.getString("userLname");
				String userAddress = rs.getString("userAddress");
				String userBod = rs.getString("userBod");
				String joinDate = rs.getString("joinDate");
				
				
				// Add a row into the html table
				output += "<tr><td><input id='hidUserIDUpdate' type='hidden' value='" + userID + "'>" + userCode + "</td>";
				output += "<td>" + username + "</td>";
				output += "<td>" + userPwd + "</td>";
				output += "<td>" + userEmail + "</td>";
				output += "<td>" + userRole + "</td>";
				output += "<td>" + userFname + "</td>";
				output += "<td>" + userLname + "</td>";
				output += "<td>" + userAddress + "</td>";
				output += "<td>" + userBod + "</td>";
				output += "<td>" + joinDate + "</td>";
				
				// Buttons
				output += "<td><input name='btnUpdate' type='button' value='Update' "
						+ "class='btnUpdate btn btn-secondary' data-userid='" + userID + "'></td>"
						+ "<td><input name='btnRemove' type='button' value='Remove' "
						+ "class='btnRemove btn btn-danger' data-userid='" + userID + "'></td></tr>";
			}
			
			con.close();
			
			// Complete the html table
			output += "</table>";
		}
		catch(Exception e)
		{
			output = "Error while reading the users.";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	//update user method
	public String updateUser(String id, String code, String username, String pwd, String email, String role, String fname, String lname, String address, String bod)
	{
		String output = "";
		
		try
		{
			DB_Connection obj_DB_Connection= new DB_Connection();
			Connection con = obj_DB_Connection.connect();
			
			if(con == null)
			{
				return "Error while connecting to users database for updating.";
			}
			
			// create a prepared statement
			String query = "UPDATE users SET userCode=?, username=?, userPwd=?, userEmail=?, userRole=?, userFname=?, userLname=?, userAddress=?, userBod=? WHERE userID=?";
			
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setString(1, code);
			preparedStmt.setString(2, username);
			preparedStmt.setString(3, pwd);
			preparedStmt.setString(4, email);
			preparedStmt.setString(5, role);
			preparedStmt.setString(6, fname);
			preparedStmt.setString(7, lname);
			preparedStmt.setString(8, address);
			preparedStmt.setString(9, bod);
			preparedStmt.setInt(10, Integer.parseInt(id));
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newUsers = readUsers();
			output = "{\"status\":\"success\", \"data\":\"" + newUsers + "\"}";
			
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while Updating the User.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	//delete user method
	public String deleteUser(String userID)
	{
		String output = "";
		
		try 
		{
			DB_Connection obj_DB_Connection= new DB_Connection();
			Connection con = obj_DB_Connection.connect();
			
			if(con == null) {
				return"Error while connecting to users databae for deleting.";
			}
			
			//Create a prepared statement
			String query = "delete from users where userID=?";
			
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			//binding the statement
			preparedStmt.setInt(1, Integer.parseInt(userID));
			
			//execute the statement
			preparedStmt.execute();
			con.close();
			
			String newUsers =readUsers();
			output = "{\"status\":\"success\", \"data\":\"" + newUsers + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while Deleting the User.\"}";
			System.err.println(e.getMessage());
		}
	
		return output;
	}

}
