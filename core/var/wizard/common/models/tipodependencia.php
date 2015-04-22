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

class Tipodependencia extends map\TipodependenciaMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdTipoDependencia();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idTipoDependencia');
        if ($filter->idTipoDependencia){
            $criteria->where("idTipoDependencia LIKE '{$filter->idTipoDependencia}%'");
        }
        return $criteria;
    }
}

?>