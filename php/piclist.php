<?php
header('Access-Control-Allow-Origin:*');   //任意地址都可以访问
header('Access-Control-Allow-Method:POST,GET');  //跨越请求的方式
include "conn.php";//将conn.php文件导入到这里。引用公共文件的方式。

//查询表taobaogoods下面的所有的数据,将结果集给$result
$result=$conn->query("select * from taobaogoods");

//利用$result生成简单的接口。
// $result->num_rows   记录的条数
// $result->fetch_assoc() 获取查询到的数据，逐条获取。返回值是数组
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();//生成二维数组
}

echo json_encode($arr);//将二维数组输出json格式
