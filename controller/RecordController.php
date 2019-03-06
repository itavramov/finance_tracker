<?php

namespace controller;

use model\DAO\RecordDAO;
use model\Record;

class RecordController{
    function recordRegistration(){
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $record_name = trim($_POST["record_name"]);
            $record_desc = trim($_POST["record_desc"]);
            $amount      = trim($_POST["amount"]);
            $category_id = trim($_POST["category_id"]);
            $acc_id      = trim($_POST["category_id"]);
            $response    = [];

            $clean = DataValidator::validateAddRecord($record_name,$record_desc,$amount,$acc_id,$category_id);
            if ($clean){
                $new_record = new Record($clean["rec_name"],$clean["rec_desc"],$clean["amount"]
                    ,$clean["acc"],$clean["category"]);
                if (RecordDAO::addRecord($new_record)){
                    $response["message"] = "success";
                }else{
                    $response["message"] = "fail";
                }
            }else{
                $response["message"] = "fail";
            }
        }else{
            $response["message"] = "fail";
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

        $sum = RecordDAO::sumAllExpenses($user_id);

        echo  json_encode($sum);
    }
    function chartExpenses(){
        $user_id  = $_SESSION["user_id"];
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date('Y-m-d', strtotime('-1 months'));
            $end_date   = date("Y-m-d");
        }else{
            $start_date = $_POST["start_date"];
            $end_date   = $_POST["end_date"];
        }

        $expenses = RecordDAO::getAllExpensesById($user_id,$start_date,$end_date);
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
        if(empty( $_POST["start_date"])){
            $_POST["start_date"] = date('Y-m-d', strtotime('-1 months'));
        }
        if(empty( $_POST["end_date"])){
            $_POST["end_date"] = date("Y-m-d");
        }

        $allRecords = RecordDAO::getAllRecordsByUserFiltered($user_id, $_POST["start_date"], $_POST["end_date"]);

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
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date('Y-m-d', strtotime('-1 months'));
            $end_date   = date("Y-m-d");
        }else{
            $start_date = $_POST["start_date"];
            $end_date   =  $_POST["end_date"];
        }


        $first_compare_period = RecordDAO::getAllExpensesById($user_id, $start_date, $end_date);

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
        if(empty( $_POST["start_date"]) && empty( $_POST["end_date"])){
            $start_date = date('Y-m-d', strtotime('-1 months'));
            $end_date   = date("Y-m-d");
        }else{
            $start_date = $_POST["start_date"];
            $end_date   = $_POST["end_date"];
        }
        $type = $_POST["type"];
        $avg_income = RecordDAO::getAverage($user_id,$start_date,$end_date,$type);
        echo json_encode($avg_income);
    }
}