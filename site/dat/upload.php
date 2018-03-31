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
    outputJSON('An error ocurred when uploading.');
}

// Upload file

$fileName = 'Version5-' . $_FILES['SelectedFile']['name'];

if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], '../img/' . $fileName)){
    echo 'Version5 - Error uploading file - check destination is writeable.';
}

// Success!
echo 'Version5 - File uploaded successfully to >> ' . '../img/ << FILE NAME: ' . $fileName . '".', 'success';