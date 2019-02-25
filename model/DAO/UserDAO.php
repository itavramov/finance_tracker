<?php

namespace model\DAO;


use model\User;

class UserDAO extends Connection {

    static function addUser(User $user){
        $first_name = $user->getFirstName();
        $last_name = $user->getLastName();
        $age = $user->getAge();
        $email = $user->getEmail();
        $password = $user->getPassword();
        $picture = $user->getImgUrl();

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

    static function getEmailByEmail($email){
        $stmt = self::$conn->prepare("SELECT email FROM users WHERE email = ?");
        $stmt->execute(array($email));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if(empty($row)){
            return false;
        }
        else{
            return true;
        }
    }

    static function getPassByEmail($email){
        $stmt = self::$conn->prepare("SELECT pass FROM users WHERE email = ?");
        $stmt->execute(array($email));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if(empty($row)){
            return null;
        }
        else{
            return $row["password"];
        }
    }
}