<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/7/2019
 * Time: 10:53
 */
require_once 'config.php';
function connectDb(){
    $conn=mysqli_connect(SERVER_NAME,USERNAME,PASSWORD);//登录我们的数据库
    if(!$conn)//判断是否连接上数据库
    {
        die('Can not connect database');
    }

    mysqli_select_db($conn,DB_NAME);//连接我们所需要的数据库
    mysqli_query($conn,"set names 'UTF8'");//设置我们的编码格式
    return $conn;
}