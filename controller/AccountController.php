<?php

namespace controller;

use model\Account;
use model\DAO\AccountDAO;

class AccountController{
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
            echo json_encode($arr);
        }else{
            $arr["success"] = false;
            echo json_encode($arr);
        }
    }

    function allUserAccounts(){

            $user_id = $_SESSION["user_id"];
            $accounts = [];
            $accounts = AccountDAO::getAllAccountsById($user_id);
            echo json_encode($accounts);

    }

    function listAllAccounts(){
        $user_id = $_SESSION["user_id"];

        $arr = AccountDAO::getAllAccountsById($user_id);

        echo json_encode($arr);
    }
}

