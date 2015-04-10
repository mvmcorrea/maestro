<?php

return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name' => 'Maestro Wizard',
    'import' => array(
        'models.*'
    ),
    'options' => array(
        'basePath' => Manager::getHome() . '/core/var/wizard/',   
    ),
    'login' => array(
        'module' => "",
        'class' => "MAuthDbMd5",
        'check' => false
    ),
    'db' => array(
        // Exemplo de configuração para Engenharia Reversa de banco MySQL
        'teste' => array(
            'driver' => 'pdo_mysql',
            'host' => 'host',
            'dbname' => 'db',
            'user' => 'x',
            'password' => 'y',
            'charset' => 'UTF8',
        ),
        
    ),
);
