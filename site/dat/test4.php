<?php
	$servername = "localhost";
	$username   = "rdrflmvd_ume"; 
	$password   = "password123";
	$db         = "rdrflmvd_ume";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $db);

	// Check connection
	if ($conn->connect_error) {
		
		die("2. Connection failed: " . $conn->connect_error);
	}else{
		echo "ITS OK!!";
	}
?>