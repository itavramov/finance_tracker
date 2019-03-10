<?php

namespace controller;

use interfaces\Editable;
use model\DAO\UserDAO;

use model\User;
use mysql_xdevapi\Exception;


class UserController implements Editable {

    function userRegistration(){

        if (isset($_POST["register"]) && $_SERVER["REQUEST_METHOD"] == "POST"){
            $first_name = trim($_POST["first_name"]);
            $last_name  = trim($_POST["last_name"]);
            $email      = trim($_POST["email"]);
            $age        = trim($_POST["age"]);
            $password_1 = trim($_POST["password_1"]);
            $password_2 = trim($_POST["password_2"]);
            $user_image = $_FILES["user_image"]["tmp_name"];


            //$image_url = "view/uploads/user_image/noPicture.png";
            if (!empty($first_name) && !empty($last_name) && !empty($email)
                && !empty($age) && !empty($password_1) && !empty($password_2)){

                if (empty($_FILES["user_image"]["tmp_name"])){
                    //TODO MORE VALIDATIONS
                    $image_url = "uploads/user_image/noPicture.png";
                }else{

                    if(move_uploaded_file($user_image, "view/uploads/user_image/". $first_name.time() . ".jpg")){
                        $image_url = "uploads/user_image/". $first_name.time() . ".jpg";
                    }
                }
                $cleanVars = DataValidator::validateRegistration($email,$password_1,$password_2,$first_name,$last_name,$age);
                if ($cleanVars){
                    if(UserDAO::getIdByEmail($cleanVars["email"])){
                        throw new \Exception("User already exists");
                    }
                    else{
                        $user = new User($cleanVars["first_name"], $cleanVars["last_name"],
                            $cleanVars["email"], $cleanVars["age"], password_hash($cleanVars["pass"],
                                PASSWORD_BCRYPT, ['cost'=>12]), $image_url);
                        //var_dump($user);
                        $result["success"] = UserDAO::addUser($user);
                        $_SESSION["logged"] = true;
                        $_SESSION["email"] = $email;
                        $_SESSION["user_id"] = UserDAO::getIdByEmail($email);
                        header("Location: view/dashboard.html");
                    }
                }else{
                    throw new \Exception("Invalid credentials...");
                }
            }else{
                throw new \Exception("Empty credentials...");
            }
        }
    }

    function userLogin(){
        //TODO REFRESH LOGIC

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $_POST["email"];
            $password = $_POST["pass"];
            $db_pass = UserDAO::getPassByEmail($email);
            $result = [];
            if (password_verify($password, $db_pass)) {
                //TODO UserDAO getUserInfoByMail() -> insert in the session array
                $_SESSION["logged"] = true;
                $_SESSION["email"] = $email;
                $_SESSION["user_id"] = UserDAO::getIdByEmail($email);
                $result["message"] = "success";
            } else {
                $result["message"] = "fail";
            }
            echo json_encode($result);
        }
    }

    function userData(){
        echo json_encode(UserDAO::getInfoById($_SESSION["user_id"]));
    }

    function userLogout(){
        session_destroy();
        $arr = [];
        $arr["message"] = "true";
        echo json_encode($arr);
    }

    function edit(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $user_id = $_POST["user_id"];
            $first_name = trim($_POST["first_name"]);
            $last_name = trim($_POST["last_name"]);
            $email = trim($_POST["email"]);
            $age = trim($_POST["age"]);
            $image_url = $_FILES["user_image"]["tmp_name"];
            $current_user = UserDAO::getInfoById($user_id);

            //$image_url = "view/uploads/user_image/noPicture.png";
            if (!empty($first_name) && !empty($last_name) && !empty($email) && !empty($age)){
                    if (empty($_FILES["user_image"]["tmp_name"])){
                        //TODO MORE VALIDATIONS
                        $image_url = "uploads/user_image/default.png";
                    }else{
                        if(move_uploaded_file($image_url, "view/uploads/user_image/". $first_name.time() . ".jpg")){
                            $image_url = "uploads/user_image/". $first_name.time() . ".jpg";
                        }
                }

            $cleanVars = DataValidator::validateUserEdit($email,$first_name,$last_name,$age);
                if ($cleanVars){
                    if(UserDAO::getIdByEmail($cleanVars["email"]) && $current_user["email"] != $cleanVars["email"]){
                        throw new \Exception("User already exists");
                    }
                    else{
                        $pass = UserDAO::getPassById($user_id);

                        $user = new User($cleanVars["first_name"], $cleanVars["last_name"],
                            $cleanVars["email"], $cleanVars["age"],$pass, $image_url);
                        UserDAO::updateUser($user, $user_id);
                        header("Location: view/dashboard.html");

                    }
                }else{
                    throw new \Exception("Invalid credentials...");
                }
            }else{
                throw new \Exception("Empty credentials...");
            }
        }
    }

    function checkUserExists(){
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $_POST["email"];

            if(UserDAO::getIdByEmail($email)){
                $response["message"] = true;
            }
            else{
                $response["message"] = false;
            }
            echo json_encode($response);
        }
        else{
            header("HTTP/1.0 404 Not Found");
        }
    }
}