<?php
//ini_set("error_reporting", "E_ALL & ~E_NOTICE & ~E_WARNING");
ini_set("error_reporting", "E_ALL & ~E_NOTICE & ~E_STRICT");
//ini_set("display_errors", "on");
ini_set("log_errors","on");
ini_set("error_log","core/var/log/php_error.log");

// change the following paths if necessary
$dir = dirname(__FILE__);
$conf = dirname(__FILE__).'/core/conf/conf.php';

require_once($dir . '/core/classes/manager.php');
set_error_handler('Manager::errorHandler'); 
Manager::init($conf, $dir);
Manager::processRequest();
?>