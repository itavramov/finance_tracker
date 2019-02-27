<?php

namespace controller;

use model\Budget;
use model\DAO\BudgetDAO;

class BudgetController
{
    function registerBudget(){

        $budget_name    = $_POST["budget_name"];
        $budget_desc    = $_POST["budget_desc"];
        $category_id    = $_POST["category_id"];
        $current_amount = $_POST["budget_amount"];
        $init_amount    = $_POST["budget_amount"];
        $from_date      = $_POST["from_date"];
        $to_date        = $_POST["to_date"];
        $user_id        = $_SESSION["user_id"];

        //date transformation

//        $from_date = date('Y-m-d',$from_date);
//        $to_date   = date('Y-m-d',$to_date);

        $new_budget = new Budget($user_id,$budget_name,$budget_desc,$init_amount,
            $current_amount,$category_id,$from_date,$to_date);

        $arr = [];

        if (BudgetDAO::addBudget($new_budget)){
            $arr["response"] = "success";
        }else{
            $arr["response"] = "fail";

        }
        echo json_encode($arr);
    }
}