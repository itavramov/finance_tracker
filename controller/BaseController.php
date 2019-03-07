<?php

namespace controller;

class BaseController{

    function baseFunc(){

        if ($_SESSION["logged"]){
            header("Location: view/dashboard.html");
        }else{
            header("Location: view/welcomePage.html");
        }
    }
}