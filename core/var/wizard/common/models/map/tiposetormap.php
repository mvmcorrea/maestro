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

class TiposetorMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'TipoSetor',
            'attributes' => array(
                'idTipoSetor' => array('column' => 'idTipoSetor','key' => 'primary','idgenerator' => 'seq_TipoSetor','type' => 'integer'),
                'tipoSetor' => array('column' => 'TipoSetor','type' => 'string'),
            ),
            'associations' => array(
                'setor' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToMany' , 'keys' => 'idTipoSetor:idTipoSetor'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idTipoSetor;
    /**
     * 
     * @var string 
     */
    protected $tipoSetor;

    /**
     * Associations
     */
    protected $setor;
    

    /**
     * Getters/Setters
     */
    public function getIdTipoSetor() {
        return $this->idTipoSetor;
    }

    public function setIdTipoSetor($value) {
        $this->idTipoSetor = $value;
    }

    public function getTipoSetor() {
        return $this->tipoSetor;
    }

    public function setTipoSetor($value) {
        $this->tipoSetor = $value;
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