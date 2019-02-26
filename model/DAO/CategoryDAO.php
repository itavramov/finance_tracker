<?php
/**
 * Created by PhpStorm.
 * User: boree
 * Date: 2/26/2019
 * Time: 2:20 PM
 */

namespace model\DAO;


use model\Category;

class CategoryDAO extends Connection{
    static function addCategory(Category $category){
        $name = $category->getCategoryName();
        $type = $category->getCategoryType();
        $user_id = $category->getUserId();

        $stmt = self::$conn->prepare("INSERT INTO categories (category_name, 
                                                              category_type,
                                                              user_id)
                                                              VALUES (?, ?, ?)");
        $stmt->execute(array($name,
                             $type,
                             $user_id));
        if(self::$conn->lastInsertId() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    static function getAllCategoriesByUser($user_id){
        try{
            $stmt = self::$conn->prepare("SELECT category_name, category_type FROM categories WHERE user_id = ?");
            $stmt->execute(array($user_id));
            $categories = [];
            $categories = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $categories;
        }
        catch (\PDOException $exception){
            echo 'Problem with db categories ->' . $exception->getMessage();
        }

    }
}