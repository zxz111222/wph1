<?php
//设置字符编码。
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');//主机名
define('USERNAME','root');//数据库用户名
define('PASSWORD','123456');//数据库密码
define('DBNAME','h5-2008');//数据库名称

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//$conn:数据库连接对象
//@:容错处理，错误信息不显示。
//自定义的错误处理
if($conn->connect_error){//满足条件，数据库连接有误。
    die('数据库连接错误'.$conn->connect_error);//退出，并输出括号里面的信息
}

//设置字符编码问题。
$conn->query('SET NAMES UTF8');