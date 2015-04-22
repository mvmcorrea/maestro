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

class Funcionalidade extends map\FuncionalidadeMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdFuncionalidade();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idFuncionalidade');
        if ($filter->idFuncionalidade){
            $criteria->where("idFuncionalidade LIKE '{$filter->idFuncionalidade}%'");
        }
        return $criteria;
    }
}

?>