<?php

namespace controller;

class DataValidator{
    public static function validateRegistration($email,$pass1,$pass2,$fist_name,$last_name,$age){
        $clean = array();
        if (ctype_alpha($fist_name) && ctype_alpha($last_name)){
            $clean["first_name"] = $fist_name;
            $clean["last_name"]  = $last_name;
        }else{
            $clean["first_name"] = NULL;
            $clean["last_name"]  = NULL;
        }
//        if ($pass1 === $pass2){
            if (preg_match("#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#", $pass1)){
                $clean["pass"] = $pass1;
            } else {
                throw new \Exception("Wrong pass error");
                $clean["pass"] = NULL;
            }
       // }
        if (filter_var($age,FILTER_VALIDATE_INT,["options" => ["min_range" => 18]])){
            $clean["age"] = $age;
        }else{
            $clean["age"] = NULL;
        }
        if (filter_var($email,FILTER_VALIDATE_EMAIL)){
            $clean["email"] = $email;
        }else{
            $clean["email"] = NULL;
        }
        if (!empty($clean["email"]) && !empty($clean["first_name"]) && !empty($clean["last_name"])
            && !empty($clean["age"]) && !empty($clean["pass"])){
            return $clean;
        }else{
            return false;
        }
    }
}