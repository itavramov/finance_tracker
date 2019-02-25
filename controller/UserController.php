<?php

namespace controller;

use model\DAO\UserDAO;
use model\User;

class UserController{

    function userRegistration(){
        //TODO POST VARIABLES
        $first_name = $_POST["first_name"];
        $last_name = $_POST["last_name"];
        $email = $_POST["email"];
        $age = $_POST["age"];
        $password_1 = $_POST["password_1"];
        $password_2 = $_POST["password_2"];
        $user_image = $_FILES["user_image"]["tmp_name"];

        //TODO VALIDATE VARIABLES

        if(move_uploaded_file($user_image, "view/uploads/user_image/". $first_name.time() . ".jpg")){
            $image_url = "view/uploads/user_image/". $first_name.time() . ".jpg";
        }

        $user = new User($first_name, $last_name, $email, $age, $password_1, $image_url);

        UserDAO::addUser($user);

        //TODO CHECK IF EMPTY
        header('Location: view/main.html');
    }

    function userLogin(){
        echo "login";
    }

    function logout(){

    }

}