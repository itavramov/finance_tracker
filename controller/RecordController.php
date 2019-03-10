<?php

namespace controller;

use model\DAO\RecordDAO;
use model\Record;
use util\Constants;

class RecordController{
    function recordRegistration(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $record_name = trim($_POST["record_name"]);
            $record_desc = trim($_POST["record_desc"]);
            $amount      = trim($_POST["amount"]);
            $category_id = trim($_POST["category_id"]);
            $acc_id      = trim($_POST["acc_id"]);
            $response    = [];

            $clean = DataValidator::validateAddRecord($record_name,$record_desc,$amount,$acc_id,$category_id);

            if ($clean){
                $new_record = new Record($clean["rec_name"],$clean["rec_desc"],$clean["amount"],$clean["category"],$clean["acc"]);
                if (RecordDAO::addRecord($new_record)){
                    $response["message"] = "success";
                }else{
                    $response["message"] = "fail";
                }
            }else{
                $response["message"] = "fail";
            }
        }else{
            header("HTTP/1.0 404 Not Found");
        }
        echo json_encode($response);
    }
    function listRecords(){
        $user_id = $_SESSION["user_id"];
        $allRecords = RecordDAO::getAllRecordsByUser($user_id);
        $result = [];
        foreach ($allRecords as $allRecord) {
            $result[] = array_values(get_object_vars($allRecord));
        }
        echo json_encode(array_values($result));
    }
    function getSumTotal(){
        $user_id = $_SESSION["user_id"];
        if(empty($_POST["acc_id"])){
            $acc_id = "0";
        }
        else{
            $acc_id = $_POST["acc_id"];
        }
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date(Constants::DATE_FORMAT_PHP, strtotime('-1 months'));
            $end_date   = date(Constants::DATE_FORMAT_PHP);
        }else{
            $start_date = $_POST["start_date"];
            $end_date   = $_POST["end_date"];
        }
        $sum = RecordDAO::sumAllExpenses($user_id, $start_date, $end_date, $acc_id);
        if(empty($sum[0]["total_sum"])){
            $sum[0]["total_sum"] = "0";
        }
        if(empty($sum[0]["total_sum"])){
            $sum[1]["total_sum"] = "0";
        }
        echo json_encode($sum);
    }
    function chartExpenses(){
        $user_id  = $_SESSION["user_id"];
        if(empty($_POST["acc_id"])){
            $acc_id = "0";
        }
        else{
            $acc_id = $_POST["acc_id"];
        }
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date(Constants::DATE_FORMAT_PHP, strtotime('-1 months'));
            $end_date   = date(Constants::DATE_FORMAT_PHP);
        }else{
            $start_date = $_POST["start_date"];
            $end_date   = $_POST["end_date"];
        }

        $expenses = RecordDAO::getAllExpensesById($user_id,$start_date,$end_date, $acc_id);
        $labels   = [];
        $data     = [];
        $arr      = [];

        foreach ($expenses as $expens) {
            $labels[] = $expens["category_name"];
            $data[]   = $expens["sum"];
        }

        $arr[] = $labels;
        $arr[] = $data;

        echo json_encode($arr);
    }

    function listLastFiveRecords(){
        $user_id = $_SESSION["user_id"];

        $arr = RecordDAO::getLastFiveRecordsById($user_id);

        echo json_encode($arr);
    }

    function listIncomesAndExpense(){
        $user_id = $_SESSION["user_id"];
        if(empty($_POST["acc_id"])){
            $acc_id = "0";
        }
        else{
            $acc_id = $_POST["acc_id"];
        }
        if(empty( $_POST["start_date"])){
            $_POST["start_date"] = date(Constants::DATE_FORMAT_PHP, strtotime('-1 months'));
        }
        if(empty( $_POST["end_date"])){
            $_POST["end_date"] = date(Constants::DATE_FORMAT_PHP);
        }

        $allRecords = RecordDAO::getAllRecordsByUserFiltered($user_id, $_POST["start_date"], $_POST["end_date"],
            $acc_id);

        $labels_expense = [];
        $labels_income = [];
        $data_expense = [];
        $data_income = [];
        $arr = [];

        foreach ($allRecords as $allRecord) {
            if($allRecord["category_type"] == "expense"){
                $labels_expense[] = $allRecord["action_date"];
                $data_expense[] = $allRecord["amount"];
            }
            else{
                $labels_income[] = $allRecord["action_date"];
                $data_income[] = $allRecord["amount"];
            }
        }

        $arr[] = $labels_expense;
        $arr[] = $data_expense;
        $arr[] = $labels_income;
        $arr[] = $data_income;

        echo json_encode(array_values($arr));
    }

    function radarDiagramExpenses(){
        $user_id  = $_SESSION["user_id"];
        if(empty($_POST["acc_id"])){
            $acc_id = "0";
        }
        else{
            $acc_id = $_POST["acc_id"];
        }
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date(Constants::DATE_FORMAT_PHP, strtotime('-1 months'));
            $end_date   = date(Constants::DATE_FORMAT_PHP);
        }else{
            $start_date = $_POST["start_date"];
            $end_date   =  $_POST["end_date"];
        }
        $first_compare_period = RecordDAO::getAllExpensesById($user_id, $start_date, $end_date, $acc_id);
        $labels   = [];
        $data     = [];
        $arr      = [];

        foreach ($first_compare_period as $expens) {
            $labels[] = $expens["category_name"];
            $data[]   = $expens["sum"];
        }

        $arr[] = $labels;
        $arr[] = $data;

        echo json_encode($arr);
    }

    function averageIncomeInfo(){
        $user_id  = $_SESSION["user_id"];
        $acc_id = $_POST["acc_id"];
        //var_dump($acc_id);
        $avg_income = RecordDAO::getAverageIncome($user_id, $acc_id);
        echo json_encode($avg_income);
    }

    function averageExpenseInfo(){
        $user_id  = $_SESSION["user_id"];
        $acc_id = $_POST["acc_id"];
        $avg_expense = RecordDAO::getAverageExpense($user_id, $acc_id);
        echo json_encode($avg_expense);
    }
}