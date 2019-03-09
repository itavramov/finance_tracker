<?php

require_once "config.php";
require_once "util/session_security.php";
//AUTOCOMPLETE
spl_autoload_register(function ($class){
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class) . ".php";
    require_once __DIR__ . DIRECTORY_SEPARATOR . $class;
});

\model\DAO\Connection::init_conn();
session_start();
$ip_address = get_ip_address();
if (!my_session_is_registered('SESSION_IP')) {
    $SESSION_IP = $ip_address;
    my_session_register('SESSION_IP');
}
if ($SESSION_IP != $ip_address) {
    // session ip check failed
    $this_page = $_SESSION['PHP_SELF'];
    my_session_unregister('SESSION_IP');
    session_destroy();
    my_redirect($this_page);
}

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
    if($controllerName == "base" && $methodName == "baseFunc"){
        try{
            $controller->$methodName();
            die();
        }catch (Exception $exception){
            echo "error -> " . $exception->getMessage();
            die();
        }
    }
    if (method_exists($controller,$methodName)){
        if (!($controllerName == "user" && in_array($methodName,array("userLogin","userRegistration")))){
            if (!isset($_SESSION["logged"])){
                header("HTTP/1.0 401 Not Authorized");
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

