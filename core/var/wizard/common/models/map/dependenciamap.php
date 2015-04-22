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

class DependenciaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Dependencia',
            'attributes' => array(
                'idDependencia' => array('column' => 'idDependencia','key' => 'primary','idgenerator' => 'seq_Dependencia','type' => 'integer'),
                'dependencia' => array('column' => 'Dependencia','type' => 'string'),
                'ativa' => array('column' => 'Ativa','type' => 'boolean'),
                'temAula' => array('column' => 'TemAula','type' => 'boolean'),
                'numeroAlunos' => array('column' => 'NumeroAlunos','type' => 'integer'),
                'idTipoDependencia' => array('column' => 'idTipoDependencia','key' => 'foreign','type' => 'integer'),
                'idSetor' => array('column' => 'idSetor','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'tipoDependencia' => array('toClass' => 'common\models\tipodependencia', 'cardinality' => 'oneToOne' , 'keys' => 'idTipoDependencia:idTipoDependencia'), 
                'setor' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetor:idSetor'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idDependencia;
    /**
     * 
     * @var string 
     */
    protected $dependencia;
    /**
     * 
     * @var boolean 
     */
    protected $ativa;
    /**
     * 
     * @var boolean 
     */
    protected $temAula;
    /**
     * 
     * @var integer 
     */
    protected $numeroAlunos;
    /**
     * 
     * @var integer 
     */
    protected $idTipoDependencia;
    /**
     * 
     * @var integer 
     */
    protected $idSetor;

    /**
     * Associations
     */
    protected $tipoDependencia;
    protected $setor;
    

    /**
     * Getters/Setters
     */
    public function getIdDependencia() {
        return $this->idDependencia;
    }

    public function setIdDependencia($value) {
        $this->idDependencia = $value;
    }

    public function getDependencia() {
        return $this->dependencia;
    }

    public function setDependencia($value) {
        $this->dependencia = $value;
    }

    public function getAtiva() {
        return $this->ativa;
    }

    public function setAtiva($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->ativa = $value;
    }

    public function getTemAula() {
        return $this->temAula;
    }

    public function setTemAula($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->temAula = $value;
    }

    public function getNumeroAlunos() {
        return $this->numeroAlunos;
    }

    public function setNumeroAlunos($value) {
        $this->numeroAlunos = $value;
    }

    public function getIdTipoDependencia() {
        return $this->idTipoDependencia;
    }

    public function setIdTipoDependencia($value) {
        $this->idTipoDependencia = $value;
    }

    public function getIdSetor() {
        return $this->idSetor;
    }

    public function setIdSetor($value) {
        $this->idSetor = $value;
    }
    /**
     *
     * @return Association
     */
    public function getTipoDependencia() {
        if (is_null($this->tipoDependencia)){
            $this->retrieveAssociation("tipoDependencia");
        }
        return  $this->tipoDependencia;
    }
    /**
     *
     * @param Association $value
     */
    public function setTipoDependencia($value) {
        $this->tipoDependencia = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationTipoDependencia() {
        $this->retrieveAssociation("tipoDependencia");
    }
    /**
     *
     * @return Association
     */
    public function getSetor() {
        if (is_null($this->setor)){
            $this->retrieveAssociation("setor");
        }
        return  $this->setor;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetor($value) {
        $this->setor = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetor() {
        $this->retrieveAssociation("setor");
    }

    

}
// end - wizard

?>