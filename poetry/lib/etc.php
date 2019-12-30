<?php
require_once("C:/XAMPP/htdocs/poetry/baiduAPI/AipImageClassify.php");



function getOpenid($url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($curl, CURLOPT_URL, $url);
    $res = curl_exec($curl);
    curl_close($curl);
    return $res;
}

//图像识别
function imgClassify($image){
    $client = new AipImageClassify(BAIDU_APP_ID, API_KEY, SECRET_KEY);

    $image = file_get_contents($image);


    $client->advancedGeneral($image);

    $test = $client->advancedGeneral($image);
    $keywords = array();
    for($i=0; $i<5; $i++)
    {
        $keyword = $test["result"][$i]["keyword"];
        array_push($keywords, $keyword);
    }
    //var_dump($keywords);

    return $keywords;
}