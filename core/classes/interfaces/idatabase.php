<?php

interface IDataBase
{
    public function __construct($name);

    public function newConnection();

    public function getConnection();

    public function getConfig($key);

    public function getName();

    public function getPlatform();

    public function getORMLogger();

    public function getTransaction();

    public function lastInsertId();

    public function beginTransaction();

    public function getSQL($columns, $tables, $where, $orderBy, $groupBy, $having, $forUpdate);

    public function execute(MSQL $sql, $parameters);

    public function executeBatch($sqlArray);

    public function executeCommand($command, $parameters);

    public function count(MQuery $query);

    public function getNewId($sequence);

    public function prepare(MSQL $sql);

    public function query(MSQL $sql);

    public function executeQuery($command, $parameters, $page, $rows);

    public function getQueryCommand($command);

    public function getQuery(MSQL $sql);

    public function getTable($tableName);

    public function executeProcedure($sql, $aParams, $aResult);
}
