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

class FuncionalidadeMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Funcionalidade',
            'attributes' => array(
                'idFuncionalidade' => array('column' => 'idFuncionalidade','key' => 'primary','idgenerator' => 'seq_Funcionalidade','type' => 'integer'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
                'idModulo' => array('column' => 'idModulo','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'modulo' => array('toClass' => 'common\models\modulo', 'cardinality' => 'oneToOne' , 'keys' => 'idModulo:idModulo'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idFuncionalidade;
    /**
     * 
     * @var string 
     */
    protected $descricao;
    /**
     * 
     * @var integer 
     */
    protected $idModulo;

    /**
     * Associations
     */
    protected $modulo;
    

    /**
     * Getters/Setters
     */
    public function getIdFuncionalidade() {
        return $this->idFuncionalidade;
    }

    public function setIdFuncionalidade($value) {
        $this->idFuncionalidade = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }

    public function getIdModulo() {
        return $this->idModulo;
    }

    public function setIdModulo($value) {
        $this->idModulo = $value;
    }
    /**
     *
     * @return Association
     */
    public function getModulo() {
        if (is_null($this->modulo)){
            $this->retrieveAssociation("modulo");
        }
        return  $this->modulo;
    }
    /**
     *
     * @param Association $value
     */
    public function setModulo($value) {
        $this->modulo = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationModulo() {
        $this->retrieveAssociation("modulo");
    }

    

}
// end - wizard

?>