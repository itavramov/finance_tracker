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
    }
}