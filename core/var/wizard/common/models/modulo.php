<?php
/**
 * 
 *
 * @category   Maestro
 * @package    UFJF
 * @subpackage common
 * @copyright  Copyright (c) 2003-2012 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version    
 * @since      
 */

namespace common\models;

class Modulo extends map\ModuloMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdModulo();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idModulo');
        if ($filter->idModulo){
            $criteria->where("idModulo LIKE '{$filter->idModulo}%'");
        }
        return $criteria;
    }
}

?>