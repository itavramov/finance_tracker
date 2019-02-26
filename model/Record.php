<?php

namespace model;

class Record{
    private $record_id;
    private $record_name;
    private $record_desc;
    private $amount;
    private $date;
    private $category_id;
    private $acc_id;

    /**
     * Record constructor.
     * @param $record_name
     * @param $record_desc
     * @param $amount
     * @param $date
     * @param $category_id
     * @param $acc_id
     */
    public function __construct($record_name, $record_desc, $amount, $category_id, $acc_id)
    {
        $this->record_name = $record_name;
        $this->record_desc = $record_desc;
        $this->amount = $amount;
        $this->category_id = $category_id;
        $this->acc_id = $acc_id;
    }

    /**
     * @return mixed
     */
    public function getRecordId()
    {
        return $this->record_id;
    }

    /**
     * @param mixed $record_id
     */
    public function setRecordId($record_id)
    {
        $this->record_id = $record_id;
    }

    /**
     * @return mixed
     */
    public function getRecordName()
    {
        return $this->record_name;
    }

    /**
     * @param mixed $record_name
     */
    public function setRecordName($record_name)
    {
        $this->record_name = $record_name;
    }

    /**
     * @return mixed
     */
    public function getRecordDesc()
    {
        return $this->record_desc;
    }

    /**
     * @param mixed $record_desc
     */
    public function setRecordDesc($record_desc)
    {
        $this->record_desc = $record_desc;
    }

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param mixed $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
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
}