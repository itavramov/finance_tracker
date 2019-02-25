<?php

namespace model;

class Account{
    private $acc_id;
    private $acc_name;
    private $acc_type;
    private $balance;
    private $currency;
    private $user_id;

    /**
     * Account constructor.
     * @param $acc_name
     * @param $acc_type
     * @param $balance
     * @param $currency
     * @param $user_id
     */
    public function __construct($acc_name, $acc_type, $balance, $currency, $user_id)
    {
        $this->acc_name = $acc_name;
        $this->acc_type = $acc_type;
        $this->balance = $balance;
        $this->currency = $currency;
        $this->user_id = $user_id;
    }


    /**
     * @return mixed
     */
    public function getAccId()
    {
        return $this->acc_id;
    }

    /**
     * @param mixed $acc_id
     */
    public function setAccId($acc_id)
    {
        $this->acc_id = $acc_id;
    }

    /**
     * @return mixed
     */
    public function getAccName()
    {
        return $this->acc_name;
    }

    /**
     * @param mixed $acc_name
     */
    public function setAccName($acc_name)
    {
        $this->acc_name = $acc_name;
    }

    /**
     * @return mixed
     */
    public function getAccType()
    {
        return $this->acc_type;
    }

    /**
     * @param mixed $acc_type
     */
    public function setAccType($acc_type)
    {
        $this->acc_type = $acc_type;
    }

    /**
     * @return mixed
     */
    public function getBalance()
    {
        return $this->balance;
    }

    /**
     * @param mixed $balance
     */
    public function setBalance($balance)
    {
        $this->balance = $balance;
    }

    /**
     * @return mixed
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param mixed $currency
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
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


}