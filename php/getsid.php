<?php

include "conn.php";//引入数据库连接。
if(isset($_GET['datasid'])){
    //获取前端传来的数据
    $sid = $_GET['datasid'];
    //返回sid对应的那条条数据给$result
    $result=$conn->query("select * from wphgoods where sid=$sid");
    echo json_encode($result->fetch_assoc());//输出数据，json转换。
}



