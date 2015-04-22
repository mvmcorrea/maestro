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

class Mensagem extends map\MensagemMap {

    public static function config() {
        return array(
            'log' => array(  ),
            'validators' => array(
            ),
            'converters' => array()
        );
    }
    
    public function getDescription(){
        return $this->getIdMensagem();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('idMensagem');
        if ($filter->idMensagem){
            $criteria->where("idMensagem LIKE '{$filter->idMensagem}%'");
        }
        return $criteria;
    }
}

?>