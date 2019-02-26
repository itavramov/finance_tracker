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

        self::$conn->beginTransaction();

        try{
            $stmt = self::$conn->prepare("SELECT category_type FROM categories WHERE category_id = ?");
            $stmt->execute(array($category_id));
            $cat_type = $stmt->fetch(\PDO::FETCH_ASSOC);

            $addRecord_query = "INSERT INTO records (record_name,record_desc,amount,category_id,acc_id,action_date)
                                      VALUES (?,?,?,?,?,curdate())";

            $stmt = self::$conn->prepare($addRecord_query);
            $stmt->execute([$record_name,
                $record_desc,
                $amount,
                $category_id,
                $acc_id]);

            if($cat_type["category_type"] == "income"){
                $stmt = self::$conn->prepare("UPDATE accounts SET balance = balance + ? WHERE acc_id = ?");
                $stmt->execute(array($amount, $acc_id));
            }
            else{
                $stmt = self::$conn->prepare("UPDATE accounts SET balance = balance - ? WHERE acc_id = ?");
                $stmt->execute(array($amount, $acc_id));
            }
            self::$conn->commit();
            return true;
        }
        catch (\PDOException $exception){

            echo "error -> " . $exception->getMessage();
            return false;
        }

    }

}