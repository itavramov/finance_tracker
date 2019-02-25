<?php

namespace controller;

use model\DAO\UserDAO;

use model\User;
use mysql_xdevapi\Exception;


class UserController{

    function userRegistration(){

        if (isset($_POST["register"])){
            $first_name = $_POST["first_name"];
            $last_name  = $_POST["last_name"];
            $email      = $_POST["email"];
            $age        = $_POST["age"];
            $password_1 = $_POST["password_1"];
            $password_2 = $_POST["password_2"];
            $user_image = $_FILES["user_image"]["tmp_name"];


            //$image_url = "view/uploads/user_image/noPicture.png";
            if (!empty($first_name) && !empty($last_name) && !empty($last_name) && !empty($email)
                && !empty($age) && !empty($password_1) && !empty($password_2)){
                if (empty($_FILES["user_image"]["tmp_name"])){
                    //TODO MORE VALIDATIONS
                    $image_url = "view/uploads/user_image/noPicture.png";
                }else{
                    if(move_uploaded_file($user_image, "view/uploads/user_image/". $first_name.time() . ".jpg")){
                        $image_url = "view/uploads/user_image/". $first_name.time() . ".jpg";
                    }
                }
                $cleanVars = DataValidator::validateRegistration($email,$password_1,$password_2,$first_name,$last_name,$age);
                if ($cleanVars){
                    if(UserDAO::getEmailByEmail($cleanVars["email"])){
                        throw new \Exception("User already exists");
                    }
                    else{
                        $user = new User($cleanVars["first_name"], $cleanVars["last_name"],
                            $cleanVars["email"], $cleanVars["age"], password_hash($cleanVars["pass"], PASSWORD_BCRYPT, ['cost'=>12]), $image_url);
                        UserDAO::addUser($user);
                        header('Location: view/main.html');
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

    }

    function logout(){

    }

}