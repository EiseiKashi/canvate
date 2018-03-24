<?php
// Output JSON
function outputJSON($msg, $status = 'error'){
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $msg,
        'status' => $status
    )));
}

// Check for errors
if($_FILES['SelectedFile']['error'] > 0){
    echo 'ERROR';
}

// Upload file
$fileName = $_FILES['SelectedFile']['name'];

if(move_uploaded_file($_FILES['SelectedFile']['tmp_name'], '../img/' . $fileName)){
    echo 'OK';
}else{
	echo 'ERROR';
}