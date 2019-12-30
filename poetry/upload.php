<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/9/2019
 * Time: 9:30
 */

function upLoadFile($file){
    //var_dump($file);
    $nickname = $_GET['nickname'];
    echo $nickname;
    $filename = "./image/".$nickname.".jpg";
    $filename = iconv("UTF-8","gb2312",$filename);
    move_uploaded_file($_FILES["file"]["tmp_name"],$filename);
}

upLoadFile($_FILES['file']);
