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
                                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute(array($user_id,
                            $budget_name,
                            $budget_desc,
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