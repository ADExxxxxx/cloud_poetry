<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/7/2019
 * Time: 9:57
 */

require_once ("./lib/config.php");
require_once("./lib/etc.php");
require_once ("./lib/database.php");
//获取小程序前端上传的值
$code = $_GET['code'];
echo "code:".$code;
$nickName = $_GET['nickName'];
echo  "\nnickname:".$nickName;
$avatarUrl = $_GET['avatarUrl'];
echo "\navatarUrl:" . $avatarUrl;
//api接口
//https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
$api = "https://api.weixin.qq.com/sns/jscode2session?appid=".APP_ID."&secret=".APP_SECRET."&js_code={$code}&grant_type=authorization_code";
//发送
$request = json_decode(getOpenid($api));
print_r(getOpenid($api));
$openid = $request->openid;
$session_key = $request->session_key;
echo "\nopenid:".$openid;
echo "\nsession_key:".$session_key;
$conn = connectDb();
$query = mysqli_query($conn, "SELECT * FROM `poetry_user` WHERE openid='$openid'");
$num = $query->num_rows;
if($num <= 0)
	mysqli_query($conn, "INSERT INTO `poetry_user` (`session_key`, `openid`, `nickname`, `avatarUrl`) VALUES ('$session_key', '$openid', '$nickName', '$avatarUrl')");

		