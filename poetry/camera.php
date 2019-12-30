<!--  图像识别顶层>

<?php
require_once "function.php";
require_once "./lib/etc.php";

$nickname = $_GET['nickname'];
$filename = "./image/".$nickname.".jpg";
imageManage($filename);
$keys = imgClassify($filename);

$result = findElement($keys);


echo json_encode($result, JSON_UNESCAPED_UNICODE);