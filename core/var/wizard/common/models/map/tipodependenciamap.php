<?php
/**
 * @category   Maestro
 * @package    UFJF
 * @subpackage common
 * @copyright  Copyright (c) 2003-2013 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version
 * @since
 */

// wizard - code section created by Wizard Module

namespace common\models\map;

class TipodependenciaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'TipoDependencia',
            'attributes' => array(
                'idTipoDependencia' => array('column' => 'idTipoDependencia','key' => 'primary','idgenerator' => 'seq_TipoDependencia','type' => 'integer'),
                'tipoDependencia' => array('column' => 'TipoDependencia','type' => 'string'),
            ),
            'associations' => array(
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idTipoDependencia;
    /**
     * 
     * @var string 
     */
    protected $tipoDependencia;

    /**
     * Associations
     */
    

    /**
     * Getters/Setters
     */
    public function getIdTipoDependencia() {
        return $this->idTipoDependencia;
    }

    public function setIdTipoDependencia($value) {
        $this->idTipoDependencia = $value;
    }

    public function getTipoDependencia() {
        return $this->tipoDependencia;
    }

    public function setTipoDependencia($value) {
        $this->tipoDependencia = $value;
    }

    

}
// end - wizard

?>