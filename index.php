<?php

require_once "config.php";
//AUTOCOMPLETE
spl_autoload_register(function ($class){
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class) . ".php";
    require_once __DIR__ . DIRECTORY_SEPARATOR . $class;
});

\model\DAO\Connection::init_conn();
session_start();

function exceptionHandler($exception){
    echo "<h1>Error</h1>" . $exception->getMessage();
}

set_exception_handler("exceptionHandler");

$fileNotExistsFlag = false;
$controllerName = isset($_GET["target"]) ? $_GET["target"] : "base";
$methodName     = isset($_GET["action"]) ? $_GET["action"] : "baseFunc";
$controllerClassName = "\\controller\\" . ucfirst($controllerName) . "Controller";
if (class_exists($controllerClassName)){

    $controller = new $controllerClassName();
    if (method_exists($controller,$methodName)){
        if (!($controllerName == "user" && in_array($methodName,array("userLogin","userRegistration")))){
            if (!isset($_SESSION["logged"])){
                header("Location: view/401.html");
                die();
            }
        }
        try{
            $controller->$methodName();
        }catch (Exception $exception){
            echo "error -> " . $exception->getMessage();
            die();
        }
    }else{
        $fileNotExistsFlag = true;
    }
}else{
    $fileNotExistsFlag = true;
}


if ($fileNotExistsFlag){
    header("Location: view/404.html");
}

