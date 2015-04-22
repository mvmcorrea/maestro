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

class MunicipioMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Municipio',
            'attributes' => array(
                'idMunicipio' => array('column' => 'idMunicipio','key' => 'primary','idgenerator' => 'seq_Municipio','type' => 'integer'),
                'municipio' => array('column' => 'Municipio','type' => 'string'),
                'numero' => array('column' => 'Numero','type' => 'string'),
                'tipo' => array('column' => 'Tipo','type' => 'string'),
                'populacao' => array('column' => 'Populacao','type' => 'integer'),
                'idPais' => array('column' => 'idPais','key' => 'foreign','type' => 'integer'),
                'idUF' => array('column' => 'idUF','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'pais' => array('toClass' => 'common\models\pais', 'cardinality' => 'oneToOne' , 'keys' => 'idPais:idPais'), 
                'uf' => array('toClass' => 'common\models\uf', 'cardinality' => 'oneToOne' , 'keys' => 'idUF:idUF'), 
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToMany' , 'keys' => 'idMunicipio:idMunicipioNascimento'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idMunicipio;
    /**
     * 
     * @var string 
     */
    protected $municipio;
    /**
     * 
     * @var string 
     */
    protected $numero;
    /**
     * 
     * @var string 
     */
    protected $tipo;
    /**
     * 
     * @var integer 
     */
    protected $populacao;
    /**
     * 
     * @var integer 
     */
    protected $idPais;
    /**
     * 
     * @var integer 
     */
    protected $idUF;

    /**
     * Associations
     */
    protected $pais;
    protected $uf;
    protected $pessoa;
    

    /**
     * Getters/Setters
     */
    public function getIdMunicipio() {
        return $this->idMunicipio;
    }

    public function setIdMunicipio($value) {
        $this->idMunicipio = $value;
    }

    public function getMunicipio() {
        return $this->municipio;
    }

    public function setMunicipio($value) {
        $this->municipio = $value;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($value) {
        $this->numero = $value;
    }

    public function getTipo() {
        return $this->tipo;
    }

    public function setTipo($value) {
        $this->tipo = $value;
    }

    public function getPopulacao() {
        return $this->populacao;
    }

    public function setPopulacao($value) {
        $this->populacao = $value;
    }

    public function getIdPais() {
        return $this->idPais;
    }

    public function setIdPais($value) {
        $this->idPais = $value;
    }

    public function getIdUF() {
        return $this->idUF;
    }

    public function setIdUF($value) {
        $this->idUF = $value;
    }
    /**
     *
     * @return Association
     */
    public function getPais() {
        if (is_null($this->pais)){
            $this->retrieveAssociation("pais");
        }
        return  $this->pais;
    }
    /**
     *
     * @param Association $value
     */
    public function setPais($value) {
        $this->pais = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPais() {
        $this->retrieveAssociation("pais");
    }
    /**
     *
     * @return Association
     */
    public function getUf() {
        if (is_null($this->uf)){
            $this->retrieveAssociation("uf");
        }
        return  $this->uf;
    }
    /**
     *
     * @param Association $value
     */
    public function setUf($value) {
        $this->uf = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationUf() {
        $this->retrieveAssociation("uf");
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