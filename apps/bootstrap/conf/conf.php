<?php

return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name' => 'Bootstrap App',
    'import' => array(
        'models.*'
    ),
    'options' => array(
        'painter' => 'html',
    ),
    'theme' => array(
        'name' => 'bootstrap',
        'template' => 'index'
    ),
    'login' => array(
        'module' => "",
        'class' => "MAuthDbMd5",
        'check' => false
    ),
    'db' => array(
    ),
    
);
