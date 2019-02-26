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
        $acc_id      = 12;

        $new_record = new Record($record_name,$record_desc,$amount,$category_id,$acc_id);
        $response = [];
        if (RecordDAO::addRecord($new_record)){
            $response["message"] = "success";
        }else{
            $response["message"] = "fail";
        }
        echo json_encode($response);
    }
}