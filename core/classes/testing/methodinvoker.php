<?php

namespace testing;

class MethodInvoker
{

    /**
     * Call protected/private method of a class.
     *
     * @param object &$object    Instantiated object that we will run method on.
     * @param string $methodName Method name to call
     *
     * @return mixed Method return.
     */
    public static function invokeMethod(&$object, $methodName, $parameter1, $parameter2, $parameterInfinite)
    {
        $class = get_class($object);
        $reflection = new \ReflectionClass($class);
        $method = $reflection->getMethod($methodName);

        if ($method->isPublic()) {
            throw new \InvalidArgumentException("Error invoking {$class}::{$methodName}(): this method is public. Call it directly!");
        }
        $method->setAccessible(true);

        $parameters = array_slice(func_get_args(), 2); //get all the parameters after $methodName

        return $method->invokeArgs($object, $parameters);
    }
}
