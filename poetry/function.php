﻿<!-- 主要函数模块儿>

<?php
require_once "./lib/config.php";
require_once "./lib/database.php";
require_once "./lib/etc.php";


//查找相关信息
function findElement($obj){
    $conn = connectDb();//连接数据库
    $query = "";//将要执行的sql语句
    $poetrys = array();//存储所有诗
    $title = array();//诗的题目
    $content = array();//诗的内容
    $intro = array();//诗的注释
    $author = array();//诗的作者
    $keys = array_keys(DICT);
    $flag = false;
    $key = "";
    for($i = 0; $i<count($obj); $i++)
    {
        for($j = 0; $j<count($keys); $j++)
        {
            if (strstr($obj[$i],$keys[$j]) != false)
            {
                $flag = true;
                $key = $keys[$j];
                break;
            }
        }
        if ($flag)
        {
            break;
        }
    }
    switch ($key){
        case "月":
            $query = "select * from poetry where key1 = '月' or key2 = '月' or key3 = '月'";
            break;
        case "花":
            $query = "select * from poetry where key1 = '花' or key2 = '花' or key3 = '花'";
            break;
        case "山":
            $query = "select * from poetry where key1 = '月' or key2 = '月' or key3 = '月'";
            break;
        case "水":
            $query = "select * from poetry where key1 = '河' or key2 = '河' or key3 = '河'";
            break;
        case "草":
            $query = "select * from poetry where key1 = '月' or key2 = '月' or key3 = '月'";
            break;
        case "沙":
            $query = "select * from poetry where key1 = '沙' or key2 = '沙' or key3 = '沙'";
            break;
        case "烛":
            $query = "select * from poetry where key1 = '蜡烛' or key2 = '蜡烛' or key3 = '蜡烛'";
            break;
        case "酒":
            $query = "select * from poetry where key1 = '酒' or key2 = '酒' or key3 = '酒'";
            break;
        case "寺":
            $query = "select * from poetry where key1 = '寺庙' or key2 = '寺庙' or key3 = '寺庙'";
            break;
        case "庙":
            $query = "select * from poetry where key1 = '寺庙' or key2 = '寺庙' or key3 = '寺庙'";
            break;
        case "星":
            $query = "select * from poetry where key1 = '星' or key2 = '星' or key3 = '星'";
            break;
        case "人":
            $query = "select * from poetry where key1 = '人' or key1 = '女人' or key2 = '人' or key2 = '女人' or key3 = '人' or key3 = '女人'";
            break;
        case "树":
            $query = "select * from poetry where key1 = '树' or key1 = '树叶' or key1 = '树枝' or key2 = '树' or key2 = '树叶' or key2 = '树枝' or key3 = '树' or key3 = '树叶' or key3 = '树枝'";
            break;
        case "柳":
            $query = "select * from poetry where key1 = '柳树' or key2 = '柳树' or key3 = '柳树'";
            break;
        case "云":
            $query = "select * from poetry where key1 = '云' or key2 = '云' or key3 = '云'";
            break;
        case "日":
            $query = "select * from poetry where key1 = '太阳' or key2 = '太阳' or key3 = '太阳'";
            break;
        case "船":
            $query = "select * from poetry where key1 = '船' or key2 = '船' or key3 = '船'";
            break;
        case "窗":
            $query = "select * from poetry where key1 = '窗户' or key2 = '窗户' or key3 = '窗户'";
            break;
        case "鸟":
            $query = "select * from poetry where key1 = '鸟' or key2 = '鸟' or key3 = '鸟'";
            break;
        case "江":
            $query = "select * from poetry where key1 = '水' or key2 = '水' or key3 = '水'";
            break;
        case "河":
            $query = "select * from poetry where key1 = '水' or key2 = '水' or key3 = '水'";
            break;
        case "湖":
            $query = "select * from poetry where key1 = '水' or key2 = '水' or key3 = '水'";
            break;
        default:
            break;
    }
    $result = mysqli_query($conn, $query." ORDER BY RAND() LIMIT 5");
    $dataCount = mysqli_num_rows($result);
    for($j=0;$j<$dataCount;$j++)
    {
        $result_arr = mysqli_fetch_assoc($result);
        array_push($title, $result_arr["title"]);
        array_push($content, $result_arr["content"]);
        array_push($intro, $result_arr["intro"]);
        array_push($author, $result_arr["author"]);
        $poetry = array(
            "title"=>$result_arr["title"],
            "content"=>$result_arr["content"],
            "intro"=>$result_arr["intro"],
            "author"=>$result_arr["author"],
            "key" =>$key
        );
        array_push($poetrys, $poetry);
    }
    if (count($title) == 0)
    {
        //假如没有查询到
        //do something
        echo "没有查询到相关古诗";
        return false;
    }
    else
    {
        //假如查询到
        //do something

        /*echo "<h1>诗的题目:</h1>";
        var_dump($title);
        echo "<h1>诗的内容:</h1>";
        var_dump($content);*/

        $poetrys = arrangePoetry($poetrys);
        //var_dump($poetrys[0]);
        return $poetrys;
    }
}

//诗句处理，提供返回前端的诗句显示
function arrangePoetry($obj){
    for($i=0;$i < count($obj);$i++)
    {
        $obj[$i]["content"] = str_replace("？", "。", $obj[$i]['content']);
        $sentence = explode("。", $obj[$i]["content"]);
        $sen = array();
        $length = count($sentence);
        if ($length % 2 == 1)
        {
            $length--;
        }
        for($j=0;$j < $length;$j++)
        {
            if (strlen($sentence[$j]) >= 5) {
                if (!strstr($sentence[$j], "？")) {
                    array_push($sen, $sentence[$j] . "。");
                }
            }
            //echo "<p>$sentence[$j]</p>";
        }
        $obj[$i]["sentence"] = $sen;
    }
    return $obj;
}

//对图片进行缩放
function imageManage($filename){
    list($width, $height)=getimagesize($filename);
//缩放比例
    $per=round(400/$width,3);

    $n_w=$width*$per;
    $n_h=$height*$per;
    $new=imagecreatetruecolor($n_w, $n_h);
    $img=imagecreatefromjpeg($filename);
//copy部分图像并调整
    imagecopyresized($new, $img,0, 0,0, 0,$n_w, $n_h, $width, $height);
//图像输出新图片、另存为
    imagejpeg($new, $filename);
    imagedestroy($new);
    imagedestroy($img);
}