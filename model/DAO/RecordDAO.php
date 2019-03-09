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


            $addRecord_query = "INSERT INTO records (record_name,
                                                      record_desc,
                                                      amount,
                                                      category_id,
                                                      acc_id,
                                                      action_date)
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
                $stmt2 = self::$conn->prepare("SELECT budget_id FROM budgets WHERE category_id = ? AND 
                                                          curdate() BETWEEN from_date AND to_date");
                $stmt2->execute(array($category_id));
                if($stmt2->rowCount() > 0){
                    $row = $stmt2->fetch(\PDO::FETCH_ASSOC);
                    $stmt = self::$conn->prepare("UPDATE budgets SET current_amount = current_amount - ? 
                                                            WHERE budget_id = ?");
                    $stmt->execute(array($amount, $row["budget_id"]));
                }

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

    static function getAllRecordsByUser($user_id){

        $records_query = "SELECT  r.record_name, 
                                  r.record_desc, 
                                  r.amount, 
                                  r.action_date, 
                                  s.category_name, 
                                  s.category_type
                            FROM records r
                            JOIN categories s ON (r.category_id = s.category_id)
                            JOIN accounts a ON (a.acc_id = r.acc_id)
                            JOIN users u ON (u.user_id = a.user_id)
                            WHERE u.user_id = ?";



        $stmt = self::$conn->prepare($records_query);
        $stmt->execute(array($user_id));
        $result = [];
        $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
        return $result;
    }

    static function sumAllExpenses($user_id, $start_date, $end_date){
        $sum_query = "SELECT category_type, 
                                SUM(r.amount) as total_sum
                            FROM records r
                            JOIN categories s ON (r.category_id = s.category_id)
                            JOIN accounts a ON (a.acc_id = r.acc_id)
                            JOIN users u ON (u.user_id = a.user_id)
                            WHERE u.user_id = ? AND r.action_date BETWEEN STR_TO_DATE(?, '%Y-%m-%d') AND
                                  STR_TO_DATE(?, '%Y-%m-%d')
                            GROUP BY category_type";

        $stmt = self::$conn->prepare($sum_query);
        $stmt->execute(array($user_id, $start_date, $end_date));
        $result = [];
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    static function getAllExpensesById($user_id, $start_date, $end_date){
        $get_query = "SELECT c.category_name,SUM(r.amount) AS sum 
                      FROM records AS r 
                      JOIN categories AS c ON (c.category_id = r.category_id)
                      JOIN accounts AS a ON(a.acc_id = r.acc_id)
                      WHERE a.user_id = ? AND c.category_type = 'expense' 
                      AND r.action_date BETWEEN STR_TO_DATE(?, '%Y-%m-%d') AND
                                  STR_TO_DATE(?, '%Y-%m-%d')
                      GROUP BY c.category_id";
        $stmt   = self::$conn->prepare($get_query);
        $stmt->execute(array($user_id,$start_date,$end_date));
        //TODO VALIDATION
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    static function getLastFiveRecordsById($user_id){
        $get_query = "SELECT c.category_name,
                            a.acc_name,
                            r.amount,
                            r.action_date,
                            c.category_type
                        FROM records r    
                        JOIN accounts a ON (r.acc_id = a.acc_id)
                        JOIN categories c ON (r.category_id = c.category_id)
                        WHERE a.user_id = ?
                        ORDER BY r.action_date DESC
                        LIMIT 0, 5";
        $stmt = self::$conn->prepare($get_query);
        $stmt->execute(array($user_id));
        $result = [];
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    static function getAverage($user_id, $start_date, $end_date, $type){
        $query = "SELECT ROUND(AVG(r.amount),2) AS average FROM records AS r 
                      JOIN categories AS c ON (c.category_id = r.category_id)
                      JOIN accounts AS a ON(a.acc_id = r.acc_id)
                      WHERE a.user_id = ? AND c.category_type = ?
                      AND r.action_date BETWEEN STR_TO_DATE(?, '%Y-%m-%d')
                      AND STR_TO_DATE(?, '%Y-%m-%d')";
        $stmt  = self::$conn->prepare($query);
        $stmt->execute(array($user_id,$type,$start_date,$end_date));
        $result = [];
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }

    static function getAllRecordsByUserFiltered($user_id, $start_date, $end_date){

        $records_query = "SELECT  r.record_name, 
                                  r.record_desc, 
                                  r.amount, 
                                  r.action_date, 
                                  s.category_name, 
                                  s.category_type
                            FROM records r
                            JOIN categories s ON (r.category_id = s.category_id)
                            JOIN accounts a ON (a.acc_id = r.acc_id)
                            JOIN users u ON (u.user_id = a.user_id)
                            WHERE u.user_id = ? AND r.action_date BETWEEN STR_TO_DATE(?, '%Y-%m-%d') AND
                                  STR_TO_DATE(?, '%Y-%m-%d')";



        $stmt = self::$conn->prepare($records_query);
        $stmt->execute(array($user_id, $start_date, $end_date));
        $result = [];
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }
}