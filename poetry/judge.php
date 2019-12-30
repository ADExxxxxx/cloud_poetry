<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/8/2019
 * Time: 11:24
 */
require_once "./lib/database.php";

$id = (int)$_GET['id'];
$answer = (int)$_GET['answer'];

$conn = connectDb();
mysqli_query($conn,"set names 'UTF8'");
$query = mysqli_query($conn, "SELECT * FROM `poetry_question` WHERE id = '$id'");


$result = mysqli_fetch_assoc($query);

$result_content = (int)$result['answer'];
if($answer == $result_content){
    echo "1";
}else{
    echo "0";
}