<?php
function get_ip_address() {
    if (isset($_SERVER)) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
    } else {
        if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ip = getenv('HTTP_X_FORWARDED_FOR');
        } elseif (getenv('HTTP_CLIENT_IP')) {
            $ip = getenv('HTTP_CLIENT_IP');
        } else {
            $ip = getenv('REMOTE_ADDR');
        }
    }
    return $ip;
}

function my_session_is_registered($variable) {
    return (isset($_SESSION) && array_key_exists($variable,$_SESSION));
}

function my_session_register($variable) {
    global $session_started;
    $success = false;
    if ($session_started == true) {
        $_SESSION[$variable] = $variable;
        $success = true;
    }
    return $success;
}

function my_session_unregister($variable) {
    unset($_SESSION[$variable]);
    return true;
}

function my_redirect($url) {
    $url = str_replace('&amp;','&', $url);
    header('Location: ' . $url);
    exit();
}