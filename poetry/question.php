<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/8/2019
 * Time: 10:52
 */


/* 返回题目 */
require_once "./lib/database.php";

$conn = connectDb();
mysqli_query($conn,"set names 'UTF8'");
$query = mysqli_query($conn, "SELECT * FROM `poetry_question` ORDER BY RAND() LIMIT 1");


$result = mysqli_fetch_assoc($query);
$str = json_encode($result,JSON_UNESCAPED_UNICODE);
echo $str;