<?php

namespace controller;

use interfaces\Editable;
use model\Account;
use model\DAO\AccountDAO;

class AccountController implements Editable{
    function regAccount(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $acc_name      = trim($_POST["acc_name"]);
            $acc_type      = trim($_POST["acc_type"]);
            $balance       = trim($_POST["balance"]);
            $acc_currency  = trim($_POST["acc_currency"]);
            $user_id       = $_SESSION["user_id"];

            $clean = DataValidator::validateAddAccount($acc_name,$acc_type,$acc_currency,$balance);
            if ($clean){
                $acc = new Account($clean["acc_name"],$clean["acc_type"],$clean["balance"],
                                    $clean["acc_currency"],$user_id);
                $arr["success"] = AccountDAO::addAccount($acc);
            }else{
                $arr["success"] = false;
            }
        }else{
            header("HTTP/1.0 404 Not Found");
        }
        echo json_encode($arr);
    }

    function allUserAccounts(){

            $user_id = $_SESSION["user_id"];
            $accounts = [];
            $accounts = AccountDAO::getAllAccountsById($user_id);
            echo json_encode($accounts);

    }

    public function edit(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){

            $acc_id        = trim($_POST["acc_id"]);
            $acc_name      = trim($_POST["acc_name"]);
            $acc_type      = trim($_POST["acc_type"]);
            $balance       = trim($_POST["balance"]);
            $acc_currency  = trim($_POST["acc_currency"]);
            $user_id       = $_SESSION["user_id"];

            if ($acc_name === ""){
                $acc_name = "none";
            }
            if ($balance === ""){
                $balance = "none";
            }
            $accEdited = new Account($acc_name,$acc_type,$balance,$acc_currency,$user_id);
            $response  = AccountDAO::updateAccount($accEdited, $acc_id);

            if ($response){
                $arr["success"] = "done";
            }else{
                $arr["success"] = "fail";
            }

        }else{
            header("HTTP/1.0 404 Not Found");
        }
        echo json_encode($arr);
    }

    public function deleteAccount(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $acc_id  = trim($_POST["acc_id"]);
            $result  = AccountDAO::deleteAccount($acc_id);
            if ($result){
                $arr["success"] = "done";
            }else{
                $arr["success"] = "fail";
            }
        }else{
            header("HTTP/1.0 404 Not Found");
        }
        echo json_encode($arr);
    }

    public function accountInfo(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $acc_id  = trim($_POST["acc_id"]);
            $result  = AccountDAO::getAccountInfo($acc_id);
            if ($acc_id){
                echo json_encode($result);
            }
        }else{
            header("HTTP/1.0 404 Not Found");
        }
    }
}

