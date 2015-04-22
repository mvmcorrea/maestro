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

class SetoracessoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'SetorAcesso',
            'attributes' => array(
                'idSetorAcesso' => array('column' => 'idSetorAcesso','key' => 'primary','idgenerator' => 'seq_SetorAcesso','type' => 'integer'),
                'finalidade' => array('column' => 'Finalidade','type' => 'string'),
                'idSetorPai' => array('column' => 'idSetorPai','key' => 'foreign','type' => 'integer'),
                'idSetorFilho' => array('column' => 'idSetorFilho','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'setorPai' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetorPai:idSetor'), 
                'setorFilho' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetorFilho:idSetor'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idSetorAcesso;
    /**
     * 
     * @var string 
     */
    protected $finalidade;
    /**
     * 
     * @var integer 
     */
    protected $idSetorPai;
    /**
     * 
     * @var integer 
     */
    protected $idSetorFilho;

    /**
     * Associations
     */
    protected $setorPai;
    protected $setorFilho;
    

    /**
     * Getters/Setters
     */
    public function getIdSetorAcesso() {
        return $this->idSetorAcesso;
    }

    public function setIdSetorAcesso($value) {
        $this->idSetorAcesso = $value;
    }

    public function getFinalidade() {
        return $this->finalidade;
    }

    public function setFinalidade($value) {
        $this->finalidade = $value;
    }

    public function getIdSetorPai() {
        return $this->idSetorPai;
    }

    public function setIdSetorPai($value) {
        $this->idSetorPai = $value;
    }

    public function getIdSetorFilho() {
        return $this->idSetorFilho;
    }

    public function setIdSetorFilho($value) {
        $this->idSetorFilho = $value;
    }
    /**
     *
     * @return Association
     */
    public function getSetorPai() {
        if (is_null($this->setorPai)){
            $this->retrieveAssociation("setorPai");
        }
        return  $this->setorPai;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorPai($value) {
        $this->setorPai = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorPai() {
        $this->retrieveAssociation("setorPai");
    }
    /**
     *
     * @return Association
     */
    public function getSetorFilho() {
        if (is_null($this->setorFilho)){
            $this->retrieveAssociation("setorFilho");
        }
        return  $this->setorFilho;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorFilho($value) {
        $this->setorFilho = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorFilho() {
        $this->retrieveAssociation("setorFilho");
    }

    

}
// end - wizard

?>