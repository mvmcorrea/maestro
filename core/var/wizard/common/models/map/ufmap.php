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

class UfMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'UF',
            'attributes' => array(
                'idUF' => array('column' => 'idUF','key' => 'primary','idgenerator' => 'seq_UF','type' => 'integer'),
                'sigla' => array('column' => 'Sigla','type' => 'string'),
                'UF' => array('column' => 'UF','type' => 'string'),
                'regiao' => array('column' => 'Regiao','type' => 'string'),
            ),
            'associations' => array(
                'municipios' => array('toClass' => 'common\models\municipio', 'cardinality' => 'oneToMany' , 'keys' => 'idUF:idUF'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idUF;
    /**
     * 
     * @var string 
     */
    protected $sigla;
    /**
     * 
     * @var string 
     */
    protected $UF;
    /**
     * 
     * @var string 
     */
    protected $regiao;

    /**
     * Associations
     */
    protected $municipios;
    

    /**
     * Getters/Setters
     */
    public function getIdUF() {
        return $this->idUF;
    }

    public function setIdUF($value) {
        $this->idUF = $value;
    }

    public function getSigla() {
        return $this->sigla;
    }

    public function setSigla($value) {
        $this->sigla = $value;
    }

    public function getUF() {
        return $this->UF;
    }

    public function setUF($value) {
        $this->UF = $value;
    }

    public function getRegiao() {
        return $this->regiao;
    }

    public function setRegiao($value) {
        $this->regiao = $value;
    }
    /**
     *
     * @return Association
     */
    public function getMunicipios() {
        if (is_null($this->municipios)){
            $this->retrieveAssociation("municipios");
        }
        return  $this->municipios;
    }
    /**
     *
     * @param Association $value
     */
    public function setMunicipios($value) {
        $this->municipios = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMunicipios() {
        $this->retrieveAssociation("municipios");
    }

    

}
// end - wizard

?>