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

class PaisMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Pais',
            'attributes' => array(
                'idPais' => array('column' => 'idPais','key' => 'primary','idgenerator' => 'seq_Pais','type' => 'integer'),
                'pais' => array('column' => 'Pais','type' => 'string'),
                'sigla' => array('column' => 'Sigla','type' => 'string'),
                'nacionalidade' => array('column' => 'Nacionalidade','type' => 'string'),
            ),
            'associations' => array(
                'municipios' => array('toClass' => 'common\models\municipio', 'cardinality' => 'oneToMany' , 'keys' => 'idPais:idPais'), 
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToMany' , 'keys' => 'idPais:idPaisNacionalidade'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idPais;
    /**
     * 
     * @var string 
     */
    protected $pais;
    /**
     * 
     * @var string 
     */
    protected $sigla;
    /**
     * 
     * @var string 
     */
    protected $nacionalidade;

    /**
     * Associations
     */
    protected $municipios;
    protected $pessoa;
    

    /**
     * Getters/Setters
     */
    public function getIdPais() {
        return $this->idPais;
    }

    public function setIdPais($value) {
        $this->idPais = $value;
    }

    public function getPais() {
        return $this->pais;
    }

    public function setPais($value) {
        $this->pais = $value;
    }

    public function getSigla() {
        return $this->sigla;
    }

    public function setSigla($value) {
        $this->sigla = $value;
    }

    public function getNacionalidade() {
        return $this->nacionalidade;
    }

    public function setNacionalidade($value) {
        $this->nacionalidade = $value;
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
    /**
     *
     * @return Association
     */
    public function getPessoa() {
        if (is_null($this->pessoa)){
            $this->retrieveAssociation("pessoa");
        }
        return  $this->pessoa;
    }
    /**
     *
     * @param Association $value
     */
    public function setPessoa($value) {
        $this->pessoa = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPessoa() {
        $this->retrieveAssociation("pessoa");
    }

    

}
// end - wizard

?>