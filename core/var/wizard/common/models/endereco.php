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

class Endereco extends map\EnderecoMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdEndereco();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idEndereco');
        if ($filter->idEndereco){
            $criteria->where("idEndereco LIKE '{$filter->idEndereco}%'");
        }
        return $criteria;
    }
}

?>