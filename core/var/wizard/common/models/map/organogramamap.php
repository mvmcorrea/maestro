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

class OrganogramaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Organograma',
            'attributes' => array(
                'idOrganograma' => array('column' => 'idOrganograma','key' => 'primary','idgenerator' => 'seq_Organograma','type' => 'integer'),
                'sigla' => array('column' => 'Sigla','type' => 'string'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
            ),
            'associations' => array(
                'setores' => array('toClass' => 'common\models\setororganograma', 'cardinality' => 'oneToMany' , 'keys' => 'idOrganograma:idOrganograma'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idOrganograma;
    /**
     * 
     * @var string 
     */
    protected $sigla;
    /**
     * 
     * @var string 
     */
    protected $descricao;

    /**
     * Associations
     */
    protected $setores;
    

    /**
     * Getters/Setters
     */
    public function getIdOrganograma() {
        return $this->idOrganograma;
    }

    public function setIdOrganograma($value) {
        $this->idOrganograma = $value;
    }

    public function getSigla() {
        return $this->sigla;
    }

    public function setSigla($value) {
        $this->sigla = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }
    /**
     *
     * @return Association
     */
    public function getSetores() {
        if (is_null($this->setores)){
            $this->retrieveAssociation("setores");
        }
        return  $this->setores;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetores($value) {
        $this->setores = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetores() {
        $this->retrieveAssociation("setores");
    }

    

}
// end - wizard

?>