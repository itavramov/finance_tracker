<?php

namespace model\DAO;

use model\Record;

class RecordDAO extends Connection {

    static function addRecord(Record $record){

        $record_name = $record->getRecordName();
        $record_desc = $record->getRecordDesc();
        $amount      = $record->getAmount();
        $category_id = $record->getCategoryId();
        $acc_id      = $record->getAccId();

        $addRecord_query = "INSERT INTO records (record_name,record_desc,amount,category_id,acc_id,action_date)
                                      VALUES (?,?,?,?,?,curdate())";

        $stmt = self::$conn->prepare($addRecord_query);
        $stmt->execute([$record_name,
                        $record_desc,
                        $amount,
                        $category_id,
                        $acc_id]);

        if(self::$conn->lastInsertId() > 0){
            return true;
        }
        else{
            return false;
        }
    }

}