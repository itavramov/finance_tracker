<?php
/**
 * Created by PhpStorm.
 * User: boree
 * Date: 2/26/2019
 * Time: 5:33 PM
 */

namespace model\DAO;


use model\Budget;

class BudgetDAO extends Connection {
    static function addBudget(Budget $budget){
        $user_id = $budget->getUserId();
        $budget_name = $budget->getBudgetName();
        $budget_desc = $budget->getBudgetDesc();
        $current_amount = $budget->getCurrentAmount();
        $init_amount    = $budget->getInitAmount();
        $category_id = $budget->getCategoryId();
        $from_date = $budget->getFromDate();
        $to_date = $budget->getToDate();

        $stmt = self::$conn->prepare("INSERT INTO budgets (user_id, 
                                                            budget_name, 
                                                            budget_desc,
                                                            init_amount,
                                                            current_amount,
                                                            category_id,
                                                            from_date,
                                                            to_date)
                                                            VALUES (?, ?, ?, ?, ?, ?,
                                                             STR_TO_DATE(?, '%Y-%m-%d'),
                                                             STR_TO_DATE(?, '%Y-%m-%d'))");
        $stmt->execute(array($user_id,
                            $budget_name,
                            $budget_desc,
                            $init_amount,
                            $current_amount,
                            $category_id,
                            $from_date,
                            $to_date));

        if(self::$conn->lastInsertId() > 0){
            return true;
        }
        else{
            return false;
        }
    }
}