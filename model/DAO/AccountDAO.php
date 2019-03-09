<?php
/**
 * Created by PhpStorm.
 * User: boree
 * Date: 2/25/2019
 * Time: 7:51 PM
 */

namespace model\DAO;

use model\Account;

class AccountDAO extends Connection {
    static function addAccount(Account $account){
        $name = $account->getAccName();
        $type = $account->getAccType();
        $balance = $account->getBalance();
        $currency = $account->getCurrency();
        $user_id  = $account->getUserId();

        $stmt = self::$conn->prepare("INSERT INTO accounts (acc_name, 
                                                              acc_type,
                                                              balance,
                                                              currency,
                                                              user_id)
                                                              VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(array($name, $type, $balance, $currency, $user_id));

        if(self::$conn->lastInsertId() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    static function getAllAccountsById($user_id){
        try{
            $stmt = self::$conn->prepare("SELECT acc_id,acc_name,balance,currency 
                                                    FROM accounts 
                                                    WHERE user_id = ?");
            $stmt->execute(array($user_id));
            $accounts = [];
            $accounts = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $accounts;
        }
        catch (\PDOException $exception){
            echo 'Problem with db categories ->' . $exception->getMessage();
        }

    }

    static function updateAccount(Account $account, $acc_id){
        $acc_name   = $account->getAccName();
        $acc_type   = $account->getAccType();
        $balance    = $account->getBalance();
        $currency   = $account->getCurrency();

        $flagIsset     = false;
        $query         = "UPDATE accounts SET ";
        $executeParams = [];

        if ($acc_name !== "none"){
            $query .= "acc_name = ? ";
            $executeParams[] = $acc_name;
            $flagIsset = true;
        }
        if ($acc_type !== "none"){
            if (!$flagIsset){
                $query .= "acc_type = ? ";
                $flagIsset = true;
            }else{
                $query .= ",acc_type = ? ";
            }
            $executeParams[] = $acc_type;
        }
        if ($balance !== "none"){
            if (!$flagIsset){
                $query .= "balance = ? ";
                $flagIsset = true;
            }else{
                $query .= ",balance = ? ";
            }
            $executeParams[] = $balance;
        }
        if ($currency !== "none"){
            if (!$flagIsset){
                $query .= "acc_type = ? ";
                //$flagIsset = true;
            }else{
                $query .= ",acc_type = ? ";
            }
            $executeParams[] = $acc_type;
        }
        $executeParams[] = $acc_id;
        $query          .= "WHERE acc_id = ?";

        $stmt = self::$conn->prepare($query);
        $stmt->execute($executeParams);
        if ($stmt->rowCount() !== 0){
            return true;
        }else{
            return false;
        }
    }

    static function deleteAccount($acc_id){
        $query = "DELETE FROM accounts WHERE acc_id = ?";
        $stmt  = self::$conn->prepare($query);
        $stmt->execute(array($acc_id));
        if ($stmt->rowCount() !== 0){
            return true;
        }else{
            return false;
        }
    }

    static function getAccountInfo($acc_id){
        $getQuery = "SELECT acc_name,acc_type,balance,currency 
                  FROM accounts WHERE acc_id = ?";
        $stmt     = self::$conn->prepare($getQuery);
        $stmt->execute(array($acc_id));
        $acc_info = $stmt->fetch(\PDO::FETCH_ASSOC);
        if ($stmt->rowCount() !== 0){
            return $acc_info;
        }else{
            return false;
        }
    }
}