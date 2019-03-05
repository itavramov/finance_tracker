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


}