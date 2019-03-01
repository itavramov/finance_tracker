<?php

namespace controller;

use model\DAO\RecordDAO;
use model\Record;

class RecordController{
    function recordRegistration(){
        //TODO VALIDATIONS
        $record_name = $_POST["record_name"];
        $record_desc = $_POST["record_desc"];
        $amount      = $_POST["amount"];
        $category_id = $_POST["category_id"];
        $acc_id      = $_POST["acc_id"];

        $new_record = new Record($record_name,$record_desc,$amount,$category_id,$acc_id);
        $response = [];
        if (RecordDAO::addRecord($new_record)){
            $response["message"] = "success";
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

        $expenses = RecordDAO::getAllExpensesById($user_id);
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
}