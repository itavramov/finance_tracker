<?php

namespace controller;

use model\Budget;
use model\DAO\BudgetDAO;

class BudgetController
{
    function registerBudget(){
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $budget_name = $_POST["budget_name"];
            $budget_desc = $_POST["budget_desc"];
            $category_id = $_POST["category_id"];
            $current_amount = $_POST["budget_amount"];
            $init_amount = $_POST["budget_amount"];
            $from_date = $_POST["from_date"];
            $to_date = $_POST["to_date"];
            $user_id = $_SESSION["user_id"];
            $arr = [];

            //date transformation

//        $from_date = date('Y-m-d',$from_date);
//        $to_date   = date('Y-m-d',$to_date);
            $clean = DataValidator::validateAddBudget($budget_name, $budget_desc, $category_id, $current_amount, $from_date,
                $to_date);

            if($clean){
                $new_budget = new Budget($user_id, $budget_name, $budget_desc, $init_amount,
                    $current_amount, $category_id, $from_date, $to_date);
                if (BudgetDAO::addBudget($new_budget)) {
                    $arr["response"] = "success";
                } else {
                    $arr["response"] = "fail";
                }
            }
            else{
                $arr["response"] = "fail";
            }
        }
        else{
            $arr["response"] = "fail";
        }
        echo json_encode($arr);
    }

    function listAllBudgets(){
        $user_id = $_SESSION["user_id"];
        if(empty( $_POST["start_date"])){
            $_POST["start_date"] = date('Y-m-d', strtotime('-1 months'));
        }
        if(empty( $_POST["end_date"])){
            $_POST["end_date"] = date("Y-m-d");
        }

        $sum = BudgetDAO::getAllBudgetsById($user_id, $_POST["start_date"], $_POST["end_date"]);

        echo  json_encode($sum);
    }
}