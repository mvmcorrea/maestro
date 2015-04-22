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

class Documentacao extends map\DocumentacaoMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdDocumentacao();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idDocumentacao');
        if ($filter->idDocumentacao){
            $criteria->where("idDocumentacao LIKE '{$filter->idDocumentacao}%'");
        }
        return $criteria;
    }
}

?>