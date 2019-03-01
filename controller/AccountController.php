<?php

namespace controller;

use model\Account;
use model\DAO\AccountDAO;

class AccountController{
    function regAccount(){
        //TODO REQUEST METHOD VALIDATION
        $acc_name      = $_POST["acc_name"];
        $acc_type      = $_POST["acc_type"];
        $balance       = $_POST["balance"];
        $acc_currency  = $_POST["acc_currency"];
        $user_id       = $_SESSION["user_id"];

        $acc = new Account($acc_name,$acc_type,$balance,$acc_currency,$user_id);

        $arr["success"] = AccountDAO::addAccount($acc);
        echo json_encode($arr);
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

