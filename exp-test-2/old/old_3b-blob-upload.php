<?php
$target_dir = "localhost/scif/data";
$target_file = $target_dir . basename($_FILES["upfile"]["name"]);
$uploadOk = 1;
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
    if (move_uploaded_file($_FILES["upfile"]["tmp_name"], $target_file)) {
      echo "The file ". htmlspecialchars( basename( $_FILES["upfile"]["name"])). " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }
?>