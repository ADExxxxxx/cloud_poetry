<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/9/2019
 * Time: 13:07
 */

require_once './lib/database.php';

$conn = connectDb();


$json_string = file_get_contents('json/poetry.json');

// 用参数true把JSON字符串强制转成PHP数组
$data = json_decode($json_string, true);

print_r($data[0]['title']);


for($i = 0; $i<count($data); $i++)
{
    $title = $data[$i]['title'];
    $author = $data[$i]['author'];
    $kind = $data[$i]['kind'];
    $intro = $data[$i]['intro'];
    $content = $data[$i]['content'];
    $key1 = $data[$i]['tianqi'];
    $key2 = $data[$i]['jijie'];
    $key3 = $data[$i]['object'];
    mysqli_query($conn,"INSERT INTO `poetry` (`id`,`title`, `author`, `kind`, `intro`, `content`, `key1`, `key2`, `key3`)
VALUES ('$i', '$title','$author','$kind','$intro','$content','$key1', '$key2','$key3')");
}