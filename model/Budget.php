<?php
/**
 * Created by PhpStorm.
 * User: boree
 * Date: 2/26/2019
 * Time: 5:21 PM
 */

namespace model;


class Budget{
    private $budget_id;
    private $user_id;
    private $budget_name;
    private $budget_desc;
    private $init_amount;
    private $current_amount;
    private $category_id;
    private $from_date;
    private $to_date;

    /**
     * Budget constructor.
     * @param $user_id
     * @param $budget_name
     * @param $budget_desc
     * @param $current_amount
     * @param $category_id
     * @param $from_date
     * @param $to_date
     */
    public function __construct($user_id, $budget_name, $budget_desc, $init_amount, $current_amount, $category_id, $from_date, $to_date)
    {
        $this->user_id = $user_id;
        $this->budget_name = $budget_name;
        $this->budget_desc = $budget_desc;
        $this->init_amount = $init_amount;
        $this->current_amount = $current_amount;
        $this->category_id = $category_id;
        $this->from_date = $from_date;
        $this->to_date = $to_date;
    }

    /**
     * @return mixed
     */
    public function getBudgetId()
    {
        return $this->budget_id;
    }

    /**
     * @param mixed $budget_id
     */
    public function setBudgetId($budget_id)
    {
        $this->budget_id = $budget_id;
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * @return mixed
     */
    public function getBudgetName()
    {
        return $this->budget_name;
    }

    /**
     * @param mixed $budget_name
     */
    public function setBudgetName($budget_name)
    {
        $this->budget_name = $budget_name;
    }

    /**
     * @return mixed
     */
    public function getBudgetDesc()
    {
        return $this->budget_desc;
    }

    /**
     * @param mixed $budget_desc
     */
    public function setBudgetDesc($budget_desc)
    {
        $this->budget_desc = $budget_desc;
    }

    /**
     * @return mixed
     */
    public function getCurrentAmount()
    {
        return $this->current_amount;
    }

    /**
     * @param mixed $current_amount
     */
    public function setCurrentAmount($current_amount)
    {
        $this->current_amount = $current_amount;
    }

    /**
     * @return mixed
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param mixed $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return mixed
     */
    public function getFromDate()
    {
        return $this->from_date;
    }

    /**
     * @param mixed $from_date
     */
    public function setFromDate($from_date)
    {
        $this->from_date = $from_date;
    }

    /**
     * @return mixed
     */
    public function getToDate()
    {
        return $this->to_date;
    }

    /**
     * @param mixed $to_date
     */
    public function setToDate($to_date)
    {
        $this->to_date = $to_date;
    }

    /**
     * @return mixed
     */
    public function getInitAmount()
    {
        return $this->init_amount;
    }

    /**
     * @param mixed $init_amount
     */
    public function setInitAmount($init_amount)
    {
        $this->init_amount = $init_amount;
    }
}