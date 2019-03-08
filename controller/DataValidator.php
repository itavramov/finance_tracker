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
        if ($pass1 === $pass2){
            if (preg_match("#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#", $pass1)){
                $clean["pass"] = $pass1;
            } else {
                $clean["pass"] = NULL;
                throw new \Exception("Wrong pass error");
            }
        }
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

    public static function validateUserEdit($email,$fist_name,$last_name,$age){
        $clean = array();
        if (ctype_alpha($fist_name) && ctype_alpha($last_name)){
            $clean["first_name"] = $fist_name;
            $clean["last_name"]  = $last_name;
        }else{
            $clean["first_name"] = NULL;
            $clean["last_name"]  = NULL;
        }

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
            && !empty($clean["age"])){
            return $clean;
        }else{
            return false;
        }
    }

    public static function validateAddAccount($acc_name,$acc_type,$currency,$balance){
        $clean = [];
        if (ctype_alpha($acc_name) && !empty($acc_name)){
            $clean["acc_name"]   = $acc_name;
        }else{
            $clean["acc_name"] = NULL;
        }
        if ($acc_type !== "none"){
            $clean["acc_type"] = $acc_type;
        }else{
            $clean["acc_type"] = NULL;
        }
        if ($currency !== "none"){
            $clean["acc_currency"] = $currency;
        }else{
            $clean["acc_currency"] = NULL;
        }
        if (filter_var($balance,FILTER_VALIDATE_FLOAT,["options" => ["min_range" => 1]])){
            $clean["balance"] = $balance;
        }else{
            $clean["balance"] = NULL;
        }
        if (!empty($clean["acc_name"]) && !empty($clean["acc_type"]) && !empty($clean["acc_currency"])
            && !empty($clean["balance"])){
            return $clean;
        }else{
            return false;
        }
    }

    public static function validateAddRecord($rec_name,$rec_desc,$amount,$account,$category){
        $clean = [];
        if (ctype_alpha($rec_name)){
            $clean["rec_name"]   = $rec_name;
        }else{
            $clean["rec_name"] = NULL;
        }
        if ($rec_desc !== "" || strlen($rec_desc) > 5){
            $clean["rec_desc"]   = $rec_desc;
        }else{
            $clean["rec_desc"] = NULL;
        }
        if (filter_var($amount,FILTER_VALIDATE_FLOAT,["options" => ["min_range" => 1]])){
            $clean["amount"] = $amount;
        }else{
            $clean["amount"] = NULL;
        }
        if ($account !== "none"){
            $clean["acc"] = $account;
        }else{
            $clean["acc"] = NULL;
        }
        if ($category !== "none"){
            $clean["category"] = $category;
        }else{
            $clean["category"] = NULL;
        }
        if (!empty($clean["rec_name"]) && !empty($clean["rec_desc"]) && !empty($clean["amount"])
            && !empty($clean["acc"]) && !empty($clean["category"])){
            return $clean;
        }else{
            return false;
        }
    }

    public static function validateAddBudget($budget_name, $budget_desc, $category, $current_amount,
                                             $from_date, $to_date){
        $clean = [];
        if(ctype_alpha(($budget_name)) && !empty($budget_name)){
            $clean["budget_name"]   = $budget_name;
        }
        else{
            $clean["budget_name"] = NULL;
        }
        if ($budget_desc !== "" || strlen($budget_desc) > 5){
            $clean["budget_desc"]   = $budget_desc;
        }else{
            $clean["budget_desc"] = NULL;
        }
        if ($category !== "none"){
            $clean["category"] = $category;
        }else{
            $clean["category"] = NULL;
        }
        if (filter_var($current_amount,FILTER_VALIDATE_FLOAT,["options" => ["min_range" => 1]])){
            $clean["current_amount"] = $current_amount;
        }else{
            $clean["current_amount"] = NULL;
        }
        if(!empty($from_date)){
            $clean["from_date"] = $from_date;
        }
        else{
            $clean["from_date"] = NULL;
        }
        if(!empty($to_date)){
            $clean["to_date"] = $to_date;
        }
        else{
            $clean["to_date"] = NULL;
        }

        if(!empty($clean["budget_name"]) && !empty($clean["budget_desc"]) && !empty($clean["category"]) &&
            !empty($clean["current_amount"]) && !empty($clean["from_date"]) && !empty($clean["to_date"])){
            return $clean;
        }
        else{
            return false;
        }
    }

    public static function validateAddCategory($cat_name, $cat_type){
        $clean = [];
        if(ctype_alpha(($cat_name)) && !empty($cat_name)){
            $clean["cat_name"]   = $cat_name;
        }
        else{
            $clean["cat_name"] = NULL;
        }

        if ($cat_type !== "none"){
            $clean["cat_type"] = $cat_type;
        }else{
            $clean["cat_type"] = NULL;
        }

        if(!empty($clean["cat_name"]) && !empty($clean["cat_type"])){
            return $clean;
        }
        else{
            return false;
        }
    }
}