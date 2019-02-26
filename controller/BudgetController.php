<?php

namespace controller;

class BudgetController
{
    function registerBudget()
    {
        $budget_name = $_POST["budget_name"];
        $budget_desc = $_POST["budget_desc"];
        $category = $_POST["categorySelectBudget"];
        $current_amount = $_POST["budget_amount"];
        $init_amount = $_POST["budget_amount"];
        $from_date = $_POST["from_date"];
        $to_date = $_POST["to_date"];
        $user_id = $_SESSION["user_id"];

    }
}