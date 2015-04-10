<?php

namespace testing;

class FakePersistentManager implements \IPersistentManager
{

    private $classMaps = array();
    private $configLoader;
    private static $instance = null;
    private $dbConnections = array();

    private function __construct()
    {
        $this->configLoader = new \PHPConfigLoader($this);
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function getConfigLoader()
    {
        return $this->configLoader;
    }

    public function addClassMap($name, $classMap)
    {
        $this->classMaps[$name] = $classMap;
    }

    /*
     * Delete's
     */

    public function deleteAssociation(\PersistentObject $object, $associationName)
    {
    }

    public function deleteAssociationById(\PersistentObject $object, $associationName, $id)
    {
    }

    public function deleteAssociationObject(\PersistentObject $object, $associationName, \PersistentObject $refObject)
    {
    }

    public function deleteObject(\PersistentObject $object)
    {
        $object->setPersistent(false);
    }

    /*
     * Save's
     */

    public function saveAssociation(\PersistentObject $object, $associationName)
    {
    }

    public function saveAssociationById(\PersistentObject $object, $associationName, $id)
    {
    }

    public function saveObject(\PersistentObject $object)
    {
        $object->setPersistent(true);
    }

    public function saveObjectRaw(\PersistentObject $object)
    {
        $object->setPersistent(true);
    }

    /*
     * Retrieve's
     */

    public function retrieveAssociation(\PersistentObject $object, $associationName)
    {
    }

    public function retrieveAssociationAsCursor(\PersistentObject $object, $target)
    {
    }

    public function retrieveObject(\PersistentObject $object)
    {
        $object->setPersistent(true);
    }

    public function retrieveObjectFromCriteria(\PersistentObject $object, \PersistentCriteria $criteria, $parameters)
    {
    }

    public function retrieveObjectFromQuery(\PersistentObject $object, \Database\MQuery $query)
    {
    }

    /*
     * gets
     */

    public function getConnection($dbName)
    {
        $dbConnection = $this->dbConnections[$dbName];
        if ($dbConnection == null) {
            $dbConnection = $this->dbConnections[$dbName] = new InMemoryDataBase($dbName);
            \Manager::setDatabase($dbConnection, $dbName);
        }

        return $dbConnection;
    }

    public function getClassMap($className, $module = '', $class = '', $associative = false)
    {
        $classMap = $this->classMaps[$className];
        if (!$classMap) {
            $classMap = $this->configLoader->getClassMap($className, $module, $class, $associative);
            $this->addClassMap($className, $classMap);
        }

        return $classMap;
    }

    public function getDeleteCriteria(\PersistentObject $object)
    {
    }

    public function getRetrieveCriteria(\PersistentObject $object, $command)
    {
    }

    public function getUpdateCriteria(\PersistentObject $object)
    {
    }

    public function getValue($object, $attribute)
    {
        return $object->get($attribute);
    }
}
