<?php

namespace model\DAO;

abstract class Connection{
    const DB_NAME = "financetracker";
    const DB_HOST = "127.0.0.1";
    const DB_PORT = "3306";
    const DB_USER = "root";
    const DB_PASS = "";

    /* @var $conn \PDO */
    protected static $conn = NULL;

    private function __construct(){ }

    public static function init_conn(){


            try{
                $magic = "strval";
                self::$conn = new \PDO("mysql:host=" . self::DB_HOST . ":" . self::DB_PORT . ";dbname=" . self::DB_NAME, self::DB_USER, self::DB_PASS);
                self::$conn->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
            }catch (\PDOException $exception){
                echo "We can't init a connection..." . $exception->getMessage();
            }


    }
}