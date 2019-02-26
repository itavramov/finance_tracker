<?php

namespace model;

class Category{
    private $category_id;
    private $category_name;
    private $category_type;
    private $user_id;

    /**
     * Category constructor.
     * @param $category_name
     * @param $category_type
     */
    public function __construct($category_name, $category_type, $user_id){
        $this->category_name = $category_name;
        $this->category_type = $category_type;
        $this->user_id = $user_id;
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
    public function getCategoryName()
    {
        return $this->category_name;
    }

    /**
     * @param mixed $category_name
     */
    public function setCategoryName($category_name)
    {
        $this->category_name = $category_name;
    }

    /**
     * @return mixed
     */
    public function getCategoryType()
    {
        return $this->category_type;
    }

    /**
     * @param mixed $category_type
     */
    public function setCategoryType($category_type)
    {
        $this->category_type = $category_type;
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }
}