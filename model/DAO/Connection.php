<?php

namespace model\DAO;

abstract class Connection{
    const DB_NAME = "mebelike_finance";
    const DB_HOST = "195.149.251.138";
    const DB_PORT = "2083";
    const DB_USER = "mebelike_finance";
    const DB_PASS = "6-73k!mG_=wh";

    /* @var $conn \PDO */
    protected static $conn = NULL;

    private function __construct(){ }

    public static function init_conn(){
            try{
                //$magic = "strval";
                self::$conn = new \PDO("mysql:host=" . self::DB_HOST . ":" . self::DB_PORT . ";dbname=" . self::DB_NAME, self::DB_USER, self::DB_PASS);
                self::$conn->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
            }catch (\PDOException $exception){
                echo "We can't init a connection..." . $exception->getMessage();
            }


    }
}