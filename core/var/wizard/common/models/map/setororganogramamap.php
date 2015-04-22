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

class SetororganogramaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'SetorOrganograma',
            'attributes' => array(
                'idSetorOrganograma' => array('column' => 'idSetorOrganograma','key' => 'primary','idgenerator' => 'seq_SetorOrganograma','type' => 'integer'),
                'idOrganograma' => array('column' => 'idOrganograma','key' => 'foreign','type' => 'integer'),
                'idSetorFilho' => array('column' => 'idSetorFilho','key' => 'foreign','type' => 'integer'),
                'idSetorPai' => array('column' => 'idSetorPai','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'organograma' => array('toClass' => 'common\models\organograma', 'cardinality' => 'oneToOne' , 'keys' => 'idOrganograma:idOrganograma'), 
                'setor' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetorFilho:idSetor'), 
                'setorPai' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetorPai:idSetor'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idSetorOrganograma;
    /**
     * 
     * @var integer 
     */
    protected $idOrganograma;
    /**
     * 
     * @var integer 
     */
    protected $idSetorFilho;
    /**
     * 
     * @var integer 
     */
    protected $idSetorPai;

    /**
     * Associations
     */
    protected $organograma;
    protected $setor;
    protected $setorPai;
    

    /**
     * Getters/Setters
     */
    public function getIdSetorOrganograma() {
        return $this->idSetorOrganograma;
    }

    public function setIdSetorOrganograma($value) {
        $this->idSetorOrganograma = $value;
    }

    public function getIdOrganograma() {
        return $this->idOrganograma;
    }

    public function setIdOrganograma($value) {
        $this->idOrganograma = $value;
    }

    public function getIdSetorFilho() {
        return $this->idSetorFilho;
    }

    public function setIdSetorFilho($value) {
        $this->idSetorFilho = $value;
    }

    public function getIdSetorPai() {
        return $this->idSetorPai;
    }

    public function setIdSetorPai($value) {
        $this->idSetorPai = $value;
    }
    /**
     *
     * @return Association
     */
    public function getOrganograma() {
        if (is_null($this->organograma)){
            $this->retrieveAssociation("organograma");
        }
        return  $this->organograma;
    }
    /**
     *
     * @param Association $value
     */
    public function setOrganograma($value) {
        $this->organograma = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationOrganograma() {
        $this->retrieveAssociation("organograma");
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

    

}
// end - wizard

?>