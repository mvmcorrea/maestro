<?php

namespace testing;

class InMemoryDataBase extends \database\MDataBase implements \IDataBase
{
    public function __construct($name = 'default')
    {
        \Manager::$conf['db'][$name] = [
            'driver' => 'pdo_sqlite',
            'memory' => true,
        ];

        parent::__construct($name);
    }
}
