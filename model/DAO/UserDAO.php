<?php

namespace model\DAO;


use model\User;

class UserDAO extends Connection {

    static function addUser(User $user){
        $first_name = $user->getFirstName();
        $last_name  = $user->getLastName();
        $age        = $user->getAge();
        $email      = $user->getEmail();
        $password   = $user->getPassword();
        $picture    = $user->getImgUrl();

        $stmt = self::$conn->prepare("INSERT INTO users (first_name, 
                                                                    last_name, 
                                                                    email,
                                                                    age,
                                                                    password,
                                                                    picture)
                                                                    VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute(array($first_name,
                                $last_name,
                                $email,
                                $age,
                                $password,
                                $picture));
        $user->setId(self::$conn->lastInsertId());
    }

    static function getIdByEmail($email){
        $stmt = self::$conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute(array($email));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if(empty($row)){
            return false;
        }
        else{
            return $row["user_id"];
        }
    }

    static function getPassByEmail($email){
        $stmt = self::$conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->execute(array($email));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if(empty($row)){
            return null;
        }
        else{
            return $row["password"];
        }
    }
    static function getInfoById($id){
        $stmt = self::$conn->prepare("SELECT first_name,last_name,email,picture,age 
                              FROM users WHERE user_id = ?");
        $stmt->execute(array($id));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if(empty($row)){
            return null;
        }
        else{
            return $row;
        }
    }
}