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
    static function addAccount(Account $account, $user_id){
        $name = $account->getAccName();
        $type = $account->getAccType();
        $balance = $account->getBalance();
        $currency = $account->getCurrency();

        $stmt = self::$conn->prepare("INSERT INTO accounts (acc_name, 
                                                              acc_type,
                                                              balance,
                                                              currency,
                                                              user_id)
                                                              VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(array($name, $type, $balance, $currency, $user_id));
        if($stmt->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }
}