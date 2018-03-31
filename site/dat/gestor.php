<?php
	$conn;
	$data;
	
	$_id;
	$_title1;
	$_desc1;
	$_price1;
	$_price2;
	$_pic1;
	$_order1;
	$_order2;
	
	if (!empty($_POST)) {
		
		global $_id, $_title1, $_desc1, $_price1, $_price2, $_pic1, $_order1, $_order2;
		global $data;
		
		connectToDB();
		
		$_id	 = 0;
		$_type	 = 1;
		$_title1 = 2;
		$_desc1	 = 3;
		$_price1 = 4;
		$_price2 = 5;
		$_pic1	 = 6;
		$_order1 = 7;
		$_order2 = 8;
		
		$data	= json_decode($_POST["data"]);
		$method	= $data->method;
		
		switch($method){
			case "data" :
				getData();
				break;
			case "insert" :
				insert();
				break;
			case "updateType" :
				updateType();
				break;
			case "deleteItem" :
				deleteItem();
				break;
			case "sortType" :
				sortType();
				break;
			case "sortItem";
				sortItem();
				break;
			case "updateItem" :
				updateItem();
				break;
		}
	}else{
		echo "Vacio\n";
	}

	// Connect to DB
	function connectToDB(){
		global $conn;
		$servername = "127.0.0.1";
		$username   = "root";
		$password   = "";
		$db         = "ume";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $db);

		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
	}
	
	// Get data
	function getData(){
		global $_id, $_type, $_title1, $_desc1, $_price1, $_price2, $_pic1, $_order1, $_order2;
		global $conn;
		
		$data = array();
		
		$sql = "SELECT DISTINCT type FROM products ORDER BY order1;";
		$result = mysqli_query($conn,$sql);
		while ($row=mysqli_fetch_row($result)) {
			$typeToFind = $row[0];
			$itemSQL =  "SELECT * FROM products WHERE type='$typeToFind' ORDER BY order2";
			$itemResult = mysqli_query($conn,$itemSQL);
			
			$list 	  = array();
			$itemList = array();
			
			$itemList['name'] = $typeToFind;
			$itemList['list'] = array();
			
			while ($item=mysqli_fetch_row($itemResult)) {
				$itemToAd = array();
				$itemToAd[$_id]     = mb_convert_encoding($item[$_id],    "UTF-8", "ISO-8859-1");
				$itemToAd[$_type]   = mb_convert_encoding($item[$_type],  "UTF-8", "ISO-8859-1");
				$itemToAd[$_title1] = mb_convert_encoding($item[$_title1],"UTF-8", "ISO-8859-1");
				$itemToAd[$_desc1]  = mb_convert_encoding($item[$_desc1], "UTF-8", "ISO-8859-1");
				$itemToAd[$_price1] = mb_convert_encoding($item[$_price1],"UTF-8", "ISO-8859-1");
				$itemToAd[$_price2] = mb_convert_encoding($item[$_price2],"UTF-8", "ISO-8859-1");
				$itemToAd[$_pic1]   = mb_convert_encoding($item[$_pic1],  "UTF-8", "ISO-8859-1");
				$itemToAd[$_order1] = mb_convert_encoding($item[$_order1],"UTF-8", "ISO-8859-1");
				$itemToAd[$_order2] = mb_convert_encoding($item[$_order2],"UTF-8", "ISO-8859-1");
				$itemList['list'][] = $itemToAd;
			}
			$data[] = $itemList;
		}
		
		$data = json_encode($data);
		echo $data;
	}
	
	// Category
	function updateType(){
		global $data, $conn;
		
		$lastType    = $data->lastType;
		$currentType = $data->currentType;
		
		$sql = "UPDATE products SET type='$currentType' WHERE type='$lastType'; ";
		if ($conn->query($sql) === TRUE) {
			getData();
		} else {
			echo "Error updating record: " . $conn->error;
		}
	}
	
	// Item
	function insert(){
		global $_id, $_type, $_title1, $_desc1, $_price1, $_price2, $_pic1, $_order1, $_order2;
		global $conn, $data;
		
		$item	= $data->item;
		$id     = $item[$_id];
		$title1 = $item[$_title1];
		$desc1  = $item[$_desc1];
		$price1 = $item[$_price1];
		$price2 = $item[$_price2];
		$pic1   = $item[$_pic1];
		$type   = $item[$_type];
		$order1 = $item[$_order1];
		$order2 = $item[$_order2];
		
		$sql = "INSERT INTO products (type, title1, desc1, price1, price2, pic1, order1, order2) 
				VALUES ('$type', '$title1', '$desc1', '$price1', '$price2', '$pic1', '$order1', '$order2');";

		if ($conn->query($sql) === TRUE) {
			sortType();
		} else {
			echo "Error: " . $sql . "\n" . $conn->error."\n";
		}
	}
	
	// Delete
	function deleteItem(){
		global $data, $conn;
		
		$sql = "DELETE FROM products WHERE id=$data->idToDelete";

		if ($conn->query($sql) === TRUE) {
			getData();
		} else {
			echo "Error deleting record: " . $conn->error;
		}
	}
	
	// Update Item
	function updateItem(){
		global $_id, $_type, $_title1, $_desc1, $_price1, $_price2, $_pic1, $_order1, $_order2;
		global $conn, $data;
		
		$item	= $data->item;
		$id     = $item[$_id];
		$title1 = $item[$_title1];
		$desc1  = $item[$_desc1];
		$price1 = $item[$_price1];
		$price2 = $item[$_price2];
		$pic1   = $item[$_pic1];
		$type   = $item[$_type];
		$order1 = $item[$_order1];
		$order2 = $item[$_order2];
		
		$sql = "UPDATE products 
				SET type='$type', title1='$title1', desc1='$desc1', price1='$price1', price2='$price2', pic1='$pic1', order1='$order1', order2='$order2' 
				WHERE id='$id';";
				
		echo "UPDATE!!!";
		
		if ($conn->query($sql) === TRUE) {
			getData();
		} else {
			echo "Error: " . $sql . "\n" . $conn->error."\n";
		}
	}
	
	// Sort type
	function sortType(){
		global $data, $conn;
		
		$typeOrder = $data->typeOrder;
		for ($i = 0; $i < count($typeOrder); $i++) {
		   $sql = "UPDATE products SET order1=$i WHERE type='$typeOrder[$i]';";
		   if ($conn->query($sql) !== TRUE) {
				echo "Error: " . $sql . "\n" . $conn->error."\n";
			}
		}
		getData();
	}
	
	function sortItem(){
		global $data, $conn;
		
		$itemOrder = $data->itemOrder;
		for ($i = 0; $i < count($itemOrder); $i++) {
		   $sql = "UPDATE products SET order2=$i WHERE id='$itemOrder[$i]';";
		   if ($conn->query($sql) !== TRUE) {
				echo "Error: " . $sql . "\n" . $conn->error."\n";
			}
		}
		getData();
	}
?>