<?php
/**
 * Created by PhpStorm.
 * User: boree
 * Date: 2/26/2019
 * Time: 2:34 PM
 */

namespace controller;


use model\Category;
use model\DAO\CategoryDAO;

class CategoryController{
    function regCategory(){
        $cat_name = $_POST["cat_name"];
        $cat_type = $_POST["cat_type"];
        $user_id = $_SESSION["user_id"];

        //TODO validations

        $category = new Category($cat_name, $cat_type, $user_id);

        $arr["success"] = CategoryDAO::addCategory($category);
        echo json_encode($arr);
    }

    function allUserCategories(){
        $user_id = $_SESSION["user_id"];

        $categories = [];
        $categories = CategoryDAO::getAllCategoriesByUser($user_id);

        echo json_encode($categories);
    }
}