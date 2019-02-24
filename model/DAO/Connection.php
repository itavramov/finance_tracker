<?php

namespace model\DAO;

abstract class Connection{
    const DB_NAME = "finance_tracker";
    const DB_HOST = "127.0.0.1";
    const DB_PORT = "8888";
    const DB_USER = "root";
    const DB_PASS = "root";

    /* @var $conn \PDO */
    protected static $conn = NULL;

    private function __construct(){ }

    public static function init_conn(){

        if (!isset(self::$conn)){
            try{
                $magic = "strval";
                self::$conn = new \PDO("mysql:host={$magic(self::DB_HOST)};port={$magic(self::DB_PORT)};
                          dbname={$magic(self::DB_NAME)}", self::DB_USER, self::DB_PASS);
                self::$conn->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
            }catch (\PDOException $exception){
                echo "We can't init a connection..." . $exception->getMessage();
            }
        }

    }
}